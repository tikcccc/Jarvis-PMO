"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
  FileCheck,
  Map,
  MapPin,
  Maximize2,
  Scan
} from "lucide-react";

import { ProgressSiteMap } from "@/components/modules/progress/progress-site-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import { moduleMetaById } from "@/lib/mock-data/modules";
import { progressSiteViewport, progressSummaryMetrics, progressZones } from "@/lib/mock-data/progress";
import type { ProgressZone, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const EAGLE_EYE_IMAGE = "/image/eagle%20eye/eagle%20eye.png";

const toneSurfaceClassMap: Record<Tone, string> = {
  default: "bg-gray-50 text-gray-500",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

const toneBorderClassMap: Record<Tone, string> = {
  default: "border-l-gray-300",
  info: "border-l-blue-500",
  success: "border-l-emerald-500",
  warning: "border-l-amber-500",
  danger: "border-l-rose-500"
};

const toneTextClassMap: Record<Tone, string> = {
  default: "text-gray-600",
  info: "text-blue-600",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600"
};

const toneBarClassMap: Record<Tone, string> = {
  default: "bg-gray-400",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  danger: "bg-rose-500"
};

const emphasisPillClassMap: Record<Tone, string> = {
  default: "border-white/15 bg-white/8 text-white/80",
  info: "border-blue-400/25 bg-blue-500/12 text-blue-100",
  success: "border-emerald-400/25 bg-emerald-500/12 text-emerald-100",
  warning: "border-amber-300/25 bg-amber-500/12 text-amber-100",
  danger: "border-rose-400/30 bg-rose-500/15 text-rose-100"
};

const impactToneLabelMap: Record<Tone, string> = {
  default: "Protected",
  info: "Protected",
  success: "Protected",
  warning: "Recovery Watch",
  danger: "Critical Path"
};

export function ProgressPage() {
  const moduleConfig = moduleMetaById.progress;
  const [activeZoneId, setActiveZoneId] = useState(progressZones[2]?.id ?? progressZones[0]?.id ?? "");
  const [detailZoneId, setDetailZoneId] = useState<string | null>(null);

  const activeZone = useMemo(
    () => progressZones.find((zone) => zone.id === activeZoneId) ?? progressZones[0],
    [activeZoneId]
  );
  const detailZone = useMemo(
    () => progressZones.find((zone) => zone.id === detailZoneId) ?? null,
    [detailZoneId]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{moduleConfig.title}</h2>
          <p className="jarvis-page-copy mt-1">{moduleConfig.desc} Integration</p>
        </div>
        {!detailZone ? (
          <div className="flex space-x-2">
            <Button variant="secondary" size="md">
              P6 Sync
            </Button>
            <Button variant="primary" size="md">
              <Scan className="h-3.5 w-3.5" />
              Run AI Scan
            </Button>
          </div>
        ) : null}
      </div>

      {!detailZone ? (
        <ProgressOverviewView
          activeZone={activeZone}
          onFocusZone={(zone) => setActiveZoneId(zone.id)}
          onOpenZone={(zone) => {
            setActiveZoneId(zone.id);
            setDetailZoneId(zone.id);
          }}
        />
      ) : (
        <ProgressDetailView
          key={detailZone.id}
          zone={detailZone}
          onBack={() => {
            setDetailZoneId(null);
            setActiveZoneId(detailZone.id);
          }}
        />
      )}
    </div>
  );
}

function ProgressOverviewView({
  activeZone,
  onFocusZone,
  onOpenZone
}: {
  activeZone: ProgressZone;
  onFocusZone: (zone: ProgressZone) => void;
  onOpenZone: (zone: ProgressZone) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {progressSummaryMetrics.map((metric) => {
          const Icon = getIcon(metric.icon);

          return (
            <Card
              key={metric.id}
              className={cn(
                "group cursor-default border-l-4 p-4 flex items-center justify-between gap-4",
                toneBorderClassMap[metric.tone]
              )}
            >
              <div>
                <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">{metric.label}</p>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-2xl font-black text-gray-900">{metric.value}</p>
                </div>
                <p className={cn("jarvis-text-10 mt-1 font-bold uppercase", toneTextClassMap[metric.tone])}>{metric.detail}</p>
              </div>
              <div className={cn("rounded-lg p-3 transition-transform group-hover:scale-110", toneSurfaceClassMap[metric.tone])}>
                <Icon className="h-5 w-5" />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="relative flex h-[560px] flex-col overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center space-x-3">
              <Map className="h-5 w-5 text-gray-400" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-gray-900">GIS / BIM Site Map</h3>
                <p className="jarvis-text-10 font-medium text-gray-500">Eagle Eye camera deployment network</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {[
                { label: "Normal", tone: "success" as const },
                { label: "Lagging", tone: "warning" as const },
                { label: "Severe Lag", tone: "danger" as const }
              ].map((item) => (
                <span key={item.label} className="jarvis-text-10 flex items-center font-bold text-gray-500">
                  <span className={cn("mr-1.5 h-2 w-2 rounded-full", toneBarClassMap[item.tone])} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex-1">
            <ProgressSiteMap
              zones={progressZones}
              activeZone={activeZone}
              siteViewport={progressSiteViewport}
              onFocusZone={onFocusZone}
              onOpenZone={onOpenZone}
            />
          </div>
        </Card>

        <Card className="flex h-[560px] flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-4">
            <h3 className="text-sm font-bold uppercase text-gray-900">Monitored Zones</h3>
            <Badge tone="info">3 Active</Badge>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 no-scrollbar">
            {progressZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onMouseEnter={() => onFocusZone(zone)}
                onFocus={() => onFocusZone(zone)}
                onClick={() => onOpenZone(zone)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-[border-color,box-shadow,background-color] duration-200 cursor-pointer",
                  zone.id === activeZone.id ? "border-blue-300 bg-blue-50/30 shadow-md" : "border-gray-100 hover:border-blue-300 hover:shadow-md"
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{zone.name}</h4>
                    <p className="jarvis-text-10 mt-0.5 text-gray-400">Eagle Eye + Progress Agent active</p>
                  </div>
                  <Badge tone={zone.tone}>{zone.statusLabel}</Badge>
                </div>

                <div className="flex items-center space-x-3">
                  <ProgressBar value={zone.progressPercent} barClassName={toneBarClassMap[zone.tone]} />
                  <span className="jarvis-text-11 font-bold text-gray-700">{zone.progressPercent}%</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="jarvis-text-10 font-bold uppercase text-gray-400">{zone.varianceLabel}</span>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProgressDetailView({ zone, onBack }: { zone: ProgressZone; onBack: () => void }) {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(zone.activeSnapshotId);

  const activeSnapshotIndex = zone.snapshots.findIndex((snapshot) => snapshot.id === zone.activeSnapshotId);
  const selectedSnapshot = zone.snapshots.find((snapshot) => snapshot.id === selectedSnapshotId) ?? zone.snapshots[activeSnapshotIndex];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-xs font-bold text-gray-500 transition-colors hover:text-blue-600"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Site Overview
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex h-[700px] flex-col overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center space-x-3">
              <Scan className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-gray-900">Eagle Eye 360° Panorama</h3>
                <p className="jarvis-text-10 font-medium text-gray-500">
                  Camera ID: {zone.cameraId} | {zone.cameraLocationLabel} | Reviewing {selectedSnapshot.stageLabel}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="xs">
                <Download className="h-3 w-3" />
                Export Evidence
              </Button>
              <div className="h-4 w-px bg-gray-200" />
              <IconButton variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100">
                <Maximize2 className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden bg-slate-950">
            <Image
              src={EAGLE_EYE_IMAGE}
              alt="Eagle Eye panorama capture"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain object-center"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/45 px-3 py-2 text-white backdrop-blur-md">
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-white/45">Selected Capture</p>
              <p className="text-xs font-bold">{selectedSnapshot.stageLabel}</p>
              <p className="jarvis-text-10 mt-1 text-white/60">{selectedSnapshot.timestampLabel}</p>
            </div>
          </div>

          <div className="flex flex-col border-t border-gray-100 bg-white px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-gray-400" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Automated Capture Timeline</h4>
                <Badge tone="info">Select Snapshot</Badge>
              </div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">
                Latest capture: <span className="text-gray-900">{zone.snapshots[activeSnapshotIndex]?.captureLabel}</span>
              </p>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-[160px] shrink-0 rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-sm font-black text-gray-900">{selectedSnapshot.captureLabel}</span>
                </div>
                <p className="jarvis-text-10 mt-2 text-gray-400">{selectedSnapshot.timestampLabel}</p>
              </div>

              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Scheduled discrete snapshots</p>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="jarvis-text-10 font-bold uppercase tracking-widest">Choose date</span>
                  </div>
                </div>

                <div className="relative h-16">
                  <div className="absolute inset-x-0 top-4 h-1 rounded-full bg-gray-200" />
                  <div
                    className="absolute left-0 top-4 h-1 rounded-full bg-blue-500"
                    style={{
                      width:
                        zone.snapshots.length > 1
                          ? `${(activeSnapshotIndex / (zone.snapshots.length - 1)) * 100}%`
                          : "0%"
                    }}
                  />

                  {zone.snapshots.map((snapshot, index) => {
                    const left = zone.snapshots.length > 1 ? `${(index / (zone.snapshots.length - 1)) * 100}%` : "0%";
                    const isSelected = snapshot.id === selectedSnapshot.id;
                    const isCurrent = snapshot.id === zone.activeSnapshotId;
                    const isFuture = index > activeSnapshotIndex;

                    return (
                      <button
                        key={snapshot.id}
                        type="button"
                        onClick={() => setSelectedSnapshotId(snapshot.id)}
                        className="absolute top-0 -translate-x-1/2 text-center disabled:cursor-default"
                        style={{ left }}
                      >
                        <span className={cn("jarvis-text-10 block font-bold uppercase tracking-widest", isFuture ? "text-gray-300" : "text-gray-500")}>
                          {snapshot.captureLabel}
                        </span>
                        <span
                          className={cn(
                            "mx-auto mt-1 flex h-3.5 w-3.5 rounded-full border-2 shadow-sm",
                            snapshot.tone === "danger"
                              ? "border-white bg-rose-500"
                              : isCurrent
                                ? "border-white bg-blue-600"
                                : isFuture
                                  ? "border-gray-200 bg-gray-100"
                                  : "border-gray-300 bg-white",
                            isSelected ? "ring-4 ring-blue-100" : ""
                          )}
                        />
                        <span className={cn("jarvis-text-10 mt-1.5 block font-bold", isFuture ? "text-gray-300" : "text-gray-500")}>
                          {formatSnapshotTime(snapshot.timestampLabel)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">{selectedSnapshot.weatherLabel}</span>
                    <span className="jarvis-text-10 inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 font-bold tracking-wide text-gray-500 shadow-sm">
                      <MapPin className="h-3 w-3 text-blue-500" />
                      GPS {selectedSnapshot.gpsLabel}
                    </span>
                  </div>
                  <p className="jarvis-copy-xs mt-2 text-gray-500">{selectedSnapshot.noteLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="self-start space-y-6">
          <Card className="border-t-4 border-t-blue-500 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">AI Trade Quantities</h3>
                <p className="jarvis-text-10 mt-0.5 text-gray-400">Plan vs actual spatial verification</p>
              </div>
              <Badge tone={zone.tone}>{zone.varianceLabel}</Badge>
            </div>

            <div className="space-y-6">
              {zone.tradeQuantities.map((trade) => (
                <div key={trade.id} className="group">
                  <div className="mb-1 flex items-end justify-between">
                    <span className="flex items-center text-xs font-bold text-gray-800">
                      {trade.tone === "danger" ? <AlertCircle className="mr-1 h-3 w-3 text-rose-500" /> : null}
                      {trade.trade}
                    </span>
                    <span className={cn("jarvis-text-10 font-black", toneTextClassMap[trade.tone])}>{trade.actualPercent}%</span>
                  </div>

                  <div className="relative pt-1">
                    <div className="absolute bottom-0 top-0 z-10 border-r-2 border-gray-900" style={{ left: `${trade.plannedPercent}%` }}>
                      <span className="absolute -top-3 -translate-x-1/2 text-[8px] font-bold text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
                        Plan: {trade.plannedPercent}%
                      </span>
                    </div>
                    <ProgressBar value={trade.actualPercent} barClassName={toneBarClassMap[trade.tone]} />
                  </div>

                  <div className="mt-1.5 flex justify-between">
                    <p className={cn("jarvis-text-10 font-bold uppercase", trade.tone === "danger" ? "text-rose-500" : "text-gray-400")}>
                      Status: {trade.statusLabel}
                    </p>
                    <p className="jarvis-text-10 text-gray-400">Delta {Math.abs(trade.actualPercent - trade.plannedPercent)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="emphasis" className="p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="flex items-center text-xs font-bold uppercase tracking-widest text-white">
                <AlertTriangle className="mr-2 h-4 w-4 text-rose-300" />
                Delay Impact Analysis
              </h3>
              <span className={cn("jarvis-text-10 rounded-full border px-2 py-1 font-bold uppercase tracking-wider", emphasisPillClassMap[zone.tone])}>
                {impactToneLabelMap[zone.tone]}
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="jarvis-text-10 font-bold uppercase text-white/55">
                {zone.tone === "danger" ? "Identified Bottleneck" : "Current Position"}
              </p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-white/85">{zone.impactAnalysis.headline}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-white/55">{zone.impactAnalysis.summary}</p>
            </div>

            <div className="mt-4 space-y-3">
              <p className="jarvis-text-10 border-b border-white/10 pb-1 font-bold uppercase tracking-widest text-white/40">
                Downstream Impact
              </p>
              {zone.impactAnalysis.rows.map((row) => (
                <div key={row.id} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2">
                  <span className="text-xs font-medium text-white/75">{row.label}</span>
                  <span className={cn("jarvis-text-10 rounded-full border px-2 py-1 font-bold uppercase tracking-wider", emphasisPillClassMap[row.tone])}>
                    {row.valueLabel}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="secondary"
              size="md"
              className="mt-5 w-full border-white/10 bg-white text-gray-900 shadow-none hover:bg-gray-100"
            >
              <FileCheck className="h-3.5 w-3.5" />
              {zone.impactAnalysis.ctaLabel}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatSnapshotTime(timestampLabel: string) {
  const [, time = ""] = timestampLabel.split(" ");
  return time;
}
