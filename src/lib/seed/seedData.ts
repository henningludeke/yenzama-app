import { doc, writeBatch, GeoPoint, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import type {
  User,
  TradespersonProfile,
  Job,
  Quote,
  Review,
  TradeCategory,
  JobStatus,
  Urgency
} from "../../types";

const SA_REGIONS = {
  Gauteng: [
    { suburb: "Sandton", city: "Johannesburg", lat: -26.1076, lng: 28.0567 },
    { suburb: "Midrand", city: "Johannesburg", lat: -25.9984, lng: 28.1262 },
    { suburb: "Soweto", city: "Johannesburg", lat: -26.2485, lng: 27.8540 },
    { suburb: "Pretoria East", city: "Pretoria", lat: -25.7833, lng: 28.3444 },
  ],
  WesternCape: [
    { suburb: "Sea Point", city: "Cape Town", lat: -33.9174, lng: 18.3860 },
    { suburb: "Claremont", city: "Cape Town", lat: -33.9806, lng: 18.4646 },
    { suburb: "Bellville", city: "Cape Town", lat: -33.8943, lng: 18.6294 },
  ],
  KZN: [
    { suburb: "Umhlanga", city: "Durban", lat: -29.7262, lng: 31.0848 },
    { suburb: "Berea", city: "Durban", lat: -29.8489, lng: 31.0020 },
  ],
};

const TRADES: TradeCategory[] = ["plumbing", "electrical", "building", "painting"];

const NAMES_FIRST = ["Sipho", "Thandi", "Johan", "Pieter", "Busi", "Zanele", "David", "Fatima", "Lerato", "Kobus", "Andile", "Nomsa", "Chris", "Tshepo", "Mbali"];
const NAMES_LAST = ["Muller", "Dlamini", "Zulu", "Botha", "Naidoo", "Smit", "Gumede", "Pillay", "Van der Merwe", "Khunalo", "Nkosi"];

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomName = () => `${getRandom(NAMES_FIRST)} ${getRandom(NAMES_LAST)}`;
const getRandomLocation = () => {
  const regions = Object.values(SA_REGIONS);
  const region = getRandom(regions);
  return getRandom(region);
};

export const seedData = async () => {
  console.log("Starting database seed...");
  const batch = writeBatch(db);

  // 1. Create 10 Homeowners
  const homeownerIds: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const uid = `homeowner-${i}`;
    const loc = getRandomLocation();
    const user: User = {
      uid,
      role: "homeowner",
      displayName: getRandomName(),
      phone: `+278200000${i.toString().padStart(2, '0')}`,
      photoURL: `https://picsum.photos/seed/homeowner-${i}/200/200`,
      location: new GeoPoint(loc.lat, loc.lng),
      suburb: loc.suburb,
      city: loc.city,
      createdAt: Timestamp.now(),
    };
    batch.set(doc(db, "users", uid), user);
    homeownerIds.push(uid);
  }

  // 2. Create 20 Tradespeople
  const tradespersonIds: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const uid = `tradesperson-${i}`;
    const loc = getRandomLocation();
    const trade = TRADES[(i - 1) % TRADES.length];

    const user: User = {
      uid,
      role: "tradesperson",
      displayName: getRandomName(),
      phone: `+278300000${i.toString().padStart(2, '0')}`,
      photoURL: `https://picsum.photos/seed/tp-user-${i}/200/200`,
      location: new GeoPoint(loc.lat, loc.lng),
      suburb: loc.suburb,
      city: loc.city,
      createdAt: Timestamp.now(),
    };

    const profile: TradespersonProfile = {
      uid,
      businessName: `${user.displayName.split(' ')[0]}'s ${trade.charAt(0).toUpperCase() + trade.slice(1)} Services`,
      bio: `Professional ${trade} expert with over 10 years of experience serving the ${loc.city} area. Quality guaranteed.`,
      trades: [trade],
      serviceRadius: 20 + Math.floor(Math.random() * 30),
      serviceLocation: new GeoPoint(loc.lat, loc.lng),
      portfolioPhotos: Array.from({ length: 3 }, (_, k) => `https://picsum.photos/seed/tp-port-${i}-${k}/400/300`),
      verified: i % 4 === 0,
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: 5 + Math.floor(Math.random() * 40),
    };

    batch.set(doc(db, "users", uid), user);
    batch.set(doc(db, "tradespersonProfiles", uid), profile);
    tradespersonIds.push(uid);
  }

  // 3. Create 15 Jobs
  const jobIds: string[] = [];
  const jobStatuses: JobStatus[] = ["posted", "quoted", "accepted", "in_progress", "completed", "reviewed"];

  const jobTemplates = [
    { title: "Geyser leaking in ceiling", desc: "Water dripping through bathroom light fitting. Urgent repair needed.", cat: "plumbing" as TradeCategory },
    { title: "Full house repaint", desc: "3-bedroom house in Sandton needs interior and exterior painting.", cat: "painting" as TradeCategory },
    { title: "Electrical certificate of compliance", desc: "Need COC for property sale. All outlets and DB board need inspection.", cat: "electrical" as TradeCategory },
    { title: "Garden wall repair", desc: "Wall cracked and leaning after heavy rain. Needs rebuild.", cat: "building" as TradeCategory },
    { title: "Kitchen renovation", desc: "Installing new cabinets and tiling. Plumbing work also required.", cat: "building" as TradeCategory },
  ];

  let reviewCount = 0;
  for (let i = 1; i <= 15; i++) {
    const jobId = `job-${i}`;
    const template = getRandom(jobTemplates);
    const homeownerId = getRandom(homeownerIds);
    const loc = getRandomLocation();
    const status = i <= 6 ? jobStatuses[i - 1] : getRandom(jobStatuses);
    const urgency: Urgency = i % 5 === 0 ? "urgent" : i % 3 === 0 ? "this_week" : "flexible";

    const job: Job = {
      jobId,
      homeownerId,
      title: template.title,
      description: template.desc,
      tradeCategory: template.cat,
      location: new GeoPoint(loc.lat, loc.lng),
      suburb: loc.suburb,
      urgency,
      photos: Array.from({ length: 2 }, (_, k) => `https://picsum.photos/seed/job-${i}-${k}/400/300`),
      status,
      acceptedQuoteId: null,
      createdAt: Timestamp.now(),
    };

    batch.set(doc(db, "jobs", jobId), job);
    jobIds.push(jobId);

    // 4. Create Quotes for these jobs
    const numQuotes = (i % 4) + 1; // 1 to 4 quotes
    const eligibleTPs = tradespersonIds.filter((_, idx) => i % 4 === idx % 4); // Simple distribution

    for (let q = 0; q < numQuotes; q++) {
      const quoteId = `quote-${i}-${q}`;
      const tradespersonId = getRandom(eligibleTPs);
      const isAccepted = status !== "posted" && status !== "quoted" && q === 0;

      const quote: Quote = {
        quoteId,
        jobId,
        tradespersonId,
        priceZAR: (1500 + Math.floor(Math.random() * 10000)) * 100, // stored as cents
        estimatedDays: 1 + Math.floor(Math.random() * 7),
        message: "I am available to assist with this job. I have extensive experience in this type of work.",
        status: isAccepted ? "accepted" : (status === "quoted" ? "pending" : "declined"),
        createdAt: Timestamp.now(),
      };

      batch.set(doc(db, "quotes", quoteId), quote);

      if (isAccepted) {
        batch.update(doc(db, "jobs", jobId), { acceptedQuoteId: quoteId });

        // 5. Create Review if job is reviewed or completed (to reach 20 reviews)
        if (status === "reviewed" || status === "completed" || reviewCount < 20) {
          const reviewId = `review-${reviewCount}`;
          const review: Review = {
            reviewId,
            jobId,
            homeownerId,
            tradespersonId,
            rating: 4 + Math.floor(Math.random() * 2),
            comment: "Excellent service! Very professional and thorough work.",
            createdAt: Timestamp.now(),
          };
          batch.set(doc(db, "reviews", reviewId), review);
          reviewCount++;
        }
      }
    }
  }

  await batch.commit();
  console.log(`Database seeded successfully with ${reviewCount} reviews!`);
};
