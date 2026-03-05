import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { Incident } from "@/types";

export async function GET() {
  try {
    const query = `*[_type == "incident"] | order(dateOfIncident desc) {
      _id,
      title,
      slug,
      description,
      dateOfIncident,
      location,
      images,
      videoUrls,
      status,
      verdict
    }`;

    const incidents = await client.fetch<Incident[]>(query);

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}
