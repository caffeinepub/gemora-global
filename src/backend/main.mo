import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Keep accessControlState stable var to satisfy upgrade compatibility,
  // but do not enforce any checks with it.
  let accessControlState = AccessControl.initState();

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

  type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    coverImageUrl : Text;
    author : Text;
    tags : [Text];
    isPublished : Bool;
    createdAt : Int;
  };

  let inquiries = List.empty<Inquiry>();
  let catalogueRequests = List.empty<CatalogueRequest>();
  var products = Map.empty<Nat, Product>();
  var nextProductId = 0;
  var nextBlogPostId = 0;
  var blogPosts = Map.empty<Nat, BlogPost>();
  var contentBlocks = Map.empty<Text, Text>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Public submissions
  public shared ({ caller }) func submitInquiry(
    name : Text, email : Text, company : Text, country : Text,
    phone : Text, whatsappNumber : Text, message : Text, inquiryType : InquiryType,
  ) : async () {
    inquiries.add({ name; email; company; country; phone; whatsappNumber;
      message; inquiryType; timestamp = Time.now(); isRead = false });
  };

  public shared ({ caller }) func submitCatalogueRequest(
    name : Text, email : Text,
  ) : async () {
    catalogueRequests.add({ name; email; timestamp = Time.now() });
  };

  // Admin inquiry management (no auth check - frontend handles auth)
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };

  public query ({ caller }) func getAllCatalogueRequests() : async [CatalogueRequest] {
    catalogueRequests.toArray();
  };

  public shared ({ caller }) func markInquiryRead(index : Nat) : async () {
    if (index >= inquiries.size()) {
      return;
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
    switch (products.get(id)) {
      case (?_) { products.remove(id); true };
      case null { false };
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(
    category : Text,
  ) : async [Product] {
    products.filter(func(_, p) { Text.equal(p.category, category) })
      .values().toArray();
  };

  public query ({ caller }) func getContentBlock(key : Text) : async ?Text {
    contentBlocks.get(key);
  };

  public query ({ caller }) func getAllContentBlocks() : async [ContentBlock] {
    contentBlocks.entries().toArray().map(func((key, value)) { { key; value } });
  };

  public shared ({ caller }) func setContentBlock(
    key : Text, value : Text,
  ) : async () {
    contentBlocks.add(key, value);
  };

  // Blog post management
  public shared ({ caller }) func addBlogPost(
    title : Text, slug : Text, excerpt : Text, content : Text,
    coverImageUrl : Text, author : Text, tags : [Text], isPublished : Bool,
  ) : async Nat {
    let blogPost : BlogPost = {
      id = nextBlogPostId; title; slug; excerpt; content; coverImageUrl;
      author; tags; isPublished; createdAt = Time.now()
    };
    blogPosts.add(nextBlogPostId, blogPost);
    nextBlogPostId += 1;
    blogPost.id;
  };

  public shared ({ caller }) func updateBlogPost(
    id : Nat, title : Text, slug : Text, excerpt : Text, content : Text,
    coverImageUrl : Text, author : Text, tags : [Text], isPublished : Bool,
  ) : async Bool {
    switch (blogPosts.get(id)) {
      case (?existing) {
        blogPosts.add(id, {
          id; title; slug; excerpt; content; coverImageUrl; author; tags;
          isPublished; createdAt = existing.createdAt
        });
        true;
      };
      case null { false };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async Bool {
    switch (blogPosts.get(id)) {
      case (?_) { blogPosts.remove(id); true };
      case null { false };
    };
  };

  public query ({ caller }) func getPublishedBlogPosts() : async [BlogPost] {
    let published = blogPosts.filter(func(_, p) { p.isPublished });
    let publishedArray = published.values().toArray();

    let compareByCreatedAt = func(a : BlogPost, b : BlogPost) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };

    publishedArray.sort(compareByCreatedAt);
  };

  public query ({ caller }) func getAllBlogPostsAdmin() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPostBySlug(slug : Text) : async ?BlogPost {
    let filtered = blogPosts.filter(func(_, p) { p.isPublished and Text.equal(p.slug, slug) });
    let iter = filtered.values();
    switch (iter.next()) {
      case (?p) { ?p };
      case null { null };
    };
  };
};
