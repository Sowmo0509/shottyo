/**
 * Seed Sanity dataset with dummy incidents, victims, and timeline events.
 *
 * Requires:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET
 *   - SANITY_API_WRITE_TOKEN (create at sanity.io → Project → API → Tokens, Editor or Admin)
 *
 * Run: npx tsx scripts/seed-sanity.ts
 * Or:  pnpm exec tsx scripts/seed-sanity.ts
 *
 * Run: pnpm run seed:sanity (reads .env.local if present).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Load .env.local into process.env when running from project root
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match) {
      const value = match[2].replace(/^["']|["']$/g, "").trim();
      if (!process.env[match[1]]) process.env[match[1]] = value;
    }
  }
}

import { createClient } from "next-sanity";
import { divisions, districts } from "../src/sanity/lib/locations";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Create a token at https://sanity.io/manage (Project → API → Tokens) with Editor or Admin permissions.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-05",
  token,
  useCdn: false,
});

function pickDivisionDistrict(): { division: string; district: string } {
  const division = divisions[Math.floor(Math.random() * divisions.length)];
  const eligible = districts.filter((d) => d.division === division.value);
  const district = eligible[Math.floor(Math.random() * eligible.length)];
  return { division: division.value, district: district.value };
}

const INCIDENTS = [
  {
    slug: "factory-fire-dhaka-2024",
    title: { en: "Factory Fire in Dhaka Industrial Area", bn: "ঢাকা শিল্প অঞ্চলে কারখানায় অগ্নিকাণ্ড" },
    description: {
      en: "A major fire broke out at a garment factory in the Dhaka industrial zone. Emergency services responded. The cause is under investigation.",
      bn: "ঢাকা শিল্প অঞ্চলের একটি গার্মেন্টস কারখানায় বড় অগ্নিকাণ্ড সংঘটিত হয়। জরুরি সেবা প্রতিক্রিয়া দেখায়। কারণ তদন্তাধীন।",
    },
    location: { en: "Dhaka Industrial Area, Keraniganj", bn: "কেরানীগঞ্জ, ঢাকা শিল্প অঞ্চল" },
    status: "open" as const,
    verdict: undefined,
  },
  {
    slug: "road-accident-chattogram-highway",
    title: { en: "Fatal Road Accident on Chattogram Highway", bn: "চট্টগ্রাম মহাসড়কে মর্মান্তিক সড়ক দুর্ঘটনা" },
    description: {
      en: "A bus collided with a truck on the Dhaka-Chattogram highway. Multiple casualties reported. Investigation ongoing.",
      bn: "ঢাকা-চট্টগ্রাম মহাসড়কে একটি বাস ট্রাকের সাথে ধাক্কা খায়। একাধিক হতাহতের খবর। তদন্ত চলছে।",
    },
    location: { en: "Dhaka-Chattogram Highway, near Feni", bn: "ফেনীর কাছাকাছি ঢাকা-চট্টগ্রাম মহাসড়ক" },
    status: "pending" as const,
    verdict: undefined,
  },
  {
    slug: "building-collapse-sylhet",
    title: { en: "Building Collapse in Sylhet City", bn: "সিলেট সিটিতে ভবন ধস" },
    description: {
      en: "A multi-storey building under construction collapsed. Rescue operations completed. Legal action initiated.",
      bn: "নির্মাণাধীন একটি বহুতল ভবন ধসে পড়ে। উদ্ধারকার্য সম্পন্ন। আইনি ব্যবস্থা নেওয়া হয়েছে।",
    },
    location: { en: "Zindabazar, Sylhet", bn: "জিন্দাবাজার, সিলেট" },
    status: "closed" as const,
    verdict: {
      en: "Court found the building owner and contractor liable. Compensation ordered for victims' families.",
      bn: "আদালত ভবন মালিক ও ঠিকাদারকে দায়ী সাব্যস্ত করে। ক্ষতিগ্রস্তদের পরিবারকে ক্ষতিপূরণের নির্দেশ।",
    },
  },
  {
    slug: "protest-incident-rajshahi",
    title: { en: "Protest Incident and Police Response in Rajshahi", bn: "রাজশাহীতে বিক্ষোভ ও পুলিশি প্রতিক্রিয়া" },
    description: {
      en: "A public protest turned violent. Several injured. Shottyo Watchdog is documenting the sequence of events and official response.",
      bn: "একটি জনসমাবেশে সহিংসতা ছড়িয়ে পড়ে। কয়েকজন আহত। সত্য ওয়াচডগ ঘটনাক্রম ও সরকারি প্রতিক্রিয়া নথিভুক্ত করছে।",
    },
    location: { en: "Rajshahi City Corporation area", bn: "রাজশাহী সিটি কর্পোরেশন অঞ্চল" },
    status: "open" as const,
    verdict: undefined,
  },
  {
    slug: "boat-capsize-barishal",
    title: { en: "Boat Capsize in Barishal Waterway", bn: "বরিশাল জলপথে নৌকা ডুবে যাওয়া" },
    description: {
      en: "A passenger boat capsized during stormy weather. Rescue efforts ongoing. Overcrowding suspected.",
      bn: "ঝড়ো আবহাওয়ায় একটি যাত্রীবাহী নৌকা ডুবে যায়। উদ্ধারকার্য চলছে। অতিরিক্ত যাত্রী সন্দেহ।",
    },
    location: { en: "Kirtonkhola River, Barishal", bn: "কীর্তনখোলা নদী, বরিশাল" },
    status: "pending" as const,
    verdict: undefined,
  },
];

const VICTIMS_TEMPLATES = [
  { name: { en: "Abdul Karim", bn: "আবদুল করিম" }, status: "deceased" as const, age: 45, description: { en: "Factory worker, night shift.", bn: "কারখানা কর্মী, রাতের শিফট।" } },
  { name: { en: "Fatima Begum", bn: "ফাতিমা বেগম" }, status: "injured" as const, age: 32, description: { en: "Sustained burns; hospitalized.", bn: "পোড়া আঘাত; হাসপাতালে ভর্তি।" } },
  { name: { en: "Rahim Uddin", bn: "রহিম উদ্দিন" }, status: "missing" as const, age: 28, description: { en: "Last seen at site. Search ongoing.", bn: "স্থানে শেষ দেখা। খোঁজ চলছে।" } },
  { name: { en: "Nazma Akter", bn: "নাজমা আক্তার" }, status: "safe" as const, age: 24, description: { en: "Escaped with minor injuries.", bn: "সামান্য আঘাত নিয়ে পালিয়ে আসেন।" } },
];

const TIMELINE_TEMPLATES = [
  { title: { en: "Incident reported", bn: "ঘটনা রিপোর্ট করা হয়" }, eventType: "update" as const, description: { en: "First report received by authorities.", bn: "প্রথম রিপোর্ট কর্তৃপক্ষের কাছে পৌঁছায়।" } },
  { title: { en: "Emergency response deployed", bn: "জরুরি প্রতিক্রিয়া মোতায়েন" }, eventType: "action" as const, description: { en: "Fire service and ambulances arrived.", bn: "ফায়ার সার্ভিস ও অ্যাম্বুলেন্স পৌঁছায়।" } },
  { title: { en: "Preliminary inquiry ordered", bn: "প্রাথমিক তদন্তের নির্দেশ" }, eventType: "action" as const, description: { en: "Government orders investigation.", bn: "সরকার তদন্তের নির্দেশ দেয়।" } },
  { title: { en: "Court verdict", bn: "আদালতের রায়" }, eventType: "verdict" as const, description: { en: "Verdict delivered; compensation ordered.", bn: "রায় ঘোষণা; ক্ষতিপূরণের নির্দেশ।" } },
];

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function toISO(d: Date): string {
  return d.toISOString();
}

async function main() {
  console.log("Seeding Sanity dataset:", dataset);
  const createdIncidentIds: string[] = [];

  for (let i = 0; i < INCIDENTS.length; i++) {
    const inc = INCIDENTS[i];
    const { division, district } = pickDivisionDistrict();
    const dateOfIncident = addMonths(new Date(), -i - 1);
    const doc = {
      _type: "incident",
      _id: `incident-seed-${inc.slug}`,
      title: inc.title,
      slug: { _type: "slug", current: inc.slug },
      description: inc.description,
      dateOfIncident: toISO(dateOfIncident),
      location: inc.location,
      division,
      district,
      images: [],
      videoUrls: [],
      status: inc.status,
      ...(inc.verdict && { verdict: inc.verdict }),
    };
    await client.createOrReplace(doc);
    createdIncidentIds.push(doc._id);
    console.log("  Created incident:", inc.slug);
  }

  for (const incidentId of createdIncidentIds) {
    const victimCount = 1 + Math.floor(Math.random() * 2);
    for (let v = 0; v < victimCount; v++) {
      const t = VICTIMS_TEMPLATES[v % VICTIMS_TEMPLATES.length];
      await client.createOrReplace({
        _type: "victim",
        _id: `${incidentId}-victim-${v}`,
        name: t.name,
        age: t.age,
        incident: { _type: "reference", _ref: incidentId },
        status: t.status,
        description: t.description,
      });
    }
    console.log("  Created victims for", incidentId);

    const timelineCount = 2 + Math.floor(Math.random() * 2);
    const baseDate = new Date();
    for (let te = 0; te < timelineCount; te++) {
      const t = TIMELINE_TEMPLATES[te % TIMELINE_TEMPLATES.length];
      const eventDate = addMonths(baseDate, -timelineCount + te);
      await client.createOrReplace({
        _type: "timelineEvent",
        _id: `${incidentId}-timeline-${te}`,
        incident: { _type: "reference", _ref: incidentId },
        title: t.title,
        description: t.description,
        date: toISO(eventDate),
        eventType: t.eventType,
      });
    }
    console.log("  Created timeline events for", incidentId);
  }

  console.log("Done. Seeded", createdIncidentIds.length, "incidents with victims and timeline events.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
