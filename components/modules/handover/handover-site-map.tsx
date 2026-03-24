"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Maximize2 } from "lucide-react";
import Map, { AttributionControl, Marker, NavigationControl, type MapRef } from "react-map-gl/mapbox";

import type { HandoverZone, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAP_STYLES = {
  map: "mapbox://styles/mapbox/standard",
  satellite: "mapbox://styles/mapbox/standard-satellite"
} as const;

const MAP_STYLE_CONFIGS = {
  map: {
    theme: "faded",
    lightPreset: "day",
    showPointOfInterestLabels: false,
    showTransitLabels: false,
    showPedestrianRoads: false,
    showPlaceLabels: true,
    showRoadLabels: true,
    show3dObjects: false,
    show3dBuildings: false,
    show3dTrees: false,
    show3dLandmarks: false,
    show3dFacades: false
  },
  satellite: {
    lightPreset: "day",
    showRoadsAndTransit: true,
    showPointOfInterestLabels: false,
    showTransitLabels: false,
    showPlaceLabels: true,
    showRoadLabels: true
  }
} as const;

const FALLBACK_PADDING = 10;

type MapMode = keyof typeof MAP_STYLES;

interface HandoverSiteMapProps {
  zones: HandoverZone[];
  activeZone: HandoverZone;
  siteViewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onFocusZone: (zone: HandoverZone) => void;
  onOpenZone: (zone: HandoverZone) => void;
}

interface NormalizedZone extends HandoverZone {
  left: number;
  top: number;
}

const toneMarkerClassMap: Record<Tone, string> = {
  default: "bg-gray-500",
  info: "bg-blue-600",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500"
};

const siteBlockStyleMap: Record<string, string> = {
  "tower-a": "left-[14%] top-[18%] h-[28%] w-[22%] -rotate-3",
  podium: "right-[13%] top-[20%] h-[24%] w-[26%] rotate-3",
  "car-park": "left-[36%] bottom-[14%] h-[28%] w-[28%] rotate-1"
};

export function HandoverSiteMap({ zones, activeZone, siteViewport, onFocusZone, onOpenZone }: HandoverSiteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const configuredMapModeRef = useRef<MapMode | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>("map");
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const normalizedZones = useMemo(() => normalizeZones(zones), [zones]);

  const syncMapRuntime = useCallback(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const nativeMap = map.getMap();
    if (!nativeMap.isStyleLoaded()) {
      return;
    }

    if (configuredMapModeRef.current === mapMode) {
      return;
    }

    applyMapStyleConfig(map, mapMode);
    stabilizeMapRuntime(map);
    configuredMapModeRef.current = mapMode;
  }, [mapMode]);

  const fitZonesInView = useCallback(() => {
    const map = mapRef.current;
    if (!map || zones.length === 0) {
      return;
    }

    if (zones.length === 1) {
      map.easeTo({
        center: [zones[0].longitude, zones[0].latitude],
        zoom: Math.min(siteViewport.zoom, 17.05),
        duration: 0,
        essential: true
      });
      return;
    }

    const latitudes = zones.map((zone) => zone.latitude);
    const longitudes = zones.map((zone) => zone.longitude);

    map.fitBounds(
      [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)]
      ],
      {
        padding: { top: 72, right: 56, bottom: 56, left: 56 },
        duration: 0,
        essential: true,
        maxZoom: Math.min(siteViewport.zoom, 17.1)
      }
    );
  }, [siteViewport.zoom, zones]);

  useEffect(() => {
    if (!token || !mapRef.current) {
      return;
    }

    mapRef.current.flyTo({
      center: [activeZone.longitude, activeZone.latitude],
      duration: 900,
      essential: true,
      zoom: Math.max(mapRef.current.getZoom(), 17.2)
    });
  }, [activeZone, token]);

  useEffect(() => {
    if (!token || !mapRef.current) {
      return;
    }

    configuredMapModeRef.current = null;

    requestAnimationFrame(() => {
      mapRef.current?.resize();
      syncMapRuntime();
    });
  }, [mapMode, syncMapRuntime, token]);

  useEffect(() => {
    if (!token || !containerRef.current) {
      return;
    }

    const resizeMap = () => {
      mapRef.current?.resize();
    };

    resizeMap();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      resizeMap();
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [token]);

  async function handleToggleFullscreen() {
    if (!containerRef.current || typeof document === "undefined") {
      return;
    }

    if (document.fullscreenElement === containerRef.current) {
      await document.exitFullscreen();
      requestAnimationFrame(() => {
        mapRef.current?.resize();
        fitZonesInView();
      });
      return;
    }

    await containerRef.current.requestFullscreen?.();
    requestAnimationFrame(() => {
      mapRef.current?.resize();
      fitZonesInView();
    });
  }

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="absolute right-14 top-4 z-20">
        <MapModeToggle mapMode={mapMode} onChange={setMapMode} />
      </div>

      <div className="absolute right-4 top-4 z-20">
        <button
          type="button"
          onClick={handleToggleFullscreen}
          className="cursor-pointer rounded-lg border border-gray-100 bg-white/90 p-1.5 text-gray-500 shadow-sm backdrop-blur transition-[background-color,color,transform] duration-200 hover:text-gray-900 motion-safe:hover:-translate-y-px"
          aria-label="Toggle fullscreen map"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {token ? (
        <Map
          ref={mapRef}
          initialViewState={siteViewport}
          mapboxAccessToken={token}
          mapStyle={MAP_STYLES[mapMode]}
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
          logoPosition="bottom-left"
          projection="mercator"
          styleDiffing={false}
          dragRotate={false}
          pitchWithRotate={false}
          touchPitch={false}
          reuseMaps
          onStyleData={() => {
            syncMapRuntime();
          }}
          onLoad={() => {
            mapRef.current?.resize();
            syncMapRuntime();
            fitZonesInView();
          }}
        >
          <AttributionControl position="bottom-right" />
          <NavigationControl position="bottom-right" showCompass={false} />

          {zones.map((zone) => (
            <Marker key={zone.id} longitude={zone.longitude} latitude={zone.latitude} anchor="bottom">
              <ZoneMarkerButton
                zone={zone}
                selected={zone.id === activeZone.id}
                onFocusZone={onFocusZone}
                onOpenZone={onOpenZone}
              />
            </Marker>
          ))}
        </Map>
      ) : (
        <HandoverSiteMapFallback
          mapMode={mapMode}
          zones={normalizedZones}
          activeZone={activeZone}
          onFocusZone={onFocusZone}
          onOpenZone={onOpenZone}
        />
      )}

      {!token ? (
        <div className="jarvis-text-10 absolute bottom-4 right-4 z-20 rounded bg-black/45 px-2 py-1 font-bold text-white/75">
          GIS preview fallback
        </div>
      ) : null}
    </div>
  );
}

function MapModeToggle({ mapMode, onChange }: { mapMode: MapMode; onChange: (mode: MapMode) => void }) {
  return (
    <div className="flex space-x-1 rounded-lg border border-gray-100 bg-white/90 p-1 shadow-sm backdrop-blur">
      {(["map", "satellite"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          aria-pressed={mapMode === mode}
          className={cn(
            "jarvis-control-label-compact cursor-pointer rounded-md px-3 py-1 transition-[background-color,color,transform,box-shadow] duration-200 motion-safe:hover:-translate-y-px",
            mapMode === mode ? "bg-gray-900 text-white shadow" : "text-gray-400 hover:bg-gray-50"
          )}
        >
          {mode === "map" ? "MAP" : "SATELLITE"}
        </button>
      ))}
    </div>
  );
}

function HandoverSiteMapFallback({
  mapMode,
  zones,
  activeZone,
  onFocusZone,
  onOpenZone
}: {
  mapMode: MapMode;
  zones: NormalizedZone[];
  activeZone: HandoverZone;
  onFocusZone: (zone: HandoverZone) => void;
  onOpenZone: (zone: HandoverZone) => void;
}) {
  const isSatellite = mapMode === "satellite";

  return (
    <div className={cn("relative h-full w-full", isSatellite ? "bg-slate-900" : "bg-[#E9E7E1]")}>
      <div
        className={cn("pointer-events-none absolute inset-0", isSatellite ? "opacity-85" : "opacity-40")}
        style={{
          backgroundImage: isSatellite
            ? "radial-gradient(circle at 22% 24%, rgba(16,185,129,0.26), transparent 26%), radial-gradient(circle at 70% 26%, rgba(59,130,246,0.24), transparent 28%), radial-gradient(circle at 48% 72%, rgba(245,158,11,0.22), transparent 24%)"
            : "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: isSatellite ? "100% 100%" : "44px 44px"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isSatellite
            ? "linear-gradient(180deg, rgba(15,23,42,0.08), rgba(2,6,23,0.58))"
            : "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.46))"
        }}
      />

      <div className="pointer-events-none absolute inset-[12%] rounded-[40px] border border-white/55 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
      <div className="pointer-events-none absolute left-[12%] right-[12%] top-[52%] h-px bg-white/65" />
      <div className="pointer-events-none absolute bottom-[16%] left-[46%] top-[16%] w-px bg-white/55" />

      {zones.map((zone) => (
        <div
          key={`${zone.id}-block`}
          className={cn(
            "pointer-events-none absolute rounded-[30px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
            siteBlockStyleMap[zone.id] ?? "left-[30%] top-[30%] h-[20%] w-[20%]",
            zone.id === activeZone.id
              ? zone.tone === "success"
                ? "border-emerald-300/75 bg-emerald-100/30"
                : zone.tone === "warning"
                  ? "border-amber-300/75 bg-amber-100/30"
                  : "border-blue-300/75 bg-blue-100/30"
              : "border-white/55 bg-white/18",
            isSatellite ? "opacity-80" : "opacity-100"
          )}
        >
          <div
            className={cn(
              "absolute left-3 top-3 jarvis-text-10 font-bold uppercase tracking-[0.18em]",
              isSatellite ? "text-white/72" : "text-gray-500"
            )}
          >
            {zone.mapLabel}
          </div>
        </div>
      ))}

      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: `${zone.top}%`, left: `${zone.left}%` }}
        >
          <ZoneMarkerButton
            zone={zone}
            selected={zone.id === activeZone.id}
            onFocusZone={onFocusZone}
            onOpenZone={onOpenZone}
          />
        </div>
      ))}
    </div>
  );
}

function ZoneMarkerButton({
  zone,
  selected,
  onFocusZone,
  onOpenZone
}: {
  zone: HandoverZone;
  selected: boolean;
  onFocusZone: (zone: HandoverZone) => void;
  onOpenZone: (zone: HandoverZone) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onFocusZone(zone)}
      onFocus={() => onFocusZone(zone)}
      onClick={(event) => {
        event.stopPropagation();
        onOpenZone(zone);
      }}
      className="group flex cursor-pointer flex-col items-center transition-transform duration-200 hover:scale-105 motion-safe:hover:-translate-y-0.5"
    >
      <div
        className={cn(
          "mb-2 w-56 rounded-xl border bg-white/95 px-4 py-3 text-left shadow-2xl backdrop-blur transition-[border-color,box-shadow,transform] duration-200",
          selected ? "border-blue-200 ring-2 ring-blue-500/25" : "border-white/70 group-hover:-translate-y-0.5"
        )}
      >
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="jarvis-text-10 font-black uppercase tracking-tight text-gray-900">{zone.label}</p>
          <span className={cn("rounded-md px-2 py-0.5 text-[9px] font-black uppercase", zone.tone === "success" ? "bg-emerald-50 text-emerald-600" : zone.tone === "warning" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600")}>
            {zone.progressPercent}%
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className={cn("h-full rounded-full", zone.tone === "success" ? "bg-emerald-500" : zone.tone === "warning" ? "bg-amber-500" : "bg-blue-600")} style={{ width: `${zone.progressPercent}%` }} />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">{zone.statusLabel}</p>
          <p className={cn("jarvis-text-10 font-bold uppercase", zone.tone === "success" ? "text-emerald-600" : zone.tone === "warning" ? "text-amber-600" : "text-blue-600")}>
            Synced
          </p>
        </div>
      </div>
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-full border-4 border-white shadow-xl", toneMarkerClassMap[zone.tone])}>
        <MapPin className="h-4 w-4 text-white" />
      </div>
    </button>
  );
}

function normalizeZones(zones: HandoverZone[]): NormalizedZone[] {
  if (zones.length === 0) {
    return [];
  }

  if (zones.length === 1) {
    return zones.map((zone) => ({ ...zone, left: 50, top: 50 }));
  }

  const latitudes = zones.map((zone) => zone.latitude);
  const longitudes = zones.map((zone) => zone.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  return zones.map((zone) => ({
    ...zone,
    left: scaleValue(zone.longitude, minLongitude, maxLongitude, FALLBACK_PADDING, 100 - FALLBACK_PADDING),
    top: scaleValue(zone.latitude, maxLatitude, minLatitude, FALLBACK_PADDING, 100 - FALLBACK_PADDING)
  }));
}

function scaleValue(value: number, min: number, max: number, start: number, end: number) {
  if (min === max) {
    return (start + end) / 2;
  }

  return start + ((value - min) / (max - min)) * (end - start);
}

function applyMapStyleConfig(map: MapRef, mapMode: MapMode) {
  const config = MAP_STYLE_CONFIGS[mapMode];

  for (const [key, value] of Object.entries(config)) {
    try {
      map.setConfigProperty("basemap", key, value);
    } catch {
      // Ignore config keys unsupported by the current imported basemap.
    }
  }
}

function stabilizeMapRuntime(map: MapRef) {
  const nativeMap = map.getMap();

  try {
    nativeMap.setProjection("mercator");
  } catch {
    // Ignore unsupported projection transitions during style initialization.
  }

  try {
    nativeMap.setTerrain(null);
  } catch {
    // Ignore style phases where terrain is not ready to be mutated yet.
  }
}
