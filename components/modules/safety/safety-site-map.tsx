"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpDown,
  Bell,
  Camera,
  Globe,
  MapPin,
  Maximize2,
  ShieldAlert,
  Users,
  Wind,
  type LucideIcon
} from "lucide-react";
import Map, { AttributionControl, Marker, NavigationControl, type MapRef } from "react-map-gl/mapbox";

import type { SafetyMapPoint, SafetyStatusIconKey, Tone } from "@/lib/types";
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

type MapMode = keyof typeof MAP_STYLES;

interface SafetySiteMapProps {
  points: SafetyMapPoint[];
  activePoint: SafetyMapPoint;
  siteViewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onFocusPoint: (point: SafetyMapPoint) => void;
  onOpenPoint: (point: SafetyMapPoint) => void;
}

const toneMarkerClassMap: Record<Tone, string> = {
  default: "bg-gray-500",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500"
};

const toneLabelClassMap: Record<Tone, string> = {
  default: "border-gray-300 text-gray-700",
  info: "border-blue-300 text-blue-600",
  success: "border-emerald-300 text-emerald-600",
  warning: "border-amber-300 text-amber-600",
  danger: "border-rose-300 text-rose-600"
};

const toneSummaryClassMap: Record<Tone, string> = {
  default: "bg-gray-50 text-gray-700",
  info: "bg-blue-50 text-blue-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700"
};

const pointIconMap: Record<SafetyStatusIconKey, LucideIcon> = {
  camera: Camera,
  shield: ShieldAlert,
  vehicle: ArrowUpDown,
  wind: Wind,
  alert: Bell,
  user: Users,
  activity: Activity,
  globe: Globe,
  mapPin: MapPin
};

export function SafetySiteMap({ points, activePoint, siteViewport, onFocusPoint, onOpenPoint }: SafetySiteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const configuredMapModeRef = useRef<MapMode | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>("map");
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

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

  const fitPointsInView = useCallback(() => {
    const map = mapRef.current;
    if (!map || points.length === 0) {
      return;
    }

    if (points.length === 1) {
      map.easeTo({
        center: [points[0].longitude, points[0].latitude],
        zoom: Math.min(siteViewport.zoom, 17.2),
        duration: 0,
        essential: true
      });
      return;
    }

    const latitudes = points.map((point) => point.latitude);
    const longitudes = points.map((point) => point.longitude);

    map.fitBounds(
      [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)]
      ],
      {
        padding: { top: 84, right: 84, bottom: 104, left: 84 },
        duration: 0,
        essential: true,
        maxZoom: Math.min(siteViewport.zoom, 17.2)
      }
    );
  }, [points, siteViewport.zoom]);

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
    if (!token || !mapRef.current) {
      return;
    }

    mapRef.current.flyTo({
      center: [activePoint.longitude, activePoint.latitude],
      duration: 900,
      essential: true,
      zoom: Math.max(mapRef.current.getZoom(), 17.05)
    });
  }, [activePoint, token]);

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
        fitPointsInView();
      });
      return;
    }

    await containerRef.current.requestFullscreen?.();
    requestAnimationFrame(() => {
      mapRef.current?.resize();
      fitPointsInView();
    });
  }

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="absolute left-4 top-4 z-20">
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
            fitPointsInView();
          }}
        >
          <AttributionControl position="bottom-right" />
          <NavigationControl position="bottom-right" showCompass={false} />

          {points.map((point) => (
            <Marker key={point.id} longitude={point.longitude} latitude={point.latitude} anchor="bottom">
              <SafetyMarkerButton
                point={point}
                selected={activePoint.id === point.id}
                onFocusPoint={onFocusPoint}
                onOpenPoint={onOpenPoint}
              />
            </Marker>
          ))}
        </Map>
      ) : (
        <SafetySiteMapFallback
          mapMode={mapMode}
          points={points}
          activePoint={activePoint}
          onFocusPoint={onFocusPoint}
          onOpenPoint={onOpenPoint}
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
            "cursor-pointer rounded-md px-4 py-1.5 text-[10px] font-bold tracking-widest transition-[background-color,color,transform,box-shadow] duration-200 motion-safe:hover:-translate-y-px",
            mapMode === mode ? "bg-gray-900 text-white shadow" : "text-gray-500 hover:bg-gray-100"
          )}
        >
          {mode === "map" ? "MAP" : "SATELLITE"}
        </button>
      ))}
    </div>
  );
}

function SafetySiteMapFallback({
  mapMode,
  points,
  activePoint,
  onFocusPoint,
  onOpenPoint
}: {
  mapMode: MapMode;
  points: SafetyMapPoint[];
  activePoint: SafetyMapPoint;
  onFocusPoint: (point: SafetyMapPoint) => void;
  onOpenPoint: (point: SafetyMapPoint) => void;
}) {
  const isSatellite = mapMode === "satellite";

  return (
    <div className={cn("relative h-full w-full", isSatellite ? "bg-slate-900" : "bg-[#E5E3DF]")}>
      <div
        className={cn("pointer-events-none absolute inset-0", isSatellite ? "opacity-85" : "opacity-45")}
        style={{
          backgroundImage: isSatellite
            ? "radial-gradient(circle at 18% 22%, rgba(16,185,129,0.22), transparent 24%), radial-gradient(circle at 82% 20%, rgba(59,130,246,0.22), transparent 24%), radial-gradient(circle at 48% 76%, rgba(245,158,11,0.2), transparent 28%)"
            : "radial-gradient(#94A3B8 1px, transparent 1px)",
          backgroundSize: isSatellite ? "100% 100%" : "40px 40px"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isSatellite
            ? "linear-gradient(180deg, rgba(15,23,42,0.08), rgba(2,6,23,0.58))"
            : "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.52))"
        }}
      />
      <div className="pointer-events-none absolute inset-[12%] rounded-[36px] border border-white/55 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
      <div className="pointer-events-none absolute left-[10%] right-[12%] top-[48%] h-px bg-white/65" />
      <div className="pointer-events-none absolute bottom-[18%] left-[44%] top-[18%] w-px bg-white/55" />

      {points.map((point) => (
        <div
          key={point.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: point.mapTopPercent, left: point.mapLeftPercent }}
        >
          <SafetyMarkerButton
            point={point}
            selected={activePoint.id === point.id}
            onFocusPoint={onFocusPoint}
            onOpenPoint={onOpenPoint}
          />
        </div>
      ))}

      <div className={cn("absolute bottom-4 left-4 z-10 max-w-[260px] rounded-xl border px-4 py-3 shadow-lg", toneSummaryClassMap[activePoint.tone])}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Selected Node</p>
        <p className="mt-1 text-sm font-bold">{activePoint.label}</p>
        <p className="mt-1 text-xs leading-relaxed opacity-80">{activePoint.detailLabel}</p>
      </div>
    </div>
  );
}

function SafetyMarkerButton({
  point,
  selected,
  onFocusPoint,
  onOpenPoint
}: {
  point: SafetyMapPoint;
  selected: boolean;
  onFocusPoint: (point: SafetyMapPoint) => void;
  onOpenPoint: (point: SafetyMapPoint) => void;
}) {
  const Icon = pointIconMap[point.icon];

  return (
    <button
      type="button"
      onMouseEnter={() => onFocusPoint(point)}
      onFocus={() => onFocusPoint(point)}
      onClick={(event) => {
        event.stopPropagation();
        onOpenPoint(point);
      }}
      className="group flex cursor-pointer flex-col items-center transition-transform duration-200 hover:scale-105 motion-safe:hover:-translate-y-0.5"
    >
      <div
        className={cn(
          "mb-1 rounded border bg-white px-2.5 py-1 text-[10px] font-bold shadow-xl transition-opacity",
          toneLabelClassMap[point.tone],
          selected ? "opacity-100 ring-2 ring-blue-500" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        )}
      >
        {point.label}
      </div>
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white shadow-lg", toneMarkerClassMap[point.tone])}>
        <Icon className="h-3.5 w-3.5 text-white" />
      </div>
    </button>
  );
}

function applyMapStyleConfig(map: MapRef, mapMode: MapMode) {
  const config = MAP_STYLE_CONFIGS[mapMode];

  for (const [key, value] of Object.entries(config)) {
    try {
      map.setConfigProperty("basemap", key, value);
    } catch {
      // Ignore config keys unsupported by the active basemap.
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
