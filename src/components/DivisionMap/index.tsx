"use client";

import React, { useMemo, useState, useRef, useEffect, useCallback, startTransition } from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import maplibregl, { type Map as MapLibreMapType } from "maplibre-gl";
import { useTheme } from "next-themes";
import { rewind } from "@turf/rewind";
import { centroid } from "@turf/centroid";
import { feature as topoFeature } from "topojson-client";
import type { FeatureCollection, Feature } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";
import { Incident } from "@/types";

import { DIVISION_CENTERS, DEFAULT_CENTER, COLOR_STEPS, STATUS_STYLES } from "./constants";
import { getDivisionFromField, getDistrictFromField, getDistrictKeyForMap, getColorByCount } from "./utils";

/** Minimal style: only a neutral background. No land/water/countries — only our Bangladesh layers show color. */
const BLANK_MAP_STYLE = {
  version: 8 as const,
  name: "blank",
  sources: {},
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#e5e7eb" },
    },
  ],
};

// ─── Map view: edit this to change bounds, zoom, and behavior ─────────────────
const MAP_CONFIG = {
  /** Map limits: set these four numbers to restrict panning. Longitude = east/west, latitude = north/south. */
  west: 85.4,
  south: 20.7,
  east: 95.5,
  north: 26.7,

  /** Initial map center [longitude, latitude]. */
  center: DEFAULT_CENTER,

  /** Initial zoom level. Lower = more zoomed out (e.g. 2 = far out, 6 = closer). */
  zoom: 2,

  /** Minimum zoom (how far out the user can zoom). */
  minZoom: 2,

  /** Maximum zoom (how far in the user can zoom). Omit or set high to allow full zoom in. */
  maxZoom: 12,

  /** Zoom level when a division is selected (click on division). */
  zoomOnSelectDivision: 6,

  /** Zoom level when a district is selected (click on district). */
  zoomOnSelectDistrict: 8,

  /** FlyTo animation duration in ms. */
  flyToDuration: 400,
};
// Bounds for MapLibre (derived from west/south/east/north above)
const MAP_BOUNDS: [[number, number], [number, number]] = [
  [MAP_CONFIG.west, MAP_CONFIG.south],
  [MAP_CONFIG.east, MAP_CONFIG.north],
];
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_VIEW = {
  longitude: MAP_CONFIG.center[0],
  latitude: MAP_CONFIG.center[1],
  zoom: MAP_CONFIG.zoom,
};

const REGIONS_FILL_LAYER_ID = "regions-fill";
const REGIONS_LINE_LAYER_ID = "regions-line";

/** Custom control: button that flies to default center and zoom */
function createCenterControl(
  center: [number, number],
  zoom: number,
  duration: number,
): { onAdd: (map: MapLibreMapType) => HTMLElement; onRemove: () => void } {
  let container: HTMLElement;
  let map: MapLibreMapType;
  return {
    onAdd(m) {
      map = m;
      container = document.createElement("div");
      container.className = "maplibregl-ctrl maplibregl-ctrl-group";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "maplibregl-ctrl-icon";
      btn.title = "Center map";
      btn.setAttribute("aria-label", "Center map");
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
      btn.addEventListener("click", () => {
        map.flyTo({ center, zoom, duration });
      });
      container.appendChild(btn);
      return container;
    },
    onRemove() {
      container?.parentNode?.removeChild(container);
    },
  };
}

interface Props {
  incidents: Incident[] | null;
}

type ViewType = "division" | "district";

type StyledProperties = { fillColor: string; regionName: string; count: number };

function buildStyledGeoJson(geoData: FeatureCollection | null, regionCounts: Record<string, number>, maxCount: number, viewType: ViewType, selectedRegion: string | null): FeatureCollection | null {
  if (!geoData?.features?.length) return null;

  const features: Feature[] = [];
  for (const f of geoData.features) {
    if (f.type !== "Feature" || !f.properties) continue;
    const regionName = viewType === "district" ? (f.properties.shapeName ?? f.properties.name ?? "") : (f.properties.name ?? "");
    if (!regionName) continue;
    const countKey = viewType === "district" ? getDistrictKeyForMap(regionName) : regionName;
    const count = regionCounts[countKey] ?? 0;
    const isSelected = selectedRegion === regionName;
    const fillColor = isSelected ? "#3b82f6" : getColorByCount(count, maxCount);
    features.push({
      ...f,
      id: f.id ?? regionName,
      properties: { ...f.properties, fillColor, regionName, count } as StyledProperties,
    });
  }

  return { type: "FeatureCollection", features };
}

const fillLayer = {
  id: REGIONS_FILL_LAYER_ID,
  type: "fill" as const,
  paint: {
    "fill-color": ["get", "fillColor"],
    "fill-opacity": 0.85,
  },
};

const lineLayer = {
  id: REGIONS_LINE_LAYER_ID,
  type: "line" as const,
  paint: {
    "line-color": "#ffffff",
    "line-width": 0.8,
  },
};

export function DivisionMap({ incidents }: Props) {
  const { language } = useAppStore();
  const { theme } = useTheme();
  const mapRef = useRef<MapLibreMapType | null>(null);

  const [divisionGeoData, setDivisionGeoData] = useState<FeatureCollection | null>(null);
  const [districtGeoData, setDistrictGeoData] = useState<FeatureCollection | null>(null);
  const [viewType, setViewType] = useState<ViewType>("division");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    fetch("/bangladesh-divisions.json")
      .then((r) => r.json())
      .then((topology: { objects?: { default?: unknown }; arcs?: unknown[] }) => {
        const obj = topology.objects?.default;
        if (!obj || !topology.arcs) return;
        const result = topoFeature(topology as Parameters<typeof topoFeature>[0], obj as Parameters<typeof topoFeature>[1]);
        const fc: FeatureCollection = "features" in result ? result : { type: "FeatureCollection", features: [result as Feature] };
        setDivisionGeoData(fc);
      })
      .catch(console.error);

    fetch("/bangladesh-districts.json")
      .then((r) => r.json())
      .then((data: { type?: string; features?: Feature[] }) => {
        const clean: FeatureCollection = { type: "FeatureCollection", features: data.features ?? [] };
        const rewound = rewind(clean, { mutate: false }) as FeatureCollection;
        setDistrictGeoData(rewound);
      })
      .catch(console.error);
  }, []);

  const incidentsByRegion = useMemo(() => {
    const map: Record<string, Incident[]> = {};
    if (!incidents) return map;
    incidents.forEach((incident) => {
      const region = viewType === "division" ? getDivisionFromField(incident.division) : getDistrictFromField(incident.district);
      if (!map[region]) map[region] = [];
      map[region].push(incident);
    });
    return map;
  }, [incidents, viewType]);

  const regionCounts = useMemo(() => Object.fromEntries(Object.entries(incidentsByRegion).map(([k, v]) => [k, v.length])), [incidentsByRegion]);

  const maxCount = Math.max(...Object.values(regionCounts), 1);
  const activeGeoData = viewType === "division" ? divisionGeoData : districtGeoData;

  const styledGeoJson = useMemo(() => buildStyledGeoJson(activeGeoData, regionCounts, maxCount, viewType, selectedRegion), [activeGeoData, regionCounts, maxCount, viewType, selectedRegion]);

  const legendLabels = useMemo(() => ["0", `1–${Math.ceil(maxCount * 0.25)}`, `${Math.ceil(maxCount * 0.25) + 1}–${Math.ceil(maxCount * 0.5)}`, `${Math.ceil(maxCount * 0.5) + 1}–${Math.ceil(maxCount * 0.75)}`, `${Math.ceil(maxCount * 0.75) + 1}+`], [maxCount]);

  const handleMapLoad = useCallback((evt: { target: MapLibreMapType }) => {
    const map = evt.target;
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      createCenterControl(MAP_CONFIG.center, MAP_CONFIG.zoom, MAP_CONFIG.flyToDuration),
      "top-right",
    );
  }, []);

  const handleRegionClick = useCallback(
    (evt: { features?: Array<{ properties?: Record<string, unknown>; geometry?: unknown }> }) => {
      const f = evt.features?.[0];
      const regionName = f?.properties?.regionName as string | undefined;
      if (!regionName) return;

      startTransition(() => {
        if (selectedRegion === regionName) {
          setSelectedRegion(null);
          mapRef.current?.flyTo({ center: MAP_CONFIG.center, zoom: MAP_CONFIG.zoom, duration: MAP_CONFIG.flyToDuration });
        } else {
          setSelectedRegion(regionName);
          let center: [number, number];
          if (viewType === "division") {
            center = DIVISION_CENTERS[regionName] ?? MAP_CONFIG.center;
          } else {
            // Fly to the center of the clicked district using its geometry
            const featureForCentroid = (f?.geometry && typeof f === "object" && "geometry" in f ? (f as Feature) : null) ?? activeGeoData?.features?.find((feat) => feat.type === "Feature" && (feat.properties?.shapeName === regionName || feat.properties?.name === regionName));
            if (featureForCentroid && featureForCentroid.type === "Feature" && featureForCentroid.geometry) {
              try {
                const point = centroid(featureForCentroid as Feature);
                center = point.geometry.coordinates as [number, number];
              } catch {
                center = MAP_CONFIG.center;
              }
            } else {
              center = MAP_CONFIG.center;
            }
          }
          const zoom = viewType === "division" ? MAP_CONFIG.zoomOnSelectDivision : MAP_CONFIG.zoomOnSelectDistrict;
          mapRef.current?.flyTo({ center, zoom, duration: MAP_CONFIG.flyToDuration });
        }
      });
    },
    [selectedRegion, viewType, activeGeoData],
  );

  const handleToggleView = useCallback((checked: boolean) => {
    startTransition(() => {
      setViewType(checked ? "district" : "division");
      setSelectedRegion(null);
      if (mapRef.current) {
        mapRef.current.flyTo({ center: MAP_CONFIG.center, zoom: MAP_CONFIG.zoom, duration: MAP_CONFIG.flyToDuration });
      }
    });
  }, []);

  const selectedRegionKey = selectedRegion ? (viewType === "district" ? getDistrictKeyForMap(selectedRegion) : selectedRegion) : null;
  const selectedIncidents = selectedRegionKey ? (incidentsByRegion[selectedRegionKey] ?? []) : [];

  const lineColor = theme === "dark" ? "#374151" : "#ffffff";
  const lineLayerThemed = useMemo(() => ({ ...lineLayer, paint: { ...lineLayer.paint, "line-color": lineColor } }), [lineColor]);

  return (
    <Card className="mb-8 overflow-hidden bg-background/50 backdrop-blur-sm border-muted">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <CardTitle className="text-xl font-semibold">{language === "bn" ? (viewType === "division" ? "বিভাগ অনুযায়ী ঘটনা" : "জেলা অনুযায়ী ঘটনা") : viewType === "division" ? "Incidents by Division" : "Incidents by District"}</CardTitle>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-full border border-muted">
            <Label htmlFor="view-mode" className="text-xs font-medium cursor-pointer">
              {language === "bn" ? "বিভাগ" : "Division"}
            </Label>
            <Switch id="view-mode" checked={viewType === "district"} onCheckedChange={handleToggleView} size="sm" />
            <Label htmlFor="view-mode" className="text-xs font-medium cursor-pointer">
              {language === "bn" ? "জেলা" : "District"}
            </Label>
          </div>

          {selectedRegion && (
            <button
              onClick={() => {
                startTransition(() => {
                  setSelectedRegion(null);
                  mapRef.current?.flyTo({
                    center: MAP_CONFIG.center,
                    zoom: MAP_CONFIG.zoom,
                    duration: MAP_CONFIG.flyToDuration,
                  });
                });
              }}
              className="text-xs text-muted-foreground hover:text-foreground border border-muted px-3 py-1 rounded-full transition-colors">
              ← {language === "bn" ? "ফিরে যান" : "Back to full map"}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 w-full aspect-square min-h-[280px] max-h-[70vh] rounded-lg overflow-hidden">
            {!styledGeoJson ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm bg-muted/30">Loading map…</div>
            ) : (
              <Map initialViewState={INITIAL_VIEW} mapStyle={BLANK_MAP_STYLE} style={{ width: "100%", height: "100%" }} maxBounds={MAP_BOUNDS} minZoom={MAP_CONFIG.minZoom} maxZoom={MAP_CONFIG.maxZoom} dragPan={false} attributionControl={false} onLoad={handleMapLoad} onClick={handleRegionClick} interactiveLayerIds={[REGIONS_FILL_LAYER_ID]} cursor="pointer">
                <Source id="regions" type="geojson" data={styledGeoJson}>
                  {/* @ts-expect-error MapLibre fill-color expression type is compatible */}
                  <Layer {...fillLayer} />
                  <Layer {...lineLayerThemed} />
                </Source>
              </Map>
            )}
          </div>

          {selectedRegion && (
            <div className="lg:w-72 w-full flex flex-col gap-2 animate-in slide-in-from-right-4 duration-300" style={{ maxHeight: 460, overflowY: "auto" }}>
              <div className="sticky top-0 pb-2 bg-background/80 backdrop-blur-sm z-10">
                <h3 className="font-semibold text-base">{selectedRegion}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedIncidents.length} {language === "bn" ? "টি ঘটনা" : selectedIncidents.length === 1 ? "incident" : "incidents"}
                </p>
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
