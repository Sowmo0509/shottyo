export const DIVISION_CENTERS: Record<string, [number, number]> = {
  Dhaka: [90.4, 23.8],
  Chittagong: [91.8, 22.4],
  Rajshahi: [88.6, 24.4],
  Khulna: [89.6, 22.8],
  Barisal: [90.3, 22.7],
  Sylhet: [91.9, 24.9],
  Rangpur: [89.2, 25.7],
};

export const DEFAULT_CENTER: [number, number] = [90.2, 23.8];

/** Projection scale: lower = more zoomed out. Divisions use 5500; districts use a lower scale so all 64 fit. */
export const PROJECTION_SCALE_DIVISION = 5500;
export const PROJECTION_SCALE_DISTRICT = 3800;

// 5-step color scale
export const COLOR_STEPS = [
  "#4ade80", // green-400  — 0
  "#facc15", // yellow-400 — few
  "#f97316", // orange-400 — moderate
  "#ef4444", // red-500    — high
  "#7f1d1d", // red-950    — very high
];

export const STATUS_STYLES: Record<string, { label: string; labelBn: string; bg: string; text: string }> = {
  open: { label: "Open", labelBn: "খোলা", bg: "bg-red-500/20", text: "text-red-400" },
  pending: { label: "Pending", labelBn: "বিচারাধীন", bg: "bg-yellow-500/20", text: "text-yellow-400" },
  closed: { label: "Closed", labelBn: "বন্ধ", bg: "bg-green-500/20", text: "text-green-400" },
};
