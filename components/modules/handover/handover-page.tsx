"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Download,
  FileCheck,
  Filter,
  History,
  Key,
  List,
  ScanLine,
  TrendingUp
} from "lucide-react";

import { HandoverSiteMap } from "@/components/modules/handover/handover-site-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import { handoverAuditFeed, handoverCommandSummary, handoverSiteViewport, handoverZones } from "@/lib/mock-data/handover";
import type { HandoverZone, Tone } from "@/lib/types";
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
  default: "bg-gray-50 text-gray-500",
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

const verificationChipClassMap: Record<Tone, string> = {
  default: "bg-gray-100 text-gray-700 border border-gray-200",
  info: "bg-blue-50 text-blue-700 border border-blue-100",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border border-amber-100",
  danger: "bg-rose-50 text-rose-700 border border-rose-100"
};

export function HandoverPage() {
  const [activeZoneId, setActiveZoneId] = useState(handoverZones[0]?.id ?? "");
  const [detailZoneId, setDetailZoneId] = useState<string | null>(null);

  const activeZone = useMemo(
    () => handoverZones.find((zone) => zone.id === activeZoneId) ?? handoverZones[0],
    [activeZoneId]
  );
  const detailZone = useMemo(
    () => handoverZones.find((zone) => zone.id === detailZoneId) ?? null,
    [detailZoneId]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <HandoverCommandCard />

      {detailZone ? (
        <>
          <HandoverDetailKpiBand zone={detailZone} />
          <HandoverDetailView
            zone={detailZone}
            onBack={() => {
              setDetailZoneId(null);
              setActiveZoneId(detailZone.id);
            }}
          />
        </>
      ) : (
        <HandoverOverviewView
          activeZone={activeZone}
          onFocusZone={(zone) => setActiveZoneId(zone.id)}
          onOpenZone={(zone) => {
            setActiveZoneId(zone.id);
            setDetailZoneId(zone.id);
          }}
        />
      )}
    </div>
  );
}

function HandoverCommandCard() {
  return (
    <Card className="relative overflow-hidden border-t-4 border-t-blue-600 p-6">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[320px] bg-gradient-to-l from-blue-50/70 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
        <div>
          <h2 className="flex items-center text-xl font-black tracking-tight text-gray-900">
            <Key className="mr-2 h-5 w-5 text-blue-600" />
            HANDOVER MASTER COMMAND (PHASE 1)
          </h2>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Zero-Defect Digital Twin Delivery Engine
          </p>
          <div className="mt-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
            <span className="jarvis-text-10 font-bold uppercase tracking-widest text-blue-700">
              {handoverCommandSummary.waveLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-10">
          <div className="text-left sm:text-right">
            <p className="text-[10px] font-black uppercase leading-none text-gray-400">Portfolio Status</p>
            <div className="mt-2 flex items-center gap-2 sm:justify-end">
              <p className="text-2xl font-black text-gray-900">{handoverCommandSummary.portfolioStatusPercent}%</p>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
          </div>

          <div className="w-full max-w-[220px]">
            <div className="h-2.5 overflow-hidden rounded-full border border-gray-50 bg-gray-100">
              <div
                className="h-full bg-blue-600 transition-all duration-1000"
                style={{ width: `${handoverCommandSummary.portfolioStatusPercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase leading-none text-emerald-600">Verified Assets</p>
            <p className="mt-1 text-xl font-black text-gray-900">{handoverCommandSummary.verifiedAssetsLabel}</p>
            <p className="jarvis-text-10 mt-1 text-gray-400">{handoverCommandSummary.verifiedAssetsDetail}</p>
          </div>
        </div>
      </div>
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="relative h-[600px] overflow-hidden border-0 shadow-2xl lg:col-span-2">
        <HandoverSiteMap
          zones={handoverZones}
          activeZone={activeZone}
          siteViewport={handoverSiteViewport}
          onFocusZone={onFocusZone}
          onOpenZone={onOpenZone}
        />

        <div className="pointer-events-none absolute left-8 top-6 z-20 space-y-1">
          <Badge tone="info">GIS SPATIAL HUB</Badge>
          <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-lg">Macro Project Scoping</h3>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-8 z-20 flex items-center space-x-6 rounded-2xl border border-white/50 bg-white/80 p-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            <span className="text-[10px] font-black uppercase text-gray-700">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-black uppercase text-gray-700">Snagging</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase text-gray-700">Verified</span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="flex flex-1 flex-col shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-50 px-6 py-5">
            <h3 className="flex items-center text-xs font-black uppercase tracking-[0.1em] text-gray-400">
              <List className="mr-2 h-4 w-4 text-blue-500" />
              Asset Verification
            </h3>
            <Filter className="h-3.5 w-3.5 text-gray-300" />
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3 no-scrollbar">
            {handoverZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onMouseEnter={() => onFocusZone(zone)}
                onFocus={() => onFocusZone(zone)}
                onClick={() => onOpenZone(zone)}
                className={cn(
                  "w-full cursor-pointer rounded-2xl border p-4 text-left transition-[border-color,box-shadow,background-color] duration-200",
                  zone.id === activeZone.id ? "border-blue-200 bg-blue-50/40 shadow-md" : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-md"
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-black uppercase text-gray-900">{zone.mapLabel}</h4>
                    <p className="mt-0.5 text-[10px] font-bold text-gray-400">SCAN: {zone.lastScanLabel}</p>
                  </div>
                  <Badge tone={zone.tone}>{zone.progressPercent}%</Badge>
                </div>

                <ProgressBar value={zone.progressPercent} barClassName={toneBarClassMap[zone.tone]} />

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="jarvis-text-10 font-bold uppercase text-gray-400">{zone.statusLabel}</span>
                  <span className="jarvis-text-10 font-bold uppercase text-gray-500">{zone.name}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-l-4 border-l-blue-600 bg-blue-50/10 p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-lg shadow-blue-200">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">Audit Agent Feed</span>
            </div>
            <Badge tone="info">Real-time</Badge>
          </div>

          <div className="space-y-3">
            {handoverAuditFeed.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                {item.tone === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-400" />
                ) : item.tone === "warning" ? (
                  <Activity className="mt-0.5 h-3.5 w-3.5 text-amber-400" />
                ) : (
                  <History className="mt-0.5 h-3.5 w-3.5 text-gray-300" />
                )}
                <p className="text-[10px] font-medium leading-relaxed text-gray-600">{item.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function HandoverDetailKpiBand({ zone }: { zone: HandoverZone }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 animate-in slide-in-from-top-4 duration-500">
      {zone.kpis.map((kpi) => {
        const Icon = getIcon(kpi.icon);

        return (
          <Card key={kpi.id} className={cn("border-l-4 p-4", toneBorderClassMap[kpi.tone])}>
            <div className="flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{kpi.label}</p>
              <div className={cn("rounded-lg p-2", toneSurfaceClassMap[kpi.tone])}>
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="mt-2 text-xl font-black text-gray-900">{kpi.valueLabel}</p>
          </Card>
        );
      })}
    </div>
  );
}

function HandoverDetailView({ zone, onBack }: { zone: HandoverZone; onBack: () => void }) {
  const openSnagCount = getOpenSnagCount(zone);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Macro GIS Map
          </button>
          <div className="h-6 w-px bg-gray-200" />
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
          <Button variant="accent" size="md">
            <FileCheck className="h-3.5 w-3.5" />
            Issue Handover Cert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="group relative h-[500px] overflow-hidden border-0 bg-slate-950 shadow-2xl lg:col-span-2">
          <Image
            src={EAGLE_EYE_IMAGE}
            alt="Eagle Eye panoramic handover capture"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-contain object-center transition-transform duration-[3000ms] group-hover:scale-[1.01]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          <div className="absolute left-6 top-6">
            <Badge tone={zone.tone === "success" ? "success" : "info"}>LIVE 360° EAGLE EYE PERCEPTION</Badge>
          </div>

          <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur">
            {zone.verification.consistencyLabel} consistency
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center space-x-4 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md">
            <ScanLine className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Drag to Inspect Reality</span>
          </div>
        </Card>

        <Card className="flex flex-col shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/30 px-6 py-5">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">AI Snag Detection</h3>
              <p className="jarvis-text-10 mt-1 text-gray-400">Priority closeout records</p>
            </div>
            <Badge tone={openSnagCount === 0 ? "success" : "danger"}>{openSnagCount} Open</Badge>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {zone.defects.length > 0 ? (
              zone.defects.map((defect) => (
                <div key={defect.id} className="border-b border-gray-50 p-5 transition-all hover:bg-blue-50/30">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-[9px] font-black uppercase text-blue-600">{defect.id}</span>
                      <Badge tone={defect.severityTone}>{defect.severityLabel}</Badge>
                    </div>
                    <Badge tone={defect.statusTone}>{defect.statusLabel}</Badge>
                  </div>

                  <p className="text-xs font-bold text-gray-900">{defect.typeLabel}</p>
                  <p className="jarvis-text-10 mt-1 font-bold uppercase tracking-widest text-gray-400">{defect.locationLabel}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-gray-500">{defect.noteLabel}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400">{defect.detectedDateLabel}</span>
                    <button
                      type="button"
                      className="text-[9px] font-black uppercase text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      View Evidence
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-3 text-gray-300">
                <CheckCircle2 className="h-12 w-12 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">Zero Defects Detected</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-8 shadow-xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-gray-900">Reality-vs-Model Verification</h3>
              <p className="text-[10px] font-bold text-gray-400">LOD 500 consistency check</p>
            </div>
            <Badge tone={zone.verification.statusTone}>{zone.verification.statusLabel}</Badge>
          </div>

          <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-slate-100 shadow-inner">
            <Image
              src={EAGLE_EYE_IMAGE}
              alt="Reality vs model verification visual"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-35"
            />
            <div className="absolute bottom-0 left-1/2 top-0 z-10 w-0.5 -translate-x-1/2 bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
            <div className="relative z-20 flex flex-col items-center px-6 text-center">
              <div className="mb-4 rounded-full border border-blue-100 bg-white p-4 shadow-2xl">
                <ScanLine className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-900">{zone.verification.varianceLabel}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Certificate Status</span>
              <span className={cn("rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider", verificationChipClassMap[zone.verification.statusTone])}>
                {zone.verification.certificateLabel}
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-gray-500">{zone.verification.noteLabel}</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {zone.verification.checks.map((check) => (
              <div key={check.id} className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">{check.label}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn("rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider", verificationChipClassMap[check.tone])}>
                    {check.valueLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 shadow-xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-gray-900">Digital Asset Manual</h3>
              <p className="text-[10px] font-bold text-gray-400">Interactive BIM records</p>
            </div>
            <Badge tone="success">SSOT Secured</Badge>
          </div>

          <div className="space-y-4">
            {zone.manualAssets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                className="group flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-50 p-4 text-left transition-all hover:bg-white hover:ring-2 hover:ring-blue-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-transform group-hover:scale-110">
                    <Database className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{asset.assetLabel}</p>
                    <p className="text-[10px] font-bold uppercase text-gray-400">{asset.assetTypeLabel}</p>
                    <p className="jarvis-text-10 mt-1 text-gray-500">{asset.locationLabel}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={cn("text-[10px] font-black uppercase", asset.statusTone === "success" ? "text-emerald-600" : asset.statusTone === "warning" ? "text-amber-600" : "text-blue-600")}>
                    {asset.statusLabel}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function getOpenSnagCount(zone: HandoverZone) {
  const activeSnagMetric = zone.kpis.find((item) => item.label === "Active Snags");
  return activeSnagMetric ? Number.parseInt(activeSnagMetric.valueLabel, 10) : zone.defects.filter((item) => item.statusTone !== "success").length;
}
