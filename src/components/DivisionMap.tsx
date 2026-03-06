"use client";

import React, { useMemo, useState, useRef, useEffect, useCallback, startTransition } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "@vnedyalk0v/react19-simple-maps";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";
import { Incident } from "@/types";

interface Props {
  incidents: Incident[] | null;
}

const getDivisionFromLocation = (locText: string): string => {
  const loc = locText.toLowerCase();

  const divisionMappings: Record<string, string[]> = {
    Dhaka: ["dhaka", "faridpur", "gazipur", "gopalganj", "kishoreganj", "madaripur", "manikganj", "munshiganj", "narayanganj", "narsingdi", "rajbari", "shariatpur", "tangail"],
    Chittagong: ["chittagong", "chattogram", "bandarban", "brahmanbaria", "chandpur", "comilla", "cox's bazar", "coxs bazar", "feni", "khagrachari", "lakshmipur", "noakhali", "rangamati", "sitakunda"],
    Rajshahi: ["rajshahi", "bogra", "joypurhat", "naogaon", "natore", "nawabganj", "chapinawabganj", "pabna", "sirajganj"],
    Khulna: ["khulna", "bagerhat", "chuadanga", "jessore", "jashore", "jhenaidah", "kushtia", "magura", "meherpur", "narail", "satkhira"],
    Barisal: ["barisal", "barishal", "barguna", "bhola", "jhalokati", "patuakhali", "pirojpur"],
    Sylhet: ["sylhet", "habiganj", "moulvibazar", "sunamganj"],
    Rangpur: ["rangpur", "dinajpur", "gaibandha", "kurigram", "lalmonirhat", "nilphamari", "panchagarh", "thakurgaon"],
    Mymensingh: ["mymensingh", "jamalpur", "netrokona", "sherpur"],
  };

  for (const [division, keywords] of Object.entries(divisionMappings)) {
    if (keywords.some((keyword) => loc.includes(keyword))) {
      return division === "Mymensingh" ? "Dhaka" : division;
    }
  }

  return "Unknown";
};

// Division centroids for zoom targeting [lng, lat]
const DIVISION_CENTERS: Record<string, [number, number]> = {
  Dhaka: [90.4, 23.8],
  Chittagong: [91.8, 22.4],
  Rajshahi: [88.6, 24.4],
  Khulna: [89.6, 22.8],
  Barisal: [90.3, 22.7],
  Sylhet: [91.9, 24.9],
  Rangpur: [89.2, 25.7],
};

const DEFAULT_CENTER = [90.2, 23.8] as [number, number];

// 5-step color scale
const COLOR_STEPS = [
  "#4ade80", // green-400  — 0
  "#facc15", // yellow-400 — few
  "#f97316", // orange-400 — moderate
  "#ef4444", // red-500    — high
  "#7f1d1d", // red-950    — very high
];

const getColorByCount = (count: number, maxCount: number): string => {
  if (count === 0) return COLOR_STEPS[0];
  const ratio = count / maxCount;
  if (ratio <= 0.25) return COLOR_STEPS[1];
  if (ratio <= 0.5) return COLOR_STEPS[2];
  if (ratio <= 0.75) return COLOR_STEPS[3];
  return COLOR_STEPS[4];
};

const STATUS_STYLES: Record<string, { label: string; labelBn: string; bg: string; text: string }> = {
  open: { label: "Open", labelBn: "খোলা", bg: "bg-red-500/20", text: "text-red-400" },
  pending: { label: "Pending", labelBn: "বিচারাধীন", bg: "bg-yellow-500/20", text: "text-yellow-400" },
  closed: { label: "Closed", labelBn: "বন্ধ", bg: "bg-green-500/20", text: "text-green-400" },
};

function useAnimatedZoom(initial: { zoom: number; center: [number, number] }) {
  const [display, setDisplay] = useState(initial);
  const target = useRef(initial);
  const raf = useRef<number | null>(null);

  const animateTo = useCallback((next: { zoom: number; center: [number, number] }) => {
    target.current = next;
    if (raf.current !== null) cancelAnimationFrame(raf.current);

    const DURATION = 600; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic

      startTransition(() => {
        setDisplay((prev) => ({
          zoom: prev.zoom + (target.current.zoom - prev.zoom) * ease,
          center: [prev.center[0] + (target.current.center[0] - prev.center[0]) * ease, prev.center[1] + (target.current.center[1] - prev.center[1]) * ease],
        }));
      });

      if (t < 1) raf.current = requestAnimationFrame(tick);
      else {
        startTransition(() => {
          setDisplay(target.current);
        });
        raf.current = null;
      }
    };

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(
    () => () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  return { display, animateTo };
}

export function DivisionMap({ incidents }: Props) {
  const { language } = useAppStore();
  const { theme } = useTheme();

  const [geoData, setGeoData] = useState<object | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const { display, animateTo } = useAnimatedZoom({ zoom: 1, center: DEFAULT_CENTER });
  const { zoom, center } = display;

  // Fetch GeoJSON on mount to avoid URL constructor errors with bare paths
  useEffect(() => {
    fetch("/bangladesh-divisions.json")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  // Map each incident to its division
  const incidentsByDivision = useMemo(() => {
    const map: Record<string, Incident[]> = {};
    if (!incidents) return map;
    incidents.forEach((incident) => {
      const location = (incident.location?.en || incident.location?.bn || "").toString();
      const division = getDivisionFromLocation(location);
      if (!map[division]) map[division] = [];
      map[division].push(incident);
    });
    return map;
  }, [incidents]);

  const divisionCounts = useMemo(() => Object.fromEntries(Object.entries(incidentsByDivision).map(([k, v]) => [k, v.length])), [incidentsByDivision]);

  const maxCount = Math.max(...Object.values(divisionCounts), 1);

  const legendLabels = ["0", `1–${Math.ceil(maxCount * 0.25)}`, `${Math.ceil(maxCount * 0.25) + 1}–${Math.ceil(maxCount * 0.5)}`, `${Math.ceil(maxCount * 0.5) + 1}–${Math.ceil(maxCount * 0.75)}`, `${Math.ceil(maxCount * 0.75) + 1}+`];

  const handleDivisionClick = (divisionName: string) => {
    startTransition(() => {
      if (selectedDivision === divisionName) {
        setSelectedDivision(null);
        animateTo({ zoom: 1, center: DEFAULT_CENTER });
      } else {
        setSelectedDivision(divisionName);
        animateTo({ zoom: 3.5, center: DIVISION_CENTERS[divisionName] ?? DEFAULT_CENTER });
      }
    });
  };

  const selectedIncidents = selectedDivision ? (incidentsByDivision[selectedDivision] ?? []) : [];

  return (
    <Card className="mb-8 overflow-hidden bg-background/50 backdrop-blur-sm border-muted">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">{language === "bn" ? "বিভাগ অনুযায়ী ঘটনা" : "Incidents by Division"}</CardTitle>
        {selectedDivision && (
          <button
            onClick={() => {
              setSelectedDivision(null);
              animateTo({ zoom: 1, center: DEFAULT_CENTER });
            }}
            className="text-xs text-muted-foreground hover:text-foreground border border-muted px-3 py-1 rounded-full transition-colors">
            ← {language === "bn" ? "ফিরে যান" : "Back to full map"}
          </button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Map */}
          <div className="flex-1 min-h-[380px] sm:min-h-[460px]">
            {!geoData ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Loading map…</div>
            ) : (
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 5500, center: DEFAULT_CENTER as any }} style={{ width: "100%", height: "100%" }}>
                <ZoomableGroup zoom={zoom} center={center as any} onMoveEnd={() => {}}>
                  <Geographies geography={geoData}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const divisionName = geo.properties?.name;
                        if (!divisionName) return null;
                        const count = divisionCounts[divisionName] || 0;
                        const isSelected = selectedDivision === divisionName;
                        const fill = isSelected
                          ? "#3b82f6" // blue-500 when selected
                          : getColorByCount(count, maxCount);

                        return (
                          <Geography
                            key={String(geo.id ?? divisionName)}
                            geography={geo}
                            fill={fill}
                            stroke={theme === "dark" ? "#1f2937" : "#ffffff"}
                            strokeWidth={isSelected ? 2 : 1}
                            onClick={() => handleDivisionClick(divisionName)}
                            style={{
                              default: { outline: "none" },
                              hover: {
                                fill: isSelected ? "#2563eb" : "#60a5fa",
                                outline: "none",
                                cursor: "pointer",
                              },
                              pressed: { outline: "none" },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            )}
          </div>

          {/* Incident Panel */}
          {selectedDivision && (
            <div className="lg:w-72 w-full flex flex-col gap-2 animate-in slide-in-from-right-4 duration-300" style={{ maxHeight: 460, overflowY: "auto" }}>
              <div className="sticky top-0 pb-2 bg-background/80 backdrop-blur-sm z-10">
                <h3 className="font-semibold text-base">{selectedDivision}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedIncidents.length} {language === "bn" ? "টি ঘটনা" : selectedIncidents.length === 1 ? "incident" : "incidents"}
                </p>

                {/* Status summary chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(["open", "pending", "closed"] as const).map((status) => {
                    const c = selectedIncidents.filter((i) => i.status === status).length;
                    if (c === 0) return null;
                    const s = STATUS_STYLES[status];
                    return (
                      <span key={status} className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                        {c} {language === "bn" ? s.labelBn : s.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {selectedIncidents.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">{language === "bn" ? "কোনো ঘটনা নেই।" : "No incidents recorded."}</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {selectedIncidents.map((incident) => {
                    const s = STATUS_STYLES[incident.status] ?? STATUS_STYLES.open;
                    const title = language === "bn" ? incident.title?.bn || incident.title?.en || "" : incident.title?.en || incident.title?.bn || "";
                    return (
                      <li key={incident._id} className="rounded-lg border border-muted bg-muted/30 px-3 py-2.5">
                        <p className="text-sm font-medium leading-snug line-clamp-2">{title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{language === "bn" ? s.labelBn : s.label}</span>
                          {incident.dateOfIncident && <span className="text-[10px] text-muted-foreground">{new Date(incident.dateOfIncident).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Strip Legend */}
        <div className="mt-4 px-2 pb-1">
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">{language === "bn" ? "ঘটনার সংখ্যা" : "Incident count"}</p>
          <div className="flex w-full rounded overflow-hidden h-3">
            {COLOR_STEPS.map((color, i) => (
              <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="flex w-full mt-1.5">
            {legendLabels.map((label, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-muted-foreground leading-none">
                {label}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
