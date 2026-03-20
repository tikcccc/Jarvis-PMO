"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Maximize2 } from "lucide-react";
import Map, { AttributionControl, Marker, NavigationControl, type MapRef } from "react-map-gl/mapbox";

import type { ProjectRecord, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const HONG_KONG_VIEW = {
  latitude: 22.3193,
  longitude: 114.1694,
  zoom: 10.4
};

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

const FALLBACK_PADDING = 14;

type MapMode = keyof typeof MAP_STYLES;
export type MarkerToneMode = "status" | "land" | "planning";
export interface PortfolioMapOverlayContext {
  containerSize: { width: number; height: number };
  isFullscreen: boolean;
  selectedProject: ProjectRecord;
  selectedProjectScreenPosition: { x: number; y: number } | null;
}

interface PortfolioMapProps {
  projects: ProjectRecord[];
  selectedProject: ProjectRecord;
  onSelectProject: (project: ProjectRecord) => void;
  markerToneMode?: MarkerToneMode;
  showFallbackBanner?: boolean;
  overlay?: ReactNode | ((context: PortfolioMapOverlayContext) => ReactNode);
}

interface NormalizedProjectRecord extends ProjectRecord {
  left: number;
  top: number;
}

export function PortfolioMap({
  projects,
  selectedProject,
  onSelectProject,
  markerToneMode = "status",
  showFallbackBanner = true,
  overlay
}: PortfolioMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const configuredMapModeRef = useRef<MapMode | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapMode, setMapMode] = useState<MapMode>("map");
  const [selectedProjectScreenPosition, setSelectedProjectScreenPosition] = useState<{ x: number; y: number } | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const normalizedProjects = useMemo(() => normalizeProjects(projects), [projects]);
  const normalizedSelectedProject = useMemo(
    () => normalizedProjects.find((project) => project.id === selectedProject.id) ?? null,
    [normalizedProjects, selectedProject.id]
  );

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

  const updateSelectedProjectScreenPosition = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const nextContainerSize = {
      width: container.clientWidth,
      height: container.clientHeight
    };

    setContainerSize((currentSize) =>
      currentSize.width === nextContainerSize.width && currentSize.height === nextContainerSize.height ? currentSize : nextContainerSize
    );

    if (token && mapRef.current) {
      const point = mapRef.current.project([selectedProject.longitude, selectedProject.latitude]);
      setSelectedProjectScreenPosition({ x: point.x, y: point.y });
      return;
    }

    if (normalizedSelectedProject) {
      setSelectedProjectScreenPosition({
        x: (normalizedSelectedProject.left / 100) * nextContainerSize.width,
        y: (normalizedSelectedProject.top / 100) * nextContainerSize.height
      });
      return;
    }

    setSelectedProjectScreenPosition(null);
  }, [normalizedSelectedProject, selectedProject.latitude, selectedProject.longitude, token]);

  useEffect(() => {
    if (!token || !mapRef.current) {
      return;
    }

    mapRef.current.flyTo({
      center: [selectedProject.longitude, selectedProject.latitude],
      duration: 900,
      essential: true,
      zoom: Math.max(mapRef.current.getZoom(), 11)
    });
  }, [selectedProject, token]);

  useEffect(() => {
    updateSelectedProjectScreenPosition();
  }, [selectedProject, updateSelectedProjectScreenPosition]);

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
      updateSelectedProjectScreenPosition();

      return;
    }

    const resizeMap = () => {
      mapRef.current?.resize();
      updateSelectedProjectScreenPosition();
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
  }, [token, updateSelectedProjectScreenPosition]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const syncFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
      requestAnimationFrame(() => {
        mapRef.current?.resize();
        updateSelectedProjectScreenPosition();
      });
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
    };
  }, [updateSelectedProjectScreenPosition]);

  async function handleToggleFullscreen() {
    if (!containerRef.current || typeof document === "undefined") {
      return;
    }

    if (document.fullscreenElement === containerRef.current) {
      await document.exitFullscreen();
      requestAnimationFrame(() => {
        mapRef.current?.resize();
        updateSelectedProjectScreenPosition();
      });
      return;
    }

    await containerRef.current.requestFullscreen?.();
    requestAnimationFrame(() => {
      mapRef.current?.resize();
      updateSelectedProjectScreenPosition();
    });
  }

  const resolvedOverlay =
    typeof overlay === "function"
      ? overlay({
          containerSize,
          isFullscreen,
          selectedProject,
          selectedProjectScreenPosition
        })
      : overlay;

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden rounded-xl">
      <div className="absolute top-4 left-4 z-20">
        <MapModeToggle mapMode={mapMode} onChange={setMapMode} />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={handleToggleFullscreen}
          className="p-1.5 bg-white/90 backdrop-blur shadow-sm border border-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Toggle fullscreen map"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {token ? (
        <Map
          ref={mapRef}
          initialViewState={HONG_KONG_VIEW}
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
            updateSelectedProjectScreenPosition();
          }}
          onLoad={() => {
            mapRef.current?.resize();
            syncMapRuntime();
            updateSelectedProjectScreenPosition();
          }}
          onMove={() => {
            updateSelectedProjectScreenPosition();
          }}
        >
          <AttributionControl position="bottom-right" />
          <NavigationControl position="bottom-right" showCompass={false} />

          {projects.map((project) => (
            <Marker key={project.id} longitude={project.longitude} latitude={project.latitude} anchor="bottom">
              <ProjectMarkerButton
                project={project}
                selected={selectedProject.id === project.id}
                markerToneMode={markerToneMode}
                onSelectProject={onSelectProject}
              />
            </Marker>
          ))}
        </Map>
      ) : (
        <PortfolioMapFallback
          mapMode={mapMode}
          projects={normalizedProjects}
          selectedProject={selectedProject}
          markerToneMode={markerToneMode}
          onSelectProject={onSelectProject}
        />
      )}

      {!token && showFallbackBanner ? (
        <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-amber-200 bg-white/95 p-4 shadow-lg shadow-amber-100/60 backdrop-blur">
          <p className="text-xs font-bold text-gray-900">Mapbox token required for live map tiles</p>
          <p className="jarvis-text-10 mt-1 text-gray-500">
            Set <code className="font-mono text-gray-700">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> in{" "}
            <code className="font-mono text-gray-700">.env.local</code>. The current view is a safe preview fallback.
          </p>
        </div>
      ) : null}

      {resolvedOverlay}
    </div>
  );
}

function MapModeToggle({ mapMode, onChange }: { mapMode: MapMode; onChange: (mode: MapMode) => void }) {
  return (
    <div className="bg-white/90 backdrop-blur shadow-sm border border-gray-100 p-1 rounded-lg flex space-x-1">
      {(["map", "satellite"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          aria-pressed={mapMode === mode}
          className={cn(
            "jarvis-text-10 px-3 py-1 font-bold rounded-md transition-colors",
            mapMode === mode ? "bg-gray-900 text-white shadow" : "text-gray-400 hover:bg-gray-50"
          )}
        >
          {mode === "map" ? "MAP" : "SATELLITE"}
        </button>
      ))}
    </div>
  );
}

function PortfolioMapFallback({
  mapMode,
  projects,
  selectedProject,
  markerToneMode,
  onSelectProject
}: {
  mapMode: MapMode;
  projects: NormalizedProjectRecord[];
  selectedProject: ProjectRecord;
  markerToneMode: MarkerToneMode;
  onSelectProject: (project: ProjectRecord) => void;
}) {
  const isSatellite = mapMode === "satellite";

  return (
    <div className={cn("relative h-full w-full", isSatellite ? "bg-slate-900" : "bg-[#E5E3DF]")}>
      <div
        className={cn("absolute inset-0 pointer-events-none", isSatellite ? "opacity-80" : "opacity-40")}
        style={{
          backgroundImage: isSatellite
            ? "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.22), transparent 28%), radial-gradient(circle at 80% 18%, rgba(59,130,246,0.24), transparent 24%), radial-gradient(circle at 50% 80%, rgba(14,116,144,0.28), transparent 28%)"
            : "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: isSatellite ? "100% 100%" : "40px 40px"
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isSatellite
            ? "linear-gradient(180deg, rgba(15,23,42,0.08), rgba(2,6,23,0.55))"
            : "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.42))"
        }}
      />

      {projects.map((project) => (
        <div
          key={project.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: `${project.top}%`, left: `${project.left}%` }}
        >
          <ProjectMarkerButton
            project={project}
            selected={selectedProject.id === project.id}
            markerToneMode={markerToneMode}
            onSelectProject={onSelectProject}
          />
        </div>
      ))}

      <div
        className={cn(
          "jarvis-text-10 absolute bottom-4 right-4 rounded px-2 py-1 font-bold",
          isSatellite ? "bg-black/40 text-white/75" : "bg-white/60 text-gray-500"
        )}
      >
        Preview fallback
      </div>
    </div>
  );
}

function ProjectMarkerButton({
  project,
  selected,
  markerToneMode,
  onSelectProject
}: {
  project: ProjectRecord;
  selected: boolean;
  markerToneMode: MarkerToneMode;
  onSelectProject: (project: ProjectRecord) => void;
}) {
  const markerTone = resolveProjectTone(project, markerToneMode);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelectProject(project);
      }}
      className="flex flex-col items-center transition-transform hover:scale-110"
    >
      <div
        className={cn(
          "jarvis-text-10 px-2 py-1 rounded bg-white shadow-xl border border-gray-100 font-bold mb-1 text-gray-700",
          selected ? "ring-2 ring-blue-500 text-blue-600" : ""
        )}
      >
        {project.name}
      </div>
      <div
        className={cn(
          "w-6 h-6 rounded-full border-4 border-white shadow-lg flex items-center justify-center",
          markerTone === "success"
            ? "bg-emerald-500"
            : markerTone === "warning"
              ? "bg-amber-500"
              : "bg-rose-500"
        )}
      >
        <MapPin className="w-3 h-3 text-white" />
      </div>
    </button>
  );
}

function normalizeProjects(projects: ProjectRecord[]): NormalizedProjectRecord[] {
  if (projects.length === 0) {
    return [];
  }

  if (projects.length === 1) {
    return projects.map((project) => ({ ...project, left: 50, top: 50 }));
  }

  const latitudes = projects.map((project) => project.latitude);
  const longitudes = projects.map((project) => project.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  return projects.map((project) => ({
    ...project,
    left: scaleValue(project.longitude, minLongitude, maxLongitude, FALLBACK_PADDING, 100 - FALLBACK_PADDING),
    top: scaleValue(project.latitude, maxLatitude, minLatitude, FALLBACK_PADDING, 100 - FALLBACK_PADDING)
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

function resolveProjectTone(project: ProjectRecord, markerToneMode: MarkerToneMode): Tone {
  if (markerToneMode === "land") {
    const landStatus = project.landStatus.toLowerCase();

    if (landStatus.includes("clear")) {
      return "success";
    }

    if (landStatus.includes("contest")) {
      return "danger";
    }

    return "warning";
  }

  if (markerToneMode === "planning") {
    const approvalPercent = Number.parseFloat(project.approvalLabel);

    if (Number.isNaN(approvalPercent)) {
      return project.tone;
    }

    if (approvalPercent >= 80) {
      return "success";
    }

    if (approvalPercent >= 40) {
      return "warning";
    }

    return "danger";
  }

  return project.tone;
}
