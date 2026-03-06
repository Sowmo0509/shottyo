"use client";

import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";
import { Incident } from "@/types";

const geoUrl = "/bangladesh-divisions.json";

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
      return division === "Mymensingh" ? "Dhaka" : division; // Fallback Mymensingh to Dhaka due to Map lacking Mymensingh
    }
  }

  return "Unknown";
};

export function DivisionMap({ incidents }: Props) {
  const { language } = useAppStore();
  const { theme } = useTheme();

  const divisionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (!incidents) return counts;

    incidents.forEach((incident) => {
      const location = (incident.location?.en || incident.location?.bn || "").toString();
      const resolvedDivision = getDivisionFromLocation(location);

      counts[resolvedDivision] = (counts[resolvedDivision] || 0) + 1;
    });
    return counts;
  }, [incidents]);

  const maxCount = Math.max(...Object.values(divisionCounts), 1);

  // Gradient calculator
  const getColor = (count: number) => {
    if (count === 0) return theme === "dark" ? "#333333" : "#f3f4f6"; // gray-800 or gray-100

    // Scale opacity based on count. Simple red scale for incidents.
    const opacity = 0.3 + (0.7 * count) / maxCount;
    return `rgba(220, 38, 38, ${opacity})`; // red-600
  };

  return (
    <Card className="mb-8 overflow-hidden bg-background/50 backdrop-blur-sm border-muted">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{language === "bn" ? "বিভাগ অনুযায়ী ঘটনা" : "Incidents by Division"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] sm:h-[500px] flex items-center justify-center">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 3500,
              center: [90.2, 23.8], // Coordinates for Bangladesh
            }}
            style={{ width: "100%", height: "100%" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const divisionName = geo.properties.name;
                  const count = divisionCounts[divisionName] || 0;
                  const isHovered = count > 0;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getColor(count)}
                      stroke={theme === "dark" ? "#1f2937" : "#ffffff"} // gray-800 or white
                      strokeWidth={1}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: isHovered ? "rgba(220, 38, 38, 1)" : getColor(count), // red-600
                          outline: "none",
                          cursor: isHovered ? "pointer" : "default",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </CardContent>
    </Card>
  );
}
