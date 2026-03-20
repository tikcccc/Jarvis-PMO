"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  FileText,
  Filter,
  Scan,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import {
  procurementBiddersByPackageId,
  procurementIssueLog,
  procurementPackages,
  procurementSummaryCards,
  procurementSupplierProfilesById
} from "@/lib/mock-data/procurement";
import type { Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProcurementView = "workbench" | "logs";

interface ProcurementPageProps {
  initialView?: ProcurementView;
}

const summaryIconClassMap: Record<Tone, string> = {
  default: "bg-gray-100 text-gray-500",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

const riskBarToneClassMap: Record<Tone, string> = {
  default: "bg-gray-400",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  danger: "bg-rose-500"
};

const toneTextClassMap: Record<Tone, string> = {
  default: "text-gray-700",
  info: "text-blue-600",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600"
};

const toneSurfaceClassMap: Record<Tone, string> = {
  default: "border-gray-200 bg-gray-50/80",
  info: "border-blue-100 bg-blue-50/70",
  success: "border-emerald-100 bg-emerald-50/70",
  warning: "border-amber-100 bg-amber-50/70",
  danger: "border-rose-100 bg-rose-50/70"
};

const darkSignalTextClassMap: Record<Tone, string> = {
  default: "text-slate-200",
  info: "text-blue-300",
  success: "text-emerald-300",
  warning: "text-amber-300",
  danger: "text-rose-300"
};

export function ProcurementPage({ initialView = "workbench" }: ProcurementPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentView = initialView;

  const [selectedPackageId, setSelectedPackageId] = useState(procurementPackages[0]?.id ?? "");
  const [selectedBidderId, setSelectedBidderId] = useState(
    procurementPackages[0] ? (procurementBiddersByPackageId[procurementPackages[0].id] ?? [])[0]?.id ?? "" : ""
  );

  const activePackage = procurementPackages.find((item) => item.id === selectedPackageId) ?? procurementPackages[0];
  const packageBidders = activePackage ? procurementBiddersByPackageId[activePackage.id] ?? [] : [];
  const activeBidder = packageBidders.find((item) => item.id === selectedBidderId) ?? packageBidders[0];
  const activeSupplierProfile = activeBidder ? procurementSupplierProfilesById[activeBidder.supplierId] : undefined;
  const visibleIssues = procurementIssueLog.filter((item) => item.packageId === activePackage?.id);
  const leadBidder = packageBidders.find((item) => item.recommendedActionTone === "success") ?? packageBidders[0];
  const selectedBidderIssues = activeBidder ? visibleIssues.filter((item) => item.bidderId === activeBidder.id) : [];
  const selectedBidderIsLead = leadBidder?.id === activeBidder?.id;
  const primaryRiskSignals = activeBidder?.riskSignals.slice(0, 2) ?? [];
  const secondaryRiskSignal = activeBidder?.riskSignals[2];
  const focusedIssue = selectedBidderIssues[0] ?? visibleIssues[0];
  const dangerIssueCount = visibleIssues.filter((item) => item.tone === "danger").length;
  const warningIssueCount = visibleIssues.filter((item) => item.tone === "warning").length;

  const handlePackageChange = (packageId: string) => {
    setSelectedPackageId(packageId);
    setSelectedBidderId((procurementBiddersByPackageId[packageId] ?? [])[0]?.id ?? "");
  };

  const handleViewChange = (view: ProcurementView) => {
    router.push(view === "logs" ? `${pathname}?view=logs` : pathname, { scroll: false });
  };

  const supplierProfilePanel = (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <h3 className="text-sm font-bold text-gray-900">Service Provider Profiling</h3>
        </div>
        {activeSupplierProfile ? <Badge tone={activeSupplierProfile.qualificationTone}>{activeSupplierProfile.qualificationStatus}</Badge> : null}
      </div>
      <p className="mb-6 text-[11px] leading-relaxed text-gray-500">
        Selected bidder context updates in place from the active procurement view.
      </p>

      {activeBidder && activeSupplierProfile ? (
        <>
          <div className="group mb-6 rounded-xl border border-transparent bg-gray-50 p-4 shadow-sm transition-all hover:border-gray-200 hover:bg-white">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-bold text-gray-900">{activeSupplierProfile.name}</h4>
              <button type="button" className="text-gray-400 transition-colors group-hover:text-blue-500" aria-label={`Open ${activeSupplierProfile.name} profile`}>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{activeSupplierProfile.highlight}</p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Historic Projects</p>
              <p className="text-sm font-bold text-gray-900">{activeSupplierProfile.historicProjects}</p>
            </div>
            <div>
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Historic Claim Ratio</p>
              <p className="text-sm font-bold text-gray-900">{activeSupplierProfile.claimRatio}</p>
            </div>
            <div>
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Avg Response Time</p>
              <p className="text-sm font-bold text-gray-900">{activeSupplierProfile.responseTime}</p>
            </div>
            <div>
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Last Award</p>
              <p className="text-sm font-bold text-gray-900">{activeSupplierProfile.lastAward}</p>
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-[10px] font-bold text-gray-500">
              <span>INTEGRITY SCORE</span>
              <span className="text-blue-600">{activeSupplierProfile.integrityScore}%</span>
            </div>
            <ProgressBar value={activeSupplierProfile.integrityScore} barClassName="bg-blue-500" />
          </div>

          {activeSupplierProfile.redFlags.length > 0 ? (
            <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50/30 p-4">
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-rose-600">Red Flags</p>
              <div className="space-y-2">
                {activeSupplierProfile.redFlags.map((flag) => (
                  <div key={flag} className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-rose-400" />
                    <p className="text-[11px] leading-relaxed text-gray-600">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-4 py-8 text-center">
          <p className="jarvis-title-sm">Supplier profile pending</p>
          <p className="jarvis-copy-xs mt-2">
            Select a bidder to inspect qualification status, claims history, and procurement red flags.
          </p>
        </div>
      )}
    </Card>
  );

  const contractRiskPanel = (
    <Card variant="emphasis" className="relative overflow-hidden p-6">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Contractual Risk AI</h3>
            </div>
            {activeBidder ? (
              <span className="jarvis-text-10 rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-400">
                {activeBidder.riskLevel} Risk
              </span>
            ) : null}
          </div>
          <p className="mb-8 text-[11px] leading-relaxed text-slate-400">
            Historical claims logic and clause anomaly scoring for the selected bidder.
          </p>

          {activeBidder ? (
            <>
              <div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={cn("h-full shadow-[0_0_10px_rgba(255,255,255,0.22)]", riskBarToneClassMap[activeBidder.riskTone])}
                    style={{ width: `${activeBidder.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                {primaryRiskSignals.map((signal) => (
                  <div key={signal.id} className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
                    <p className={cn("text-[10px] font-black uppercase tracking-widest", darkSignalTextClassMap[signal.tone])}>{signal.value}</p>
                    <p className="mt-1 text-[9px] text-slate-400">{signal.label}</p>
                  </div>
                ))}
              </div>

              {secondaryRiskSignal ? (
                <div className="mt-4 rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 text-center">
                  <p className={cn("text-[10px] font-black uppercase tracking-widest", darkSignalTextClassMap[secondaryRiskSignal.tone])}>
                    {secondaryRiskSignal.value}
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center">
              <p className="jarvis-title-sm text-white">Risk engine waiting for bidder selection</p>
              <p className="jarvis-copy-xs mt-2 text-gray-300">
                Select a bidder to inspect clause anomalies, claims propensity, and pricing risk signals.
              </p>
            </div>
          )}
        </div>

        {activeBidder ? (
          <div className="relative z-10 mt-8 border-t border-slate-800 pt-6">
            <div className="mb-6 flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-[11px] leading-relaxed italic text-slate-300">{activeBidder.summary}</p>
                {!selectedBidderIsLead && leadBidder ? (
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Current lead: {leadBidder.name}</p>
                ) : null}
              </div>
            </div>

            {selectedBidderIssues.length > 0 ? (
              <div className="mb-6 space-y-2">
                {selectedBidderIssues.slice(0, 2).map((issue) => (
                  <div key={issue.id} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <p className="jarvis-text-10 font-bold uppercase tracking-widest text-white/45">{issue.category}</p>
                    <p className="mt-1 text-[11px] leading-4 text-gray-200">{issue.title}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <Button variant="accent" size="sm" className="w-full uppercase tracking-widest">
              Escalate Review
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );

  const intelligenceLogPanel = (
    <Card className="p-6">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Procurement Intelligence Log</h3>
          <p className="mt-1 text-[11px] text-gray-500">
            Detected mismatches, missing submissions, and clause anomalies for the active package.
          </p>
        </div>
        {activePackage ? (
          <span className="jarvis-text-10 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 font-bold uppercase tracking-widest text-blue-600">
            {visibleIssues.length} Active Signals
          </span>
        ) : null}
      </div>

      {visibleIssues.length > 0 ? (
        <div className="divide-y divide-gray-50 border-t border-gray-50">
          {visibleIssues.map((item) => {
            const selectedBidderIssue = activeBidder?.id === item.bidderId;
            const isInteractive = Boolean(item.bidderId);

            return (
              <button
                key={item.id}
                type="button"
                disabled={!isInteractive}
                onClick={() => {
                  if (item.bidderId) {
                    setSelectedBidderId(item.bidderId);
                  }
                }}
                className={cn(
                  "w-full rounded-lg px-2 py-5 text-left transition-colors",
                  isInteractive ? "cursor-pointer hover:bg-gray-50/50" : "cursor-default",
                  selectedBidderIssue ? "bg-blue-50/40" : ""
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge tone={item.tone}>{item.category}</Badge>
                      <Badge tone={item.tone}>{item.status}</Badge>
                      {selectedBidderIssue ? <Badge tone="info">Selected Bidder</Badge> : null}
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="mt-1 max-w-3xl text-[11px] leading-5 text-gray-500">{item.message}</p>
                  </div>
                  <div className="ml-4 whitespace-nowrap text-right">
                    <div className="mb-1 flex gap-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Owner</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Updated</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-24 text-xs font-medium text-gray-700">{item.owner}</span>
                      <span className="w-16 text-xs text-gray-500">{item.timeLabel}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-10 text-center">
          <p className="jarvis-title-sm">No procurement issues detected</p>
          <p className="jarvis-copy-xs mt-2">
            Jarvis will publish clause anomalies and clarification risks here as soon as the package is synced.
          </p>
        </div>
      )}
    </Card>
  );

  const logsScopePanel = (
    <Card className="overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="jarvis-text-10 font-bold uppercase tracking-widest text-blue-600">Log Scope</p>
            <h3 className="mt-2 text-lg font-black tracking-tight text-gray-950">Package Signal Review</h3>
            <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-600">
              Use the package switcher to filter the audit stream while keeping bidder-linked risk context on the right.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="jarvis-text-10 rounded-full border border-gray-200 bg-white px-3 py-1 font-bold uppercase tracking-widest text-gray-600">
              {visibleIssues.length} Signals
            </span>
            <span className="jarvis-text-10 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 font-bold uppercase tracking-widest text-rose-600">
              {dangerIssueCount} Critical
            </span>
            <span className="jarvis-text-10 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 font-bold uppercase tracking-widest text-amber-600">
              {warningIssueCount} Pending
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {procurementPackages.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activePackage?.id === item.id}
              onClick={() => handlePackageChange(item.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-200",
                activePackage?.id === item.id ? "border-blue-500 bg-blue-50/50 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <Badge tone={item.tone}>{item.status}</Badge>
                <span className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">{item.code}</span>
              </div>
              <p className="mt-3 text-sm font-bold text-gray-900">{item.name}</p>
              <div className="mt-2 flex justify-between text-[10px] font-semibold text-gray-500">
                <span>{item.bidderCount} bidders</span>
                <span>{item.clarificationCount} clarifications</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {focusedIssue ? (
        <div className={cn("px-6 py-4", toneSurfaceClassMap[focusedIssue.tone])}>
          <div className="flex items-start gap-3">
            <AlertTriangle className={cn("mt-0.5 h-4 w-4 shrink-0", toneTextClassMap[focusedIssue.tone])} />
            <div className="min-w-0">
              <p className={cn("jarvis-text-10 font-bold uppercase tracking-widest", toneTextClassMap[focusedIssue.tone])}>{focusedIssue.category}</p>
              <p className="mt-1 text-sm font-bold text-gray-950">{focusedIssue.title}</p>
              <p className="mt-1 text-[11px] leading-4 text-gray-600">{focusedIssue.message}</p>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );

  const logContextPanel = (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="jarvis-text-10 font-bold uppercase tracking-widest text-blue-600">Selected Signal Context</p>
          <h3 className="mt-2 text-base font-black tracking-tight text-gray-950">{focusedIssue?.title ?? "No active signal selected"}</h3>
        </div>
        {focusedIssue ? <Badge tone={focusedIssue.tone}>{focusedIssue.status}</Badge> : null}
      </div>

      {focusedIssue ? (
        <>
          <p className="text-sm leading-5 text-gray-600">{focusedIssue.message}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Package</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{activePackage?.name}</p>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Owner</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{focusedIssue.owner}</p>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Updated</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{focusedIssue.timeLabel}</p>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Linked Bidder</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{activeBidder?.name ?? "Package level"}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-4 py-8 text-center">
          <p className="jarvis-title-sm">No procurement signals detected</p>
          <p className="jarvis-copy-xs mt-2">When the log receives alerts, this panel will surface the active issue context.</p>
        </div>
      )}
    </Card>
  );

  const workbenchPanel = (
    <Card className="flex flex-col overflow-hidden">
      <div className="border-b border-gray-50 p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              <h3 className="text-sm font-bold uppercase tracking-tight text-gray-900">Tender Validation Workbench</h3>
            </div>
            <p className="mt-3 text-xs leading-5 text-gray-500">
              Digital BQ Validation, Compliance Auditing, Contractual Risk Prediction, and Intelligent Tender Evaluation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <IconButton variant="surface" size="sm" aria-label="Filter bidders">
              <Filter className="h-4 w-4" />
            </IconButton>
            <IconButton variant="surface" size="sm" aria-label="Search bidders">
              <Search className="h-4 w-4" />
            </IconButton>
            <Button variant="subtle" size="sm" className="uppercase tracking-widest text-blue-600">
              Compare Bidders
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {procurementPackages.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activePackage?.id === item.id}
              onClick={() => handlePackageChange(item.id)}
              className={cn(
                "relative overflow-hidden rounded-xl border bg-white p-4 text-left transition-[background-color,border-color,box-shadow,opacity,transform] duration-200 motion-safe:hover:-translate-y-px",
                activePackage?.id === item.id
                  ? "border-2 border-blue-500 bg-blue-50/20 shadow-[0_14px_30px_rgba(59,130,246,0.12)]"
                  : "border-gray-100 opacity-70 hover:border-gray-200 hover:opacity-100"
              )}
            >
              {activePackage?.id === item.id ? <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-blue-400/10 blur-2xl" /> : null}

              <div className="relative flex items-center justify-between gap-3">
                <Badge tone={item.tone}>{item.status}</Badge>
                <span className={cn("jarvis-text-10 font-bold uppercase tracking-widest", activePackage?.id === item.id ? "text-blue-600" : "text-gray-400")}>
                  {item.code}
                </span>
              </div>
              <h4 className="relative mt-3 text-sm font-bold text-gray-900">{item.name}</h4>
              <p className="relative mt-1 text-[10px] leading-4 text-gray-500">{item.scope}</p>
              <div
                className={cn(
                  "relative mt-4 flex justify-between text-[10px] font-bold",
                  activePackage?.id === item.id ? "text-gray-600" : "text-gray-400"
                )}
              >
                <span>{item.bidderCount} bidders</span>
                <span>{item.clarificationCount} clarifications</span>
              </div>
            </button>
          ))}
        </div>

        {activePackage ? (
          <div className="mt-6 grid gap-4 border-t border-gray-50 pt-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Package Stage</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{activePackage.stage}</p>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Engineer Estimate</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{activePackage.engineerEstimate}</p>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">BQ Coverage</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{activePackage.bqCoverage}</p>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Tender Lead</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{activePackage.lead}</p>
            </div>
          </div>
        ) : null}
      </div>

      {packageBidders.length > 0 ? (
        <div className="flex-1 overflow-x-auto bg-gray-50/30 pb-4">
          <table className="w-full min-w-[860px] text-left">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="sticky left-0 z-20 bg-white px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-[4px_0_6px_-1px_rgba(15,23,42,0.06)]">
                  Bidder
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Offer / Spread</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Compliance</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">BQ Deviation</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Contract Risk</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packageBidders.map((bidder) => {
                const isSelected = activeBidder?.id === bidder.id;
                const isLead = leadBidder?.id === bidder.id;
                const hasAnomaly = bidder.riskTone === "danger" || visibleIssues.some((item) => item.bidderId === bidder.id && item.tone === "danger");
                const stickyCellClassName = hasAnomaly ? "bg-[#fff5f5]" : isSelected ? "bg-blue-50/40" : "bg-white";

                return (
                  <tr
                    key={bidder.id}
                    onClick={() => setSelectedBidderId(bidder.id)}
                    className={cn(
                      "cursor-pointer transition-colors",
                      hasAnomaly
                        ? "bg-rose-50/40 hover:bg-rose-50/60"
                        : isSelected
                          ? "bg-blue-50/25 hover:bg-blue-50/40"
                          : "bg-white hover:bg-blue-50/20"
                    )}
                  >
                    <td
                      className={cn(
                        "sticky left-0 z-10 w-[34%] px-6 py-4 align-top shadow-[4px_0_6px_-1px_rgba(15,23,42,0.06)] transition-colors",
                        stickyCellClassName
                      )}
                    >
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-gray-900">{bidder.name}</span>
                            <Badge tone={bidder.riskTone}>{bidder.riskLevel.toUpperCase()}</Badge>
                            {isLead ? <Badge tone="info">Lead</Badge> : null}
                            {isSelected ? <Badge tone="info">Selected</Badge> : null}
                          </div>
                        </div>
                      </div>
                      <p className={cn("pr-2 text-[11px] leading-relaxed", hasAnomaly ? "font-medium text-rose-700/80" : "text-gray-500")}>
                        {bidder.summary}
                      </p>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-gray-900">{bidder.commercialOffer}</p>
                      <p className="mt-1 text-[10px] text-gray-500">{bidder.commercialSpread}</p>
                    </td>
                    <td className="w-32 px-6 py-4 align-top">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500">SCORE</span>
                        <span className={cn("text-[11px] font-bold", bidder.complianceScore < 85 ? "text-rose-600" : "text-blue-600")}>
                          {bidder.complianceScore}%
                        </span>
                      </div>
                      <ProgressBar
                        value={bidder.complianceScore}
                        barClassName={bidder.complianceScore > 90 ? "bg-blue-500" : bidder.complianceScore > 85 ? "bg-amber-400" : "bg-rose-500"}
                      />
                    </td>
                    <td className="px-6 py-4 align-top">
                      {hasAnomaly ? (
                        <div className="inline-flex items-center rounded border border-rose-300 bg-rose-100 px-2 py-1 text-xs font-bold text-rose-800 shadow-sm ring-2 ring-rose-500/15">
                          <AlertTriangle className="mr-1.5 h-3 w-3" />
                          {bidder.bqDeviation}
                        </div>
                      ) : (
                        <span className="px-2 py-1 text-xs font-bold text-gray-900">{bidder.bqDeviation}</span>
                      )}
                    </td>
                    <td className="w-32 px-6 py-4 align-top">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500">RISK</span>
                        <span className={cn("text-[11px] font-bold", toneTextClassMap[bidder.riskTone])}>{bidder.riskScore}</span>
                      </div>
                      <ProgressBar value={bidder.riskScore} barClassName={riskBarToneClassMap[bidder.riskTone]} />
                    </td>
                    <td className="px-6 py-4 align-top">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedBidderId(bidder.id);
                        }}
                        className="p-1.5 text-gray-300 transition-colors hover:text-blue-500"
                        aria-label={`Inspect ${bidder.name}`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-10">
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-10 text-center">
            <p className="jarvis-title-sm">No bidder comparison synced yet</p>
            <p className="jarvis-copy-xs mt-2">
              Jarvis will keep the module stable and render a safe placeholder until tender data is available.
            </p>
          </div>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Procurement Management</h2>
          <p className="jarvis-page-copy mt-1">Zero-Dispute Supply Chain &amp; Tender Validation</p>
        </div>

        <div className="flex flex-col items-start gap-3 xl:items-end">
          <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
            {(["workbench", "logs"] as ProcurementView[]).map((view) => {
              const isActive = currentView === view;

              return (
                <button
                  key={view}
                  type="button"
                  onClick={() => handleViewChange(view)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors",
                    isActive ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {view}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant={currentView === "logs" ? "subtle" : "secondary"} size="md" onClick={() => handleViewChange("logs")}>
              Audit Logs
            </Button>
            <Button variant="primary" size="md">
              <Scan className="h-3.5 w-3.5" />
              Initiate Agent
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {procurementSummaryCards.map((card) => {
          const Icon = getIcon(card.icon);

          return (
            <Card key={card.id} className="flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between gap-3">
                <div className={cn("rounded-lg p-2", summaryIconClassMap[card.tone])}>
                  <Icon className="h-5 w-5" />
                </div>
                <Badge tone={card.tone}>{card.tone === "danger" ? "Watchlist" : card.tone === "success" ? "Stable" : "Live"}</Badge>
              </div>
              <div className="mt-6">
                <p className="jarvis-text-10 font-black uppercase tracking-widest text-gray-400">{card.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{card.value}</p>
                <p className="mt-2 text-[11px] font-medium leading-4 text-gray-500">{card.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {currentView === "workbench" ? (
        <>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.92fr)]">
            {workbenchPanel}
            <div className="space-y-6">
              {supplierProfilePanel}
              {contractRiskPanel}
            </div>
          </div>

          {intelligenceLogPanel}
        </>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.92fr)]">
          <div className="space-y-6">
            {logsScopePanel}
            {intelligenceLogPanel}
          </div>

          <div className="space-y-6">
            {logContextPanel}
            {contractRiskPanel}
            {supplierProfilePanel}
          </div>
        </div>
      )}
    </div>
  );
}
