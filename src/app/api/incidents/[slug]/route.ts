import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug;
    const query = `{
      "incident": *[_type == "incident" && slug.current == $slug][0] {
        ...,
        "victims": *[_type == "victim" && incident._ref == ^._id],
        "timeline": *[_type == "timelineEvent" && incident._ref == ^._id] | order(date desc)
      }
    }`;

    const result = await client.fetch(query, { slug });

    if (!result.incident) {
      return NextResponse.json({ error: "Incident not found" }, { status: 404 });
    }

    return NextResponse.json(result.incident);
  } catch (error) {
    console.error("Error fetching incident:", error);
    return NextResponse.json({ error: "Failed to fetch incident details" }, { status: 500 });
  }
}
