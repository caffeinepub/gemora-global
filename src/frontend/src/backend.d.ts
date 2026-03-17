import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContentBlock {
    key: string;
    value: string;
}
export interface CatalogueRequest {
    name: string;
    email: string;
    timestamp: bigint;
}
export interface Inquiry {
    country: string;
    inquiryType: InquiryType;
    name: string;
    isRead: boolean;
    email: string;
    whatsappNumber: string;
    company: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    company: string;
}
export interface Product {
    id: bigint;
    moq: string;
    imageUrls: Array<string>;
    name: string;
    createdAt: bigint;
    description: string;
    priceRange: string;
    category: string;
}
export enum InquiryType {
    catalogue = "catalogue",
    general = "general",
    wholesale = "wholesale"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, category: string, moq: string, priceRange: string, imageUrls: Array<string>): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<boolean>;
    getAllCatalogueRequests(): Promise<Array<CatalogueRequest>>;
    getAllContentBlocks(): Promise<Array<ContentBlock>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentBlock(key: string): Promise<string | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markInquiryRead(index: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setContentBlock(key: string, value: string): Promise<void>;
    submitCatalogueRequest(name: string, email: string): Promise<void>;
    submitInquiry(name: string, email: string, company: string, country: string, phone: string, whatsappNumber: string, message: string, inquiryType: InquiryType): Promise<void>;
    updateProduct(id: bigint, name: string, description: string, category: string, moq: string, priceRange: string, imageUrls: Array<string>): Promise<boolean>;
}
