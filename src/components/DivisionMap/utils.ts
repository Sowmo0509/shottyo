import { COLOR_STEPS } from "./constants";

const divisionDistricts: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Chittagong: ["Chittagong", "Bandarban", "Brahamanbaria", "Chandpur", "Comilla", "Cox'SBazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  Rajshahi: ["Rajshahi", "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Sirajganj"],
  Khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Barisal: ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Sylhet: ["Sylhet", "Habiganj", "Maulvibazar", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrakona", "Sherpur"],
};

// Mapping from Sanity "value" strings to GeoJSON "name" strings
const divisionValueMap: Record<string, string> = {
  barishal: "Barisal",
  chattogram: "Chittagong",
  dhaka: "Dhaka",
  khulna: "Khulna",
  rajshahi: "Rajshahi",
  rangpur: "Rangpur",
  sylhet: "Sylhet",
  mymensingh: "Dhaka", // Special case for division map
};

const districtValueMap: Record<string, string> = {
  barguna: "Barguna",
  barishal: "Barisal",
  bhola: "Bhola",
  jhalokathi: "Jhalokati",
  patuakhali: "Patuakhali",
  pirojpur: "Pirojpur",
  bandarban: "Bandarban",
  brahmanbaria: "Brahamanbaria",
  chandpur: "Chandpur",
  chattogram: "Chittagong",
  cumilla: "Comilla",
  coxsbazar: "Cox'SBazar",
  feni: "Feni",
  khagrachari: "Khagrachhari",
  lakshmipur: "Lakshmipur",
  noakhali: "Noakhali",
  rangamati: "Rangamati",
  dhaka: "Dhaka",
  faridpur: "Faridpur",
  gazipur: "Gazipur",
  gopalganj: "Gopalganj",
  kishoreganj: "Kishoreganj",
  madaripur: "Madaripur",
  manikganj: "Manikganj",
  munshiganj: "Munshiganj",
  narayanganj: "Narayanganj",
  narsingdi: "Narsingdi",
  rajbari: "Rajbari",
  shariatpur: "Shariatpur",
  tangail: "Tangail",
  bagerhat: "Bagerhat",
  chuadanga: "Chuadanga",
  jashore: "Jessore",
  jhenaidah: "Jhenaidah",
  khulna: "Khulna",
  kushtia: "Kushtia",
  magura: "Magura",
  meherpur: "Meherpur",
  narail: "Narail",
  satkhira: "Satkhira",
  jamalpur: "Jamalpur",
  mymensingh: "Mymensingh",
  netrokona: "Netrokona",
  sherpur: "Sherpur",
  bogura: "Bogra",
  jaipurhat: "Joypurhat",
  naogaon: "Naogaon",
  natore: "Natore",
  nawabganj: "Nawabganj",
  pabna: "Pabna",
  rajshahi: "Rajshahi",
  sirajganj: "Sirajganj",
  dinajpur: "Dinajpur",
  gaibandha: "Gaibandha",
  kurigram: "Kurigram",
  lalmonirhat: "Lalmonirhat",
  nilphamari: "Nilphamari",
  panchagarh: "Panchagarh",
  rangpur: "Rangpur",
  thakurgaon: "Thakurgaon",
  habiganj: "Habiganj",
  moulvibazar: "Maulvibazar",
  sunamganj: "Sunamganj",
  sylhet: "Sylhet",
};

/** Map GeoJSON shapeName to our canonical key used in regionCounts (e.g. "Cox's Bazar" -> "Cox'SBazar") */
export const getDistrictKeyForMap = (shapeName: string): string => {
  if (shapeName === "Cox's Bazar") return "Cox'SBazar";
  return shapeName;
};

export const getDistrictFromField = (districtValue: string): string => {
  return districtValueMap[districtValue] || "Unknown";
};

export const getDivisionFromField = (divisionValue: string): string => {
  return divisionValueMap[divisionValue] || "Unknown";
};

export const getColorByCount = (count: number, maxCount: number): string => {
  if (count === 0) return COLOR_STEPS[0];
  const ratio = count / maxCount;
  if (ratio <= 0.25) return COLOR_STEPS[1];
  if (ratio <= 0.5) return COLOR_STEPS[2];
  if (ratio <= 0.75) return COLOR_STEPS[3];
  return COLOR_STEPS[4];
};
