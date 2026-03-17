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

  type InquiryType = { #wholesale; #catalogue; #general };

  type Inquiry = {
    name : Text; email : Text; company : Text; country : Text;
    phone : Text; whatsappNumber : Text; message : Text;
    inquiryType : InquiryType; timestamp : Int; isRead : Bool;
  };

  type CatalogueRequest = { name : Text; email : Text; timestamp : Int };

  type Product = {
    id : Nat; name : Text; description : Text; category : Text;
    moq : Text; priceRange : Text; imageUrls : [Text]; createdAt : Int;
  };

  type ContentBlock = { key : Text; value : Text };

  public type UserProfile = { name : Text; email : Text; company : Text };

  let inquiries = List.empty<Inquiry>();
  let catalogueRequests = List.empty<CatalogueRequest>();
  var products = Map.empty<Nat, Product>();
  var nextProductId = 0;
  var contentBlocks = Map.empty<Text, Text>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Public submissions
  public shared func submitInquiry(
    name : Text, email : Text, company : Text, country : Text,
    phone : Text, whatsappNumber : Text, message : Text, inquiryType : InquiryType,
  ) : async () {
    inquiries.add({ name; email; company; country; phone; whatsappNumber;
      message; inquiryType; timestamp = Time.now(); isRead = false });
  };

  public shared func submitCatalogueRequest(name : Text, email : Text) : async () {
    catalogueRequests.add({ name; email; timestamp = Time.now() });
  };

  // Open queries (auth handled on frontend)
  public query func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };

  public query func getAllCatalogueRequests() : async [CatalogueRequest] {
    catalogueRequests.toArray();
  };

  public shared func markInquiryRead(index : Nat) : async () {
    if (index >= inquiries.size()) {
      Runtime.trap("Inquiry not found: " # index.toText());
    };
    let arr = inquiries.toArray();
    inquiries.clear();
    for (i in Nat.range(0, arr.size() - 1)) {
      if (i == index) { inquiries.add({ arr[i] with isRead = true }) }
      else { inquiries.add(arr[i]) };
    };
  };

  // Admin product management
  public shared ({ caller }) func addProduct(
    name : Text, description : Text, category : Text,
    moq : Text, priceRange : Text, imageUrls : [Text],
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    let product : Product = { id = nextProductId; name; description; category;
      moq; priceRange; imageUrls; createdAt = Time.now() };
    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProduct(
    id : Nat, name : Text, description : Text, category : Text,
    moq : Text, priceRange : Text, imageUrls : [Text],
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    switch (products.get(id)) {
      case (?existing) {
        products.add(id, { id; name; description; category; moq; priceRange;
          imageUrls; createdAt = existing.createdAt });
        true;
      };
      case null { false };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    switch (products.get(id)) {
      case (?_) { products.remove(id); true };
      case null { false };
    };
  };

  public query func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.filter(func(_, p) { Text.equal(p.category, category) })
      .values().toArray();
  };

  public query func getContentBlock(key : Text) : async ?Text {
    contentBlocks.get(key);
  };

  public query func getAllContentBlocks() : async [ContentBlock] {
    contentBlocks.entries().toArray().map(func((key, value)) { { key; value } });
  };

  public shared ({ caller }) func setContentBlock(key : Text, value : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    contentBlocks.add(key, value);
  };
};
