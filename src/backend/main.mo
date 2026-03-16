import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Order "mo:core/Order";


actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type InquiryType = {
    #wholesale;
    #catalogue;
    #general;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    company : Text;
    country : Text;
    phone : Text;
    message : Text;
    inquiryType : InquiryType;
    timestamp : Int;
    isRead : Bool;
  };

  type CatalogueRequest = {
    name : Text;
    email : Text;
    timestamp : Int;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    moq : Text;
    imageUrls : [Text];
    createdAt : Int;
  };

  type ContentBlock = {
    key : Text;
    value : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    company : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  let inquiries = List.empty<Inquiry>();
  let catalogueRequests = List.empty<CatalogueRequest>();
  var products = Map.empty<Nat, Product>();
  var nextProductId = 0;
  var contentBlocks = Map.empty<Text, Text>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public inquiry and catalogue request submissions
  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    company : Text,
    country : Text,
    phone : Text,
    message : Text,
    inquiryType : InquiryType,
  ) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      company;
      country;
      phone;
      message;
      inquiryType;
      timestamp = Time.now();
      isRead = false;
    };
    inquiries.add(inquiry);
  };

  public shared ({ caller }) func submitCatalogueRequest(name : Text, email : Text) : async () {
    let request : CatalogueRequest = {
      name;
      email;
      timestamp = Time.now();
    };
    catalogueRequests.add(request);
  };

  // Admin-only inquiry and catalogue request viewing
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.toArray().sort();
  };

  public query ({ caller }) func getAllCatalogueRequests() : async [CatalogueRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view catalogue requests");
    };
    catalogueRequests.toArray();
  };

  public shared ({ caller }) func markInquiryRead(index : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can mark inquiries as read");
    };

    if (index >= inquiries.size()) {
      Runtime.trap("Inquiry does not exist with id: " # index.toText());
    };

    let oldInquiries = inquiries.toArray();
    let updatedInquiries = List.empty<Inquiry>();

    for (i in Nat.range(0, oldInquiries.size() - 1)) {
      if (i == index) {
        let updatedInquiry = { oldInquiries[i] with isRead = true };
        updatedInquiries.add(updatedInquiry);
      } else {
        updatedInquiries.add(oldInquiries[i]);
      };
    };

    inquiries.clear();
    let newInquiries = updatedInquiries.reverse();
    newInquiries.forEach(func(inquiry) { inquiries.add(inquiry) });
  };

  // Admin-only product management
  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    category : Text,
    moq : Text,
    imageUrls : [Text],
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : Product = {
      id = nextProductId;
      name;
      description;
      category;
      moq;
      imageUrls;
      createdAt = Time.now();
    };

    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProduct(
    id : Nat,
    name : Text,
    description : Text,
    category : Text,
    moq : Text,
    imageUrls : [Text],
  ) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (?existingProduct) {
        let updatedProduct : Product = {
          id;
          name;
          description;
          category;
          moq;
          imageUrls;
          createdAt = existingProduct.createdAt;
        };
        products.add(id, updatedProduct);
        true;
      };
      case (null) { false };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    switch (products.get(id)) {
      case (?_) {
        products.remove(id);
        true;
      };
      case (null) { false };
    };
  };

  // Public product queries
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredProducts = products.filter(
      func(_id, product) {
        Text.equal(product.category, category);
      }
    );
    filteredProducts.values().toArray();
  };

  // Public content block queries
  public query ({ caller }) func getContentBlock(key : Text) : async ?Text {
    contentBlocks.get(key);
  };

  public query ({ caller }) func getAllContentBlocks() : async [ContentBlock] {
    contentBlocks.entries().toArray().map(
      func((key, value)) {
        { key; value };
      }
    );
  };

  // Admin-only content block management
  public shared ({ caller }) func setContentBlock(key : Text, value : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can set content blocks");
    };
    contentBlocks.add(key, value);
  };
};
