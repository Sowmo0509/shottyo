import { Incident } from "@/types";

export function generateDummyIncidents(count: number): Incident[] {
  const dummyIncidents: Incident[] = [];

  const districts = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];
  const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];
  const statuses = ["open", "closed", "pending"] as const;

  for (let i = 1; i <= count; i++) {
    const isDhaka = i % 3 === 0;
    const division = isDhaka ? "Dhaka" : divisions[i % divisions.length];
    const district = isDhaka ? "Dhaka" : districts[i % districts.length];

    const incident: Incident = {
      _id: `dummy-incident-${i}`,
      title: {
        en: `High-Profile Case Investigation #${i}`,
        bn: `গুরুত্বপূর্ণ তদন্ত মামলা #${i}`,
      },
      slug: { current: `dummy-incident-${i}` },
      description: {
        en: "This is a detailed record of the incident. It includes chronological updates, involved parties, and judicial progress. The tracker ensures absolute transparency over the proceedings.",
        bn: "এটি এই ঘটনার একটি বিস্তারিত বিবরণ। এতে কালানুক্রমিক আপডেট, জড়িত পক্ষ এবং বিচারিক অগ্রগতি অন্তর্ভুক্ত রয়েছে। ট্র্যাকারটি প্রক্রিয়ার উপর সম্পূর্ণ স্বচ্ছতা নিশ্চিত করে।",
      },
      dateOfIncident: new Date(Date.now() - i * 86400000 * 3).toISOString(), // Past days
      location: { en: "Central Court Area", bn: "কেন্দ্রীয় আদালত এলাকা" },
      division,
      district,
      status: statuses[i % 3],
      images: i % 2 === 0 ? [] : [], // We won't mock Sanity images easily without breaking `urlFor` unless we stub `urlFor`. Since `urlFor` expects a specific Sanity format, it's safer to leave images empty so it falls back to the beautiful "No image" placeholder.
    };

    dummyIncidents.push(incident);
  }

  return dummyIncidents;
}