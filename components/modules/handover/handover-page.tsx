"use client";

import { createElement, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRightLeft,
  ArrowUpRight,
  Box,
  Camera,
  CheckCircle2,
  Cpu,
  Database,
  Download,
  FileCheck,
  Filter,
  History,
  Key,
  QrCode,
  ScanLine
} from "lucide-react";

import { HandoverSiteMap } from "@/components/modules/handover/handover-site-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { appIcons } from "@/lib/icons";
import { handoverAuditFeed, handoverCommandSummary, handoverSiteViewport, handoverZones } from "@/lib/mock-data/handover";
import type { HandoverDefectRecord, HandoverOverviewMetric, HandoverZone, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const EAGLE_EYE_IMAGE = "/image/eagle%20eye/eagle%20eye.png";

const toneBorderClassMap: Record<Tone, string> = {
  default: "border-l-gray-300",
  info: "border-l-blue-500",
  success: "border-l-emerald-500",
  warning: "border-l-amber-500",
  danger: "border-l-rose-500"
};

const toneSurfaceClassMap: Record<Tone, string> = {
  default: "bg-gray-100 text-gray-500",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

const toneBarClassMap: Record<Tone, string> = {
  default: "bg-gray-400",
  info: "bg-blue-600",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500"
};

const toneTextClassMap: Record<Tone, string> = {
  default: "text-gray-500",
  info: "text-blue-600",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600"
};

type HandoverVisualMode = "reality" | "bim";

export function HandoverPage() {
  const [activeZoneId, setActiveZoneId] = useState(handoverZones[0]?.id ?? "");
  const [detailZoneId, setDetailZoneId] = useState<string | null>(null);
  const [visualMode, setVisualMode] = useState<HandoverVisualMode>("reality");
  const [selectedDefectId, setSelectedDefectId] = useState<string | null>(handoverZones[0]?.defects[0]?.id ?? null);

  const activeZone = useMemo(
    () => handoverZones.find((zone) => zone.id === activeZoneId) ?? handoverZones[0],
    [activeZoneId]
  );
  const detailZone = useMemo(
    () => handoverZones.find((zone) => zone.id === detailZoneId) ?? null,
    [detailZoneId]
  );

  const handleOpenZone = (zone: HandoverZone) => {
    setActiveZoneId(zone.id);
    setDetailZoneId(zone.id);
    setVisualMode("reality");
    setSelectedDefectId(zone.defects[0]?.id ?? null);
  };

  const handleFocusZone = (zone: HandoverZone) => {
    setActiveZoneId(zone.id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {detailZone ? (
        <HandoverDetailView
          zone={detailZone}
          visualMode={visualMode}
          selectedDefectId={selectedDefectId}
          onBack={() => {
            setDetailZoneId(null);
            setActiveZoneId(detailZone.id);
            setVisualMode("reality");
          }}
          onSelectDefect={setSelectedDefectId}
          onVisualModeChange={setVisualMode}
        />
      ) : (
        <>
          <HandoverCommandCard />
          <HandoverOverviewMetricRow />
          <HandoverOverviewView activeZone={activeZone} onFocusZone={handleFocusZone} onOpenZone={handleOpenZone} />
        </>
      )}
    </div>
  );
}

function HandoverCommandCard() {
  return (
    <Card className="relative overflow-hidden border-t-4 border-t-blue-600 p-6 shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[340px] bg-gradient-to-l from-blue-50/80 via-blue-50/20 to-transparent" />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
            <Key className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase leading-none tracking-tight text-gray-900">Handover Master Command</h2>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Zero-Defect Digital Twin Delivery Engine
            </p>
            <div className="mt-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
              <span className="jarvis-text-10 font-bold uppercase tracking-widest text-blue-700">
                {handoverCommandSummary.waveLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/90 px-6 py-5">
            <p className="text-[10px] font-black uppercase text-gray-400">Portfolio Sync Status</p>
            <div className="mt-3 flex items-center gap-5">
              <span className="text-3xl font-black text-gray-900">{handoverCommandSummary.portfolioStatusPercent}%</span>
              <div className="w-44">
                <ProgressBar
                  value={handoverCommandSummary.portfolioStatusPercent}
                  className="h-3.5 bg-gray-200 shadow-inner"
                  barClassName="bg-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-center shadow-sm">
            <p className="text-[10px] font-black uppercase leading-none text-emerald-600">Verified Assets</p>
            <p className="mt-1 text-2xl font-black text-gray-900">{handoverCommandSummary.verifiedAssetsLabel}</p>
            <p className="jarvis-text-10 mt-1 text-gray-400">{handoverCommandSummary.verifiedAssetsDetail}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function HandoverOverviewMetricRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {handoverCommandSummary.overviewMetrics.map((metric) => (
        <OverviewMetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}

function OverviewMetricCard({ metric }: { metric: HandoverOverviewMetric }) {
  return (
    <Card
      variant="surface"
      className={cn("border-l-4 p-5 shadow-sm", toneBorderClassMap[metric.tone])}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{metric.label}</p>
          <div className="mt-3 flex items-center gap-2">
            <p className="text-2xl font-black text-gray-900">{metric.valueLabel}</p>
            {metric.badgeLabel ? <Badge tone={metric.tone}>{metric.badgeLabel}</Badge> : null}
          </div>
          {metric.detailLabel ? (
            <p className={cn("mt-2 text-[10px] font-bold uppercase tracking-wide", toneTextClassMap[metric.tone])}>{metric.detailLabel}</p>
          ) : null}
        </div>

        <div className={cn("rounded-xl p-2.5", toneSurfaceClassMap[metric.tone])}>
          {createElement(appIcons[metric.icon], { className: "h-4 w-4" })}
        </div>
      </div>

      {metric.progressPercent !== undefined ? (
        <div className="mt-4">
          <ProgressBar value={metric.progressPercent} className="h-1.5 bg-gray-100" barClassName={toneBarClassMap[metric.tone]} />
        </div>
      ) : null}
    </Card>
  );
}

function HandoverOverviewView({
  activeZone,
  onFocusZone,
  onOpenZone
}: {
  activeZone: HandoverZone;
  onFocusZone: (zone: HandoverZone) => void;
  onOpenZone: (zone: HandoverZone) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.95fr)]">
      <Card className="relative h-[620px] overflow-hidden border-0 shadow-2xl">
        <HandoverSiteMap
          zones={handoverZones}
          activeZone={activeZone}
          siteViewport={handoverSiteViewport}
          onFocusZone={onFocusZone}
          onOpenZone={onOpenZone}
        />

        <div className="pointer-events-none absolute left-8 top-6 z-20 space-y-1">
          <Badge tone="info">GIS Spatial Hub</Badge>
          <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-lg">Portfolio Handover Scoping</h3>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-8 z-20 flex items-center gap-6 rounded-2xl border border-white/60 bg-white/85 p-3 shadow-xl backdrop-blur-md">
          <LegendChip tone="info" label="In Progress" />
          <LegendChip tone="warning" label="Snagging" />
          <LegendChip tone="success" label="Verified" />
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="min-h-[420px] overflow-hidden border-0 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 px-6 py-5">
            <h3 className="text-xs font-black uppercase tracking-[0.1em] text-gray-900">Digital Twin Assets</h3>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-4 p-4">
            {handoverZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onMouseEnter={() => onFocusZone(zone)}
                onFocus={() => onFocusZone(zone)}
                onClick={() => onOpenZone(zone)}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-[border-color,box-shadow,background-color,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                  zone.id === activeZone.id ? "border-blue-200 bg-blue-50/40 shadow-md" : "border-gray-100 bg-white hover:border-blue-300"
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase text-gray-900">{zone.label}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">Scan: {zone.lastScanLabel}</p>
                  </div>
                  <Badge tone={zone.tone}>{zone.progressPercent}%</Badge>
                </div>

                <ProgressBar value={zone.progressPercent} barClassName={toneBarClassMap[zone.tone]} />

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className={cn("jarvis-text-10 font-bold uppercase tracking-widest", toneTextClassMap[zone.tone])}>{zone.statusLabel}</span>
                  <span className="jarvis-text-10 font-bold uppercase text-gray-500">{zone.areaLabel}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-l-4 border-l-blue-600 bg-blue-50/20 p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-lg shadow-blue-200">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-900">Audit Agent Log</span>
            </div>
            <Badge tone="info" className="animate-pulse">
              Live
            </Badge>
          </div>

          <div className="space-y-4">
            {handoverAuditFeed.map((item) => (
              <AuditFeedRow key={item.id} tone={item.tone} message={item.message} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function HandoverDetailView({
  zone,
  visualMode,
  selectedDefectId,
  onBack,
  onSelectDefect,
  onVisualModeChange
}: {
  zone: HandoverZone;
  visualMode: HandoverVisualMode;
  selectedDefectId: string | null;
  onBack: () => void;
  onSelectDefect: (defectId: string | null) => void;
  onVisualModeChange: (mode: HandoverVisualMode) => void;
}) {
  const selectedDefect = useMemo(
    () => zone.defects.find((defect) => defect.id === selectedDefectId) ?? zone.defects[0] ?? null,
    [selectedDefectId, zone.defects]
  );
  const openSnagCount = getOpenSnagCount(zone);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <Card className="border-0 bg-white/85 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 transition-all hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </button>

            <div className="hidden h-6 w-px bg-gray-200 md:block" />

            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">{zone.label}</h3>
              <p className="jarvis-text-10 mt-1 font-bold uppercase tracking-widest text-gray-400">{zone.areaLabel}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="md">
              <Download className="h-3.5 w-3.5" />
              Export Dossier
            </Button>
            <Button variant="primary" size="md">
              <FileCheck className="h-3.5 w-3.5" />
              Issue Handover Cert
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.95fr)]">
        <div className="space-y-6">
          <Card className="relative h-[520px] overflow-hidden border-0 shadow-2xl">
            <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-1.5 rounded-xl border border-gray-100 bg-white/92 p-1 shadow-sm backdrop-blur-md">
              <VisualModeButton
                label="Reality 360"
                active={visualMode === "reality"}
                icon={<Camera className="h-3.5 w-3.5" />}
                onClick={() => onVisualModeChange("reality")}
              />
              <VisualModeButton
                label="BIM Heatmap"
                active={visualMode === "bim"}
                icon={<Box className="h-3.5 w-3.5" />}
                onClick={() => onVisualModeChange("bim")}
              />
            </div>

            <div className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/85 backdrop-blur">
              {visualMode === "reality" ? "Reality 360 Live" : "BIM Heatmap Compare"}
            </div>

            <div className="absolute inset-0 bg-slate-100">
              <Image
                src={EAGLE_EYE_IMAGE}
                alt="Handover Eagle Eye split-view evidence"
                fill
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-contain object-center"
              />
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-slate-950/16 transition-opacity duration-300",
                visualMode === "reality" ? "opacity-100" : "opacity-0"
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-slate-950/16 transition-opacity duration-300",
                visualMode === "bim" ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/25 bg-white/12 px-6 py-3 text-white shadow-xl backdrop-blur-md">
              <ArrowRightLeft className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {visualMode === "reality" ? "Drag to Inspect Reality" : "Inspect BIM Heatmap Alignment"}
              </span>
            </div>
          </Card>

          <Card variant="emphasis" className="overflow-hidden border-0 shadow-2xl">
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
                <Badge tone={zone.verification.statusTone}>{zone.verification.statusLabel}</Badge>
                <h3 className="mt-4 text-xl font-black uppercase tracking-tight">{zone.verification.certificateLabel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{zone.verification.noteLabel}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-end justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Consistency Score</span>
                    <span className="text-2xl font-black text-emerald-400">{zone.verification.consistencyLabel}</span>
                  </div>
                  {zone.verification.checks.map((check) => (
                    <div key={check.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{check.label}</span>
                      <span className={cn("text-sm font-black uppercase", check.tone === "success" ? "text-emerald-400" : check.tone === "warning" ? "text-amber-300" : "text-blue-300")}>
                        {check.valueLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full border border-blue-400/20 bg-blue-500/10 p-4">
                  <ScanLine className="h-12 w-12 text-blue-400" />
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">{zone.verification.varianceLabel}</p>
                <Button variant="accent" size="md" className="mt-6">
                  {zone.verification.recordActionLabel}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="min-h-[520px] overflow-hidden border-0 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <h3 className="text-xs font-black uppercase tracking-tight text-gray-900">AI Snag Auto-Closure</h3>
                <p className="jarvis-text-10 mt-1 text-gray-400">Evidence-backed closeout loop</p>
              </div>
              <Badge tone={openSnagCount === 0 ? "success" : "danger"}>{openSnagCount} Pending</Badge>
            </div>

            <div className="space-y-4 bg-gray-50/50 p-4">
              {zone.defects.length > 0 ? (
                zone.defects.map((defect) => {
                  const isSelected = selectedDefect?.id === defect.id;

                  return (
                    <div key={defect.id} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => onSelectDefect(isSelected ? null : defect.id)}
                        className={cn(
                          "w-full rounded-2xl border bg-white p-4 text-left transition-all",
                          isSelected ? "border-blue-500 shadow-md ring-2 ring-blue-50" : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                        )}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="info">{defect.id}</Badge>
                            <Badge tone={defect.severityTone}>{defect.severityLabel}</Badge>
                          </div>
                          <Badge tone={defect.statusTone}>{defect.statusLabel}</Badge>
                        </div>

                        <p className="text-sm font-black text-gray-900">{defect.typeLabel}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">{defect.locationLabel}</p>
                        <p className="mt-3 text-[11px] leading-relaxed text-gray-500">{defect.noteLabel}</p>
                      </button>

                      {isSelected ? <DefectEvidencePanel defect={defect} /> : null}
                    </div>
                  );
                })
              ) : (
                <div className="flex h-[340px] flex-col items-center justify-center gap-3 text-gray-300">
                  <CheckCircle2 className="h-12 w-12 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest">Zero Defects Detected</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="border-0 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-gray-900">Digital Asset Manual (FM)</h3>
                <p className="text-[10px] font-bold text-gray-400">Interactive BIM records</p>
              </div>
              <QrCode className="h-5 w-5 text-gray-300" />
            </div>

            <div className="space-y-3">
              {zone.manualAssets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  className="group flex w-full items-center justify-between rounded-2xl bg-gray-50 p-4 text-left transition-all hover:bg-white hover:ring-2 hover:ring-blue-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-transform group-hover:scale-110">
                      <Database className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900">{asset.assetLabel}</p>
                      <p className="text-[10px] font-bold uppercase text-gray-400">{asset.assetTypeLabel}</p>
                      <p className="jarvis-text-10 mt-1 text-gray-500">{asset.locationLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={cn("text-[10px] font-black uppercase", toneTextClassMap[asset.statusTone])}>{asset.statusLabel}</span>
                    <ArrowUpRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-600" />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DefectEvidencePanel({ defect }: { defect: HandoverDefectRecord }) {
  return (
    <div className="rounded-2xl bg-gray-950 p-4 text-white animate-in slide-in-from-top-2">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Vision AI Verification</p>
        {defect.matchScoreLabel ? <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{defect.matchScoreLabel}</span> : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <EvidenceTile label={defect.baselineLabel} objectPosition="18% center" />
        <EvidenceTile label={defect.comparisonLabel} objectPosition="82% center" />
      </div>

      {defect.actionLabel ? (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{defect.statusLabel}</p>
          <Button variant="accent" size="sm">
            {defect.actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function EvidenceTile({ label, objectPosition }: { label: string; objectPosition: string }) {
  return (
    <div className="space-y-2">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-800">
        <Image
          src={EAGLE_EYE_IMAGE}
          alt={label}
          fill
          sizes="(min-width: 1024px) 20vw, 50vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}

function VisualModeButton({
  label,
  active,
  icon,
  onClick
}: {
  label: string;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] transition-all",
        active ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function AuditFeedRow({ tone, message }: { tone: Tone; message: string }) {
  return (
    <div className="flex items-start gap-3">
      {tone === "success" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
      ) : tone === "warning" ? (
        <Activity className="mt-0.5 h-4 w-4 text-amber-500" />
      ) : (
        <History className="mt-0.5 h-4 w-4 text-blue-500" />
      )}
      <p className="text-[11px] font-medium leading-relaxed text-gray-700">{message}</p>
    </div>
  );
}

function LegendChip({ tone, label }: { tone: Tone; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-2.5 w-2.5 rounded-full", toneBarClassMap[tone])} />
      <span className="text-[10px] font-black uppercase text-gray-700">{label}</span>
    </div>
  );
}

function getOpenSnagCount(zone: HandoverZone) {
  const activeSnagMetric = zone.kpis.find((item) => item.label === "Active Snags");
  return activeSnagMetric ? Number.parseInt(activeSnagMetric.valueLabel, 10) : zone.defects.filter((item) => item.statusTone !== "success").length;
}
