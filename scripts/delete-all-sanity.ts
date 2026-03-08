/**
 * Delete all documents from the Sanity dataset (non-system only).
 *
 * Requires:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET
 *   - SANITY_API_WRITE_TOKEN (Editor or Admin at sanity.io → Project → API → Tokens)
 *
 * Run: npx tsx scripts/delete-all-sanity.ts
 * Or:  pnpm run delete:sanity
 *
 * Loads .env.local when run from project root. Asks for confirmation before deleting.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import * as readline from "node:readline";

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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET");
  process.exit(1);
}

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token at https://sanity.io/manage (Project → API → Tokens) with Editor or Admin permissions."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-05",
  token,
  useCdn: false,
});

/** GROQ: all document IDs except system (_.*) */
const ALL_DOCS_QUERY = '*[!_id in path("_.**")]._id';

const BATCH_SIZE = 100;

function ask(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${question} (y/N) `, (answer) => {
      rl.close();
      resolve(/^y|yes$/i.test(answer.trim()));
    });
  });
}

async function main() {
  console.log("Dataset:", projectId, "/", dataset);
  const ids: string[] = await client.fetch(ALL_DOCS_QUERY);
  const total = ids.length;

  if (total === 0) {
    console.log("No documents to delete.");
    return;
  }

  console.log("Found", total, "document(s) to delete.");
  const confirmed = await ask("Delete all? This cannot be undone.");
  if (!confirmed) {
    console.log("Aborted.");
    return;
  }

  let deleted = 0;
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();
    for (const id of batch) {
      tx.delete(id);
    }
    await tx.commit();
    deleted += batch.length;
    console.log("Deleted", deleted, "/", total);
  }

  console.log("Done. Deleted", total, "document(s).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
