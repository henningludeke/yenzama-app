import { GeoPoint, Timestamp } from "firebase/firestore";

export type UserRole = "homeowner" | "tradesperson";
export type TradeCategory = "plumbing" | "electrical" | "building" | "painting";
export type JobStatus = "draft" | "posted" | "quoted" | "accepted" | "in_progress" | "completed" | "reviewed" | "cancelled";
export type Urgency = "urgent" | "this_week" | "flexible";
export type QuoteStatus = "pending" | "accepted" | "declined";

export interface User {
  uid: string;
  role: UserRole;
  displayName: string;
  phone: string;
  photoURL: string | null;
  location: GeoPoint;
  suburb: string;
  city: string;
  createdAt: Timestamp;
}

export interface TradespersonProfile {
  uid: string;
  businessName: string;
  bio: string;
  trades: TradeCategory[];
  serviceRadius: number;
  serviceLocation: GeoPoint;
  portfolioPhotos: string[];
  verified: boolean;
  rating: number;
  reviewCount: number;
}

export interface Job {
  jobId: string;
  homeownerId: string;
  title: string;
  description: string;
  tradeCategory: TradeCategory;
  location: GeoPoint;
  suburb: string;
  urgency: Urgency;
  photos: string[];
  status: JobStatus;
  acceptedQuoteId: string | null;
  createdAt: Timestamp;
}

export interface Quote {
  quoteId: string;
  jobId: string;
  tradespersonId: string;
  priceZAR: number; // cents
  estimatedDays: number;
  message: string;
  status: QuoteStatus;
  createdAt: Timestamp;
}

export interface Review {
  reviewId: string;
  jobId: string;
  homeownerId: string;
  tradespersonId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Timestamp;
}
