# YENZAMA — MVP App Specification

**Skilled Trades Marketplace PWA for South Africa**
Version 1.0 — March 2026 | Target: Jules AI-Assisted Development

---

## 1. Executive Summary

Yenzama is a two-sided marketplace Progressive Web App (PWA) connecting South African homeowners with skilled tradespeople. The name means "let's do it together" in Zulu/Xhosa and signals collaboration, accessibility, and local relevance.

The MVP targets **homeowners as the primary user**, enabling them to find, compare, and book tradespeople across four core trades: plumbing, electrical, building/renovations, and painting.

The platform uses a **hybrid booking model** combining direct browse-and-quote with a job posting board, designed to work from day one with limited supply and scale as the tradesperson base grows.

---

## 2. Product Overview

### 2.1 Problem Statement

South African homeowners struggle to find reliable, vetted tradespeople. Current options are fragmented across Facebook groups, word-of-mouth, and outdated directories. There is no dominant, trusted digital marketplace for skilled trades in South Africa.

### 2.2 Target Market

- **Primary:** Urban and suburban homeowners (LSM 7–10) in Gauteng, Western Cape, and KZN who own smartphones and are comfortable with app-based transactions.
- **Secondary:** Skilled tradespeople seeking a reliable stream of work with professional visibility.

### 2.3 Value Proposition

| For Homeowners | For Tradespeople |
|---|---|
| Verified, reviewed tradespeople in your area | Steady stream of local job leads |
| Compare quotes side-by-side | Professional profile to build reputation |
| Photo-based job posting for accurate quotes | Bid on jobs that match your skills and area |
| Review history builds trust | Reviews drive repeat business |

---

## 3. User Roles & Personas

### 3.1 Homeowner (Primary MVP User)

**Persona:** Thandi, 34, lives in Midrand. Her geyser is leaking. She posted on a community Facebook group and got 12 random numbers with no way to verify any of them.

- Browses tradespeople by trade category and location
- Posts jobs with photos and descriptions
- Receives and compares quotes
- Accepts a quote and confirms job completion
- Leaves reviews and ratings

### 3.2 Tradesperson

**Persona:** Sipho, 41, qualified plumber in Soweto. Gets most work through word-of-mouth but has capacity for more. Wants a professional online presence.

- Creates a profile with trade categories, service areas, and portfolio photos
- Browses posted jobs in their area and submits bids/quotes
- Receives direct quote requests from homeowners
- Manages job status (accepted, in progress, completed)
- Collects reviews to build reputation

### 3.3 Admin (Post-MVP)

Admin dashboard for user management, dispute resolution, and tradesperson verification. Out of scope for MVP demo but data model should accommodate it.

---

## 4. Core Features — MVP Scope

### 4.1 Authentication

- Phone number + OTP as primary auth (standard for SA market, no email dependency)
- **For MVP demo:** mock OTP flow with hardcoded codes (e.g. `1234`)
- Role selection on signup: Homeowner or Tradesperson
- Firebase Authentication with phone provider

### 4.2 Homeowner Features

#### 4.2.1 Browse Tradespeople (Way 1)

- Filter by trade category (Plumbing, Electrical, Building/Renovations, Painting)
- Filter by location / radius (10km, 25km, 50km from homeowner)
- Sort by rating, distance, number of reviews
- Tradesperson card shows: name, photo, trade, rating (stars), review count, areas served, verified badge
- Tap to view full profile with portfolio photos, bio, and reviews
- "Request Quote" button sends a structured quote request to the tradesperson

#### 4.2.2 Post a Job (Way 2)

- Job posting form: title, description, trade category, location, urgency (Urgent / This Week / Flexible)
- Photo upload: up to 5 photos of the problem (camera or gallery)
- Posted jobs are visible to tradespeople within the specified area
- Homeowner receives bids/quotes from interested tradespeople
- Quote comparison view: side-by-side cards with price, timeline, tradesperson rating

#### 4.2.3 Quote Management

- View all received quotes (from both flows) in a single inbox
- Quote card shows: tradesperson name, rating, proposed price (ZAR), estimated timeline, message
- Accept or decline quotes
- Accepted quote moves to Active Jobs

#### 4.2.4 Job Lifecycle

Jobs move through a simple status pipeline:

| Status | Description | Action By |
|---|---|---|
| `draft` | Job created but not yet posted | Homeowner |
| `posted` | Visible to tradespeople, accepting bids | System |
| `quoted` | One or more quotes received | Tradesperson |
| `accepted` | Homeowner accepted a quote | Homeowner |
| `in_progress` | Tradesperson confirmed and working | Tradesperson |
| `completed` | Work done, pending review | Tradesperson |
| `reviewed` | Homeowner left a review | Homeowner |
| `cancelled` | Job cancelled by either party | Either |

#### 4.2.5 Reviews & Ratings

- After job completion, homeowner is prompted to rate (1–5 stars) and leave a text review
- Reviews are public on the tradesperson's profile
- Aggregate rating displayed on all tradesperson cards

### 4.3 Tradesperson Features

#### 4.3.1 Profile Setup

- Business name, personal name, phone number
- Trade categories (multi-select from: Plumbing, Electrical, Building/Renovations, Painting)
- Service area: suburb/city + radius
- Bio / description (free text)
- Portfolio photos: up to 10 images of past work
- Verified badge: placeholder for future verification flow (manually set in dummy data)

#### 4.3.2 Job Feed

- Feed of posted jobs matching tradesperson's trade categories and service area
- Job cards show: title, category, location, urgency, photo thumbnail, time posted
- Tap to view full job details and submit a quote

#### 4.3.3 Quote Submission

- Quote form: proposed price (ZAR), estimated timeline, message to homeowner
- Tradesperson can view status of submitted quotes (pending, accepted, declined)

#### 4.3.4 Job Management

- Active jobs dashboard with status updates
- Mark job as "In Progress" or "Completed"

### 4.4 Location Services

- Browser Geolocation API for homeowner position
- Radius-based filtering: 10km, 25km, 50km options
- For MVP: suburb-level location stored as lat/lng coordinates
- Tradespeople define their service radius on profile
- Distance calculation: Haversine formula on client or Firestore geohash queries

### 4.5 Photo Upload

- Camera capture and gallery selection
- Client-side compression before upload (max 1MB per image)
- Firebase Storage for image hosting
- Used in: job posts (homeowner), portfolio (tradesperson)

---

## 5. Firestore Data Model

All collections use Firestore document IDs as primary keys. Timestamps use Firestore server timestamps.

### 5.1 `users`

| Field | Type | Description |
|---|---|---|
| `uid` | `string` | Firebase Auth UID (document ID) |
| `role` | `string` | `"homeowner"` \| `"tradesperson"` |
| `displayName` | `string` | Full name |
| `phone` | `string` | Phone number (E.164 format, e.g. `+27821234567`) |
| `photoURL` | `string \| null` | Profile photo URL |
| `location` | `geopoint` | Lat/lng coordinates |
| `suburb` | `string` | Suburb name for display |
| `city` | `string` | City name |
| `createdAt` | `timestamp` | Account creation date |

### 5.2 `tradespersonProfiles`

| Field | Type | Description |
|---|---|---|
| `uid` | `string` | References `users.uid` (document ID) |
| `businessName` | `string` | Business/trading name |
| `bio` | `string` | Profile description |
| `trades` | `array<string>` | e.g. `["plumbing", "electrical"]` |
| `serviceRadius` | `number` | Radius in km |
| `serviceLocation` | `geopoint` | Centre point of service area |
| `portfolioPhotos` | `array<string>` | Storage URLs (max 10) |
| `verified` | `boolean` | Verification status |
| `rating` | `number` | Aggregate rating (1–5) |
| `reviewCount` | `number` | Total reviews received |

### 5.3 `jobs`

| Field | Type | Description |
|---|---|---|
| `jobId` | `string` | Auto-generated document ID |
| `homeownerId` | `string` | References `users.uid` |
| `title` | `string` | Short job title |
| `description` | `string` | Detailed description |
| `tradeCategory` | `string` | `plumbing` \| `electrical` \| `building` \| `painting` |
| `location` | `geopoint` | Job location |
| `suburb` | `string` | Suburb for display |
| `urgency` | `string` | `urgent` \| `this_week` \| `flexible` |
| `photos` | `array<string>` | Storage URLs (max 5) |
| `status` | `string` | See job lifecycle statuses in section 4.2.4 |
| `acceptedQuoteId` | `string \| null` | Reference to accepted quote |
| `createdAt` | `timestamp` | Job creation date |

### 5.4 `quotes`

| Field | Type | Description |
|---|---|---|
| `quoteId` | `string` | Auto-generated document ID |
| `jobId` | `string` | References `jobs.jobId` |
| `tradespersonId` | `string` | References `users.uid` |
| `priceZAR` | `number` | Quoted price in Rands (stored as cents, e.g. `250000` = R2,500.00) |
| `estimatedDays` | `number` | Estimated days to complete |
| `message` | `string` | Message to homeowner |
| `status` | `string` | `pending` \| `accepted` \| `declined` |
| `createdAt` | `timestamp` | Quote submission date |

### 5.5 `reviews`

| Field | Type | Description |
|---|---|---|
| `reviewId` | `string` | Auto-generated document ID |
| `jobId` | `string` | References `jobs.jobId` |
| `homeownerId` | `string` | References `users.uid` |
| `tradespersonId` | `string` | References `users.uid` |
| `rating` | `number` | 1–5 stars |
| `comment` | `string` | Review text |
| `createdAt` | `timestamp` | Review date |

---

## 6. Dummy / Seed Data

The MVP demo must be pre-populated with realistic South African dummy data. Generate a seed script at `src/lib/seed/seedData.ts` that writes to Firestore.

### 6.1 Tradespeople (20 profiles)

- 5 per trade category (Plumbing, Electrical, Building/Renovations, Painting)
- Mix of Gauteng, Western Cape, and KZN locations
- Realistic SA names (mix of Zulu, Xhosa, Afrikaans, English)
- Ratings between 3.5 and 5.0 with varying review counts (2–45)
- 3–5 verified, rest unverified
- Service radius: 15–50km
- Placeholder portfolio photos (use `https://picsum.photos/seed/{id}/400/300`)

### 6.2 Homeowners (10 profiles)

- Spread across Gauteng and Western Cape suburbs
- Realistic SA names

### 6.3 Jobs (15 jobs)

- Mix of statuses across the lifecycle
- 3–4 with multiple quotes for comparison demo
- At least 2 completed with reviews
- 1–2 urgent jobs
- Realistic descriptions, e.g.:
  - "Geyser leaking in ceiling — water dripping through bathroom light fitting"
  - "Need full house repaint, 3-bedroom in Sandton"
  - "Electrical certificate of compliance needed for property sale"
  - "Garden wall cracked and leaning, needs rebuild"

### 6.4 Reviews (20 reviews)

- Attached to completed jobs
- Mix of ratings and comment styles (some detailed, some short)

---

## 7. Technical Architecture

### 7.1 Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React 18 + Vite | TypeScript, single-page PWA |
| Styling | Tailwind CSS | Mobile-first responsive design |
| Routing | React Router v6 | Client-side routing |
| State | React Context + hooks | Keep simple for MVP, no Redux |
| Backend | Firebase | Firestore, Auth, Storage, Hosting |
| Auth | Firebase Auth (Phone) | OTP provider, mock for demo |
| Database | Cloud Firestore | NoSQL document store |
| Storage | Firebase Storage | Image uploads |
| Hosting | Firebase Hosting | PWA with service worker |
| Maps/Location | Browser Geolocation API | No Google Maps dependency for MVP |

### 7.2 PWA Requirements

- `manifest.json` with app name, icons, theme colour (`#1B6B4A`)
- Service worker for offline shell caching
- Add to Home Screen prompt
- Responsive: designed for mobile, works on desktop
- Target: Chrome on Android (dominant SA browser), primary test device: Honor 400 (360px CSS width)

### 7.3 Project Structure

```
yenzama-app/
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Auth.tsx
│   │   ├── RoleSelect.tsx
│   │   ├── homeowner/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BrowseTradespeople.tsx
│   │   │   ├── TradespersonProfile.tsx
│   │   │   ├── PostJob.tsx
│   │   │   ├── MyJobs.tsx
│   │   │   ├── JobDetail.tsx
│   │   │   └── LeaveReview.tsx
│   │   └── tradesperson/
│   │       ├── Dashboard.tsx
│   │       ├── MyProfile.tsx
│   │       ├── JobDetail.tsx
│   │       └── MyQuotes.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BottomNav.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── StarRating.tsx
│   │   │   ├── PhotoUpload.tsx
│   │   │   └── DeviceFrame.tsx
│   │   ├── TradespersonCard.tsx
│   │   ├── JobCard.tsx
│   │   └── QuoteCard.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useJobs.ts
│   │   ├── useQuotes.ts
│   │   ├── useTradespeople.ts
│   │   └── useLocation.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── helpers.ts
│   │   └── seed/
│   │       └── seedData.ts
│   └── types/
│       └── index.ts
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── .env.example
```

---

## 8. Screen Map

| Route | Screen | User Role | Description |
|---|---|---|---|
| `/` | Landing / Splash | All | App branding, sign in / sign up CTAs |
| `/auth` | Auth Screen | All | Phone number input + OTP verification |
| `/auth/role` | Role Selection | New users | Choose Homeowner or Tradesperson |
| `/home` | Homeowner Dashboard | Homeowner | Search bar, trade categories, nearby tradespeople, active jobs |
| `/browse` | Browse Tradespeople | Homeowner | Filtered list of tradesperson cards |
| `/tradesperson/:id` | Tradesperson Profile | Homeowner | Full profile, portfolio, reviews, Request Quote CTA |
| `/post-job` | Post a Job | Homeowner | Job posting form with photo upload |
| `/jobs` | My Jobs | Homeowner | List of posted jobs with status badges |
| `/jobs/:id` | Job Detail | Homeowner | Job info, received quotes, accept/decline |
| `/jobs/:id/review` | Leave Review | Homeowner | Star rating + comment form |
| `/tp/dashboard` | Tradesperson Dashboard | Tradesperson | Job feed, active jobs, earnings summary |
| `/tp/profile` | My Profile | Tradesperson | Profile editor with portfolio upload |
| `/tp/jobs/:id` | Job Detail (TP view) | Tradesperson | Job info + submit quote form |
| `/tp/quotes` | My Quotes | Tradesperson | List of submitted quotes with status |

---

## 9. UI/UX Guidelines

### 9.1 Design Principles

- **Mobile-first:** primary design target is **360px CSS width** (Honor 400 — 1080x2412 @ 3x DPR, 6.7" screen). This is the demo device. All screens must look pixel-perfect at 360px.
- **Responsive breakpoints (Tailwind defaults):**
  - `360px` — base (Honor 400, most Android devices)
  - `sm: 640px` — large phones in landscape
  - `md: 768px` — tablets
  - `lg: 1024px` — desktop
- **Thumb-friendly:** primary actions in bottom 60% of screen, min 44px tap targets
- **Low data:** compress images, lazy load, minimal JS bundle
- **Multilingual-ready:** all strings in a constants file (English only for MVP, but structure for i18n)
- **Safe areas:** respect notch/punch-hole camera cutouts — use `env(safe-area-inset-top)` etc. in CSS for status bar overlap

### 9.2 Brand / Theme

| Element | Value |
|---|---|
| Primary colour | `#1B6B4A` (SA green) |
| Secondary colour | `#F5A623` (warm amber) |
| Background | `#FFFFFF` (white) |
| Surface | `#F7F7F7` (light grey) |
| Text primary | `#1A1A1A` |
| Text secondary | `#555555` |
| Error | `#D32F2F` |
| Success | `#2E7D32` |
| Font | Inter (Google Fonts) or system default |
| Border radius | 12px (cards), 8px (buttons), 24px (pills) |

### 9.3 Desktop Phone Frame (Demo Mode)

When viewed on screens wider than `md` (768px+), the app should render inside a **phone frame mockup** centred on the screen with a neutral background. This is for demo/presentation purposes.

- **Frame:** CSS-only phone shell (rounded corners, notch/punch-hole cutout, subtle shadow) — no images needed
- **Inner viewport:** 360px wide × 800px tall (Honor 400 proportions), scrollable inside the frame
- **Background:** light grey (`#E5E5E5`) or subtle gradient behind the phone frame
- **On actual mobile (below 768px):** the phone frame is hidden entirely, app renders full-screen as normal
- **Implementation:** create a `DeviceFrame.tsx` wrapper component that conditionally wraps the app content. Use a Tailwind `hidden md:flex` pattern to toggle the frame.
- **Status bar:** include a fake status bar at the top of the frame showing time, battery, and signal icons (static/decorative)

### 9.4 Key UI Components

- **TradespersonCard:** photo, name, trade badge, stars, review count, distance, verified tick
- **JobCard:** title, category pill, urgency badge, suburb, time ago, photo thumbnail
- **QuoteCard:** tradesperson mini-profile, price (ZAR), timeline, message preview
- **StatusBadge:** colour-coded pill for job status
- **BottomNav:** Home, Browse, Post Job (+), My Jobs, Profile

---

## 10. Out of Scope (Post-MVP)

The following features are intentionally excluded from MVP but the data model and architecture should not block them:

- In-app payments / escrow (future Payfast or Ozow integration)
- In-app messaging / chat between homeowner and tradesperson
- WhatsApp Business API integration for notifications
- Tradesperson identity verification (ID, qualifications upload)
- Admin dashboard for moderation and disputes
- Push notifications (web push via service worker)
- Revenue model implementation (commission, subscriptions, lead fees)
- Load shedding schedule integration
- Multi-language support (Zulu, Xhosa, Afrikaans)
- SMS notifications for tradespeople without smartphones

---

## 11. MVP Demo Success Criteria

The demo is considered complete when:

- [ ] A homeowner can sign up, browse tradespeople, and request a quote
- [ ] A homeowner can post a job with photos and receive dummy quotes
- [ ] A homeowner can compare quotes side-by-side and accept one
- [ ] A tradesperson can sign up, set up a profile, and view the job feed
- [ ] A tradesperson can submit a quote on a posted job
- [ ] Job lifecycle flows from Posted through to Reviewed
- [ ] Location-based filtering returns relevant results
- [ ] The app installs as a PWA on Android Chrome
- [ ] All screens render correctly on mobile viewport (360px — Honor 400 baseline) and scale up to desktop
- [ ] Seed data is pre-loaded and the demo runs without manual setup

---

## 12. Development Notes for Jules

### 12.1 Build Order

Build incrementally. Complete each phase before starting the next.

| Phase | Scope | Milestone |
|---|---|---|
| 1 | Project scaffold: Vite + React + Tailwind + Firebase config + TypeScript types | App runs, Firebase connected |
| 2 | Auth flow: phone OTP (mocked) + role selection + AuthContext | Can sign in as homeowner or tradesperson |
| 3 | Seed data: Firestore seeding script with all dummy data | Data visible in Firebase console |
| 4 | Homeowner browse: tradesperson list, filters, profile view | Can browse and view tradespeople |
| 5 | Post a job: form + photo upload + job list | Can post jobs with photos |
| 6 | Quoting: tradesperson job feed + quote submission + homeowner quote comparison | Full quote flow works |
| 7 | Job lifecycle: status transitions + completion + review | End-to-end job completion |
| 8 | PWA: manifest, service worker, responsive polish | Installable on Android |

### 12.2 Key Implementation Notes

- Use Firestore `onSnapshot` for real-time updates on quotes and job status
- Image compression: use `browser-image-compression` library before Firebase Storage upload
- Geolocation: request permission once on signup, store in user profile
- For radius queries: use client-side Haversine filtering (simpler for MVP) or geohash-based Firestore queries
- Mock OTP: accept any 4-digit code in development, use Firebase Auth emulator
- All monetary values in ZAR (South African Rand), stored as integers (cents) to avoid float issues — display as `R2,500.00`
- Currency formatting helper: `(cents: number) => "R" + (cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 2 })`

### 12.3 TypeScript Interfaces

Define these in `src/types/index.ts` matching the Firestore schema exactly:

```typescript
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
```

### 12.4 Environment Variables

Create `.env.example` with:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Appendix: Sample Jules Prompts by Phase

**Phase 1:**
> Read SPEC.md. Scaffold the project: Vite + React 18 + TypeScript + Tailwind CSS + React Router v6. Set up Firebase config in src/lib/firebase.ts using env variables. Create all TypeScript interfaces in src/types/index.ts. Create the folder structure from section 7.3 with placeholder components. Ensure the app runs with `npm run dev`.

**Phase 2:**
> Read SPEC.md sections 4.1 and 8. Build the auth flow: Landing page with sign in/up CTAs, Auth screen with phone input and mock OTP (accept code 1234), role selection screen, and AuthContext provider that persists auth state. Redirect homeowners to /home and tradespeople to /tp/dashboard after auth.

**Phase 3:**
> Read SPEC.md section 6. Create src/lib/seed/seedData.ts with all dummy data per the spec (20 tradespeople, 10 homeowners, 15 jobs, 15+ quotes, 20 reviews). Use realistic SA names and locations. Add a seed button on the landing page (dev only) that writes all data to Firestore. Use picsum.photos for placeholder images.

**Phase 4:**
> Read SPEC.md sections 4.2.1, 8, and 9. Build the homeowner browse flow: Dashboard with trade category cards and search, Browse Tradespeople page with filters (trade, radius), TradespersonCard component, and full Tradesperson Profile page with portfolio, reviews, and Request Quote button.

**Phase 5–8:** Follow the same pattern, referencing the relevant spec sections.
