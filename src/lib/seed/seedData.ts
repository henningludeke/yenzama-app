import {
  doc,
  writeBatch,
  GeoPoint,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebase";
import type {
  User,
  TradespersonProfile,
  Job,
  Quote,
  Review,
  TradeCategory,
  Urgency,
  JobStatus
} from "../../types";

const TRADES: TradeCategory[] = ["plumbing", "electrical", "building", "painting"];

const LOCATIONS = [
  { suburb: "Sandton", city: "Johannesburg", province: "Gauteng", lat: -26.1076, lng: 28.0567 },
  { suburb: "Soweto", city: "Johannesburg", province: "Gauteng", lat: -26.2485, lng: 27.8540 },
  { suburb: "Midrand", city: "Johannesburg", province: "Gauteng", lat: -25.9992, lng: 28.1262 },
  { suburb: "Pretoria Central", city: "Pretoria", province: "Gauteng", lat: -25.7479, lng: 28.2293 },
  { suburb: "Cape Town City Centre", city: "Cape Town", province: "Western Cape", lat: -33.9249, lng: 18.4241 },
  { suburb: "Stellenbosch", city: "Stellenbosch", province: "Western Cape", lat: -33.9321, lng: 18.8602 },
  { suburb: "Bellville", city: "Cape Town", province: "Western Cape", lat: -33.8943, lng: 18.6294 },
  { suburb: "Durban Central", city: "Durban", province: "KwaZulu-Natal", lat: -29.8587, lng: 31.0218 },
  { suburb: "Umhlanga", city: "Durban", province: "KwaZulu-Natal", lat: -29.7271, lng: 31.0716 },
  { suburb: "Morningside", city: "Durban", province: "KwaZulu-Natal", lat: -29.8277, lng: 31.0113 },
];

const TP_NAMES = [
  "Sipho Cele", "Johan de Beer", "Khaya Mbeki", "David Smith", "Bheki Dlamini",
  "Pieter Marais", "Lungile Zwane", "Michael Johnson", "Mondli Khumalo", "Willem van Wyk",
  "Mzi Gqubule", "Robert Brown", "Thabo Molefe", "Koos Erasmus", "Zweli Zuma",
  "James Wilson", "Jabu Ngcobo", "Dirk Coetzee", "Anathi Madikizela", "Sarah Williams"
];

const HO_NAMES = [
  "Thandi Khoza", "Lindiwe Buthelezi", "Annetjie Louw", "Elizabeth Taylor", "Nomvula Mpofu",
  "Elsabe Botha", "Mary Green", "Zanele Gumede", "Marietjie Pretorius", "Jennifer Davis"
];

const JOB_TITLES: Record<TradeCategory, string[]> = {
  plumbing: [
    "Leaking kitchen tap",
    "Geyser installation",
    "Blocked drain in bathroom",
    "Toilet not flushing",
    "New shower head installation"
  ],
  electrical: [
    "New DB board installation",
    "Fixing outdoor lights",
    "Extra power points in kitchen",
    "Faulty circuit breaker",
    "Certificate of Compliance (CoC)"
  ],
  building: [
    "Patio wall construction",
    "Tiling bathroom floor",
    "Kitchen backsplash tiling",
    "Driveway paving repairs",
    "Plastering lounge wall"
  ],
  painting: [
    "Interior house painting (3 rooms)",
    "Exterior boundary wall painting",
    "Roof painting and sealing",
    "Door frame varnishing",
    "Ceiling repaint after leak"
  ]
};

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const seedDatabase = async () => {
  const batch = writeBatch(db);
  const now = Timestamp.now();

  const tradespeople: User[] = [];
  const tpProfiles: TradespersonProfile[] = [];
  const homeowners: User[] = [];
  const jobs: Job[] = [];
  const quotes: Quote[] = [];
  const reviews: Review[] = [];

  // 1. Create Tradespeople
  TP_NAMES.forEach((name, index) => {
    const uid = `tp_${index + 1}`;
    const locationInfo = getRandom(LOCATIONS);
    const trade = TRADES[index % TRADES.length];

    const user: User = {
      uid,
      role: "tradesperson",
      displayName: name,
      phone: `+27${getRandomInt(810000000, 849999999)}`,
      photoURL: `https://picsum.photos/seed/${uid}/200/200`,
      location: new GeoPoint(locationInfo.lat, locationInfo.lng),
      suburb: locationInfo.suburb,
      city: locationInfo.city,
      createdAt: now,
    };
    tradespeople.push(user);

    const profile: TradespersonProfile = {
      uid,
      businessName: `${name.split(' ')[0]}'s ${trade.charAt(0).toUpperCase() + trade.slice(1)} Services`,
      bio: `Professional ${trade} with over ${getRandomInt(3, 15)} years of experience serving the ${locationInfo.city} area.`,
      trades: [trade],
      serviceRadius: getRandomInt(15, 50),
      serviceLocation: new GeoPoint(locationInfo.lat, locationInfo.lng),
      portfolioPhotos: [
        `https://picsum.photos/seed/${uid}_p1/400/300`,
        `https://picsum.photos/seed/${uid}_p2/400/300`,
        `https://picsum.photos/seed/${uid}_p3/400/300`
      ],
      verified: index < 5, // First 5 are verified
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      reviewCount: getRandomInt(2, 45),
    };
    tpProfiles.push(profile);
  });

  // 2. Create Homeowners
  HO_NAMES.forEach((name, index) => {
    const uid = `ho_${index + 1}`;
    const locationInfo = getRandom(LOCATIONS.filter(l => l.province !== "KwaZulu-Natal")); // Gauteng & WC per spec

    const user: User = {
      uid,
      role: "homeowner",
      displayName: name,
      phone: `+27${getRandomInt(810000000, 849999999)}`,
      photoURL: `https://picsum.photos/seed/${uid}/200/200`,
      location: new GeoPoint(locationInfo.lat, locationInfo.lng),
      suburb: locationInfo.suburb,
      city: locationInfo.city,
      createdAt: now,
    };
    homeowners.push(user);
  });

  // 3. Create Jobs
  const jobCount = 15;
  for (let i = 0; i < jobCount; i++) {
    const jobId = `job_${i + 1}`;
    const homeowner = getRandom(homeowners);
    const trade = TRADES[i % TRADES.length];
    const status: JobStatus = i < 2 ? "reviewed" :
                            i < 4 ? "completed" :
                            i < 7 ? "accepted" :
                            i < 12 ? "quoted" : "posted";

    const job: Job = {
      jobId,
      homeownerId: homeowner.uid,
      title: getRandom(JOB_TITLES[trade]),
      description: `Need someone to help with ${trade} work at my home. Please provide a quote.`,
      tradeCategory: trade,
      location: homeowner.location,
      suburb: homeowner.suburb,
      urgency: i < 2 ? "urgent" : getRandom(["urgent", "this_week", "flexible"]) as Urgency,
      photos: [`https://picsum.photos/seed/${jobId}/400/300`],
      status: status,
      acceptedQuoteId: null,
      createdAt: now,
    };
    jobs.push(job);
  }

  // 4. Create Quotes and Reviews
  jobs.forEach((job) => {
    // Select 1-3 tradespeople for each job
    const relevantTPs = tpProfiles.filter(tp => tp.trades.includes(job.tradeCategory));
    const selectedTPs = relevantTPs.sort(() => 0.5 - Math.random()).slice(0, getRandomInt(1, 3));

    selectedTPs.forEach((tp, tpIndex) => {
      const quoteId = `quote_${job.jobId}_${tp.uid}`;
      const isAccepted = (job.status === "accepted" || job.status === "in_progress" || job.status === "completed" || job.status === "reviewed") && tpIndex === 0;

      const quote: Quote = {
        quoteId,
        jobId: job.jobId,
        tradespersonId: tp.uid,
        priceZAR: getRandomInt(500, 5000) * 100, // stored in cents
        estimatedDays: getRandomInt(1, 5),
        message: "I can help you with this job. I have experience in similar tasks.",
        status: isAccepted ? "accepted" : (job.status === "quoted" ? "pending" : "declined"),
        createdAt: now,
      };
      quotes.push(quote);

      if (isAccepted) {
        job.acceptedQuoteId = quoteId;

        // Create review for completed/reviewed jobs
        if (job.status === "reviewed" || job.status === "completed") {
          const review: Review = {
            reviewId: `review_${job.jobId}`,
            jobId: job.jobId,
            homeownerId: job.homeownerId,
            tradespersonId: tp.uid,
            rating: getRandomInt(4, 5),
            comment: getRandom([
              "Excellent service, very professional!",
              "Did a great job, arrived on time.",
              "Highly recommended for any plumbing work.",
              "Clean work and fair price.",
              "Very happy with the result."
            ]),
            createdAt: now,
          };
          reviews.push(review);
          if (job.status === "completed") job.status = "reviewed"; // Ensure it matches spec
        }
      }
    });
  });

  // Ensure we have exactly 20 reviews as per spec
  // We might have less if not enough jobs were reviewed.
  while (reviews.length < 20) {
    const completedJobs = jobs.filter(j => j.status === "completed" || j.status === "reviewed");
    const randomJob = getRandom(completedJobs.length > 0 ? completedJobs : jobs);

    // Find the accepted tradesperson for this job, or pick a random one if none
    const acceptedQuote = quotes.find(q => q.jobId === randomJob.jobId && q.status === "accepted");
    const tpId = acceptedQuote ? acceptedQuote.tradespersonId : getRandom(tpProfiles).uid;

    reviews.push({
      reviewId: `review_extra_${reviews.length}`,
      jobId: randomJob.jobId,
      homeownerId: randomJob.homeownerId,
      tradespersonId: tpId,
      rating: getRandomInt(3, 5),
      comment: "A standard review for a job well done.",
      createdAt: now,
    });
  }

  // Push to batch
  tradespeople.forEach(u => batch.set(doc(db, "users", u.uid), u));
  tpProfiles.forEach(p => batch.set(doc(db, "tradespersonProfiles", p.uid), p));
  homeowners.forEach(u => batch.set(doc(db, "users", u.uid), u));
  jobs.forEach(j => batch.set(doc(db, "jobs", j.jobId), j));
  quotes.forEach(q => batch.set(doc(db, "quotes", q.quoteId), q));
  reviews.forEach(r => batch.set(doc(db, "reviews", r.reviewId), r));

  await batch.commit();
  console.log("Database seeded successfully!");
};
