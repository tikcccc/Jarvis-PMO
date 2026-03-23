"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Maximize2 } from "lucide-react";
import Map, { AttributionControl, Marker, NavigationControl, type MapRef } from "react-map-gl/mapbox";

import type { PaymentValuationRecord, Tone } from "@/lib/types";
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

interface PaymentSiteMapProps {
  records: PaymentValuationRecord[];
  activeRecord?: PaymentValuationRecord | null;
  siteViewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onFocusRecord: (record: PaymentValuationRecord) => void;
  onOpenRecord: (record: PaymentValuationRecord) => void;
}

const toneMarkerClassMap: Record<Tone, string> = {
  default: "bg-gray-500",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500"
};

export function PaymentSiteMap({ records, activeRecord, siteViewport, onFocusRecord, onOpenRecord }: PaymentSiteMapProps) {
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

  const fitRecordsInView = useCallback(() => {
    const map = mapRef.current;
    if (!map || records.length === 0) {
      return;
    }

    if (records.length === 1) {
      map.easeTo({
        center: [records[0].longitude, records[0].latitude],
        zoom: Math.min(siteViewport.zoom, 17.05),
        duration: 0,
        essential: true
      });
      return;
    }

    const latitudes = records.map((record) => record.latitude);
    const longitudes = records.map((record) => record.longitude);

    map.fitBounds(
      [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)]
      ],
      {
        padding: { top: 84, right: 84, bottom: 84, left: 84 },
        duration: 0,
        essential: true,
        maxZoom: Math.min(siteViewport.zoom, 17.05)
      }
    );
  }, [records, siteViewport.zoom]);

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
        fitRecordsInView();
      });
      return;
    }

    await containerRef.current.requestFullscreen?.();
    requestAnimationFrame(() => {
      mapRef.current?.resize();
      fitRecordsInView();
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
            fitRecordsInView();
          }}
        >
          <AttributionControl position="bottom-right" />
          <NavigationControl position="bottom-right" showCompass={false} />

          {records.map((record) => (
            <Marker key={record.id} longitude={record.longitude} latitude={record.latitude} anchor="bottom">
              <ValuationMarkerButton
                record={record}
                selected={activeRecord?.id === record.id}
                onFocusRecord={onFocusRecord}
                onOpenRecord={onOpenRecord}
              />
            </Marker>
          ))}
        </Map>
      ) : (
        <PaymentSiteMapFallback
          mapMode={mapMode}
          records={records}
          activeRecord={activeRecord}
          onFocusRecord={onFocusRecord}
          onOpenRecord={onOpenRecord}
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

function PaymentSiteMapFallback({
  mapMode,
  records,
  activeRecord,
  onFocusRecord,
  onOpenRecord
}: {
  mapMode: MapMode;
  records: PaymentValuationRecord[];
  activeRecord?: PaymentValuationRecord | null;
  onFocusRecord: (record: PaymentValuationRecord) => void;
  onOpenRecord: (record: PaymentValuationRecord) => void;
}) {
  const isSatellite = mapMode === "satellite";

  return (
    <div className={cn("relative h-full w-full", isSatellite ? "bg-slate-900" : "bg-[#E5E3DF]")}>
      <div
        className={cn("pointer-events-none absolute inset-0", isSatellite ? "opacity-80" : "opacity-40")}
        style={{
          backgroundImage: isSatellite
            ? "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.22), transparent 28%), radial-gradient(circle at 80% 18%, rgba(59,130,246,0.24), transparent 24%), radial-gradient(circle at 50% 80%, rgba(14,116,144,0.28), transparent 28%)"
            : "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: isSatellite ? "100% 100%" : "40px 40px"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isSatellite
            ? "linear-gradient(180deg, rgba(15,23,42,0.1), rgba(2,6,23,0.55))"
            : "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.48))"
        }}
      />
      <div className="pointer-events-none absolute inset-[12%] rounded-[36px] border border-white/55 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
      <div className="pointer-events-none absolute left-[10%] right-[12%] top-[48%] h-px bg-white/65" />
      <div className="pointer-events-none absolute bottom-[18%] left-[44%] top-[18%] w-px bg-white/55" />

      {records.map((record) => (
        <div
          key={record.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: record.mapTopPercent, left: record.mapLeftPercent }}
        >
          <ValuationMarkerButton
            record={record}
            selected={activeRecord?.id === record.id}
            onFocusRecord={onFocusRecord}
            onOpenRecord={onOpenRecord}
          />
        </div>
      ))}
    </div>
  );
}

function ValuationMarkerButton({
  record,
  selected,
  onFocusRecord,
  onOpenRecord
}: {
  record: PaymentValuationRecord;
  selected: boolean;
  onFocusRecord: (record: PaymentValuationRecord) => void;
  onOpenRecord: (record: PaymentValuationRecord) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onFocusRecord(record)}
      onFocus={() => onFocusRecord(record)}
      onClick={(event) => {
        event.stopPropagation();
        onOpenRecord(record);
      }}
      className="group flex cursor-pointer flex-col items-center transition-transform duration-200 hover:scale-105 motion-safe:hover:-translate-y-0.5"
    >
      <div
        className={cn(
          "mb-1 rounded border bg-white px-2.5 py-1 text-[10px] font-bold shadow-xl transition-opacity",
          record.statusTone === "success" ? "border-[#10B981] text-[#10B981]" : "border-[#F43F5E] text-[#F43F5E]",
          selected ? "opacity-100 ring-2 ring-blue-500" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        )}
      >
        {getCompactZoneLabel(record.zoneLabel)} ({record.aiPercent}%)
      </div>
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white shadow-lg", toneMarkerClassMap[record.statusTone])}>
        <Camera className="h-3.5 w-3.5 text-white" />
      </div>
    </button>
  );
}

function getCompactZoneLabel(zoneLabel: string) {
  return zoneLabel.replace(/\s*\(.*/, "");
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
