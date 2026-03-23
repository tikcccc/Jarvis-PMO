"use client";

import type { ECharts, EChartsOption } from "echarts";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  ExternalLink,
  FileText,
  Filter,
  Scale,
  Scan,
  Search,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import {
  procurementBiddersByPackageId,
  procurementClaimsTrendBySupplierId,
  procurementCommercialAnalysisByPackageId,
  procurementIssueLog,
  procurementPackages,
  procurementSummaryCards,
  procurementSupplierProfilesById,
  procurementSupplierRadarById
} from "@/lib/mock-data/procurement";
import type { ProcurementBidder, ProcurementIssueLog as ProcurementIssue, ProcurementPackage, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

type RadarProfile = (typeof procurementSupplierRadarById)[keyof typeof procurementSupplierRadarById];
type ClaimsTrend = (typeof procurementClaimsTrendBySupplierId)[keyof typeof procurementClaimsTrendBySupplierId];
type CommercialAnalysis = (typeof procurementCommercialAnalysisByPackageId)[keyof typeof procurementCommercialAnalysisByPackageId];

const procurementRadarProfiles = procurementSupplierRadarById as Record<string, RadarProfile>;
const procurementClaimsTrends = procurementClaimsTrendBySupplierId as Record<string, ClaimsTrend>;
const procurementCommercialAnalyses = procurementCommercialAnalysisByPackageId as Record<string, CommercialAnalysis>;

const summaryStatusById: Record<string, { label: string; tone: Tone }> = {
  "packages-under-review": { label: "Live", tone: "info" },
  "compliant-bidders": { label: "Stable", tone: "success" },
  "flagged-contract-risks": { label: "Watchlist", tone: "danger" },
  "pending-clarifications": { label: "Live", tone: "warning" }
};

const summaryIconClassMap: Record<Tone, string> = {
  default: "bg-slate-100 text-slate-600",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

const toneTextClassMap: Record<Tone, string> = {
  default: "text-slate-600",
  info: "text-blue-600",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600"
};

const toneSurfaceClassMap: Record<Tone, string> = {
  default: "border-slate-200 bg-slate-50/70",
  info: "border-blue-100 bg-blue-50/60",
  success: "border-emerald-100 bg-emerald-50/60",
  warning: "border-amber-100 bg-amber-50/60",
  danger: "border-rose-100 bg-rose-50/60"
};

const riskBadgeClassMap: Record<Tone, string> = {
  default: "border-slate-200 bg-slate-50 text-slate-700",
  info: "border-blue-100 bg-blue-50 text-blue-600",
  success: "border-emerald-100 bg-emerald-50 text-emerald-600",
  warning: "border-amber-100 bg-amber-50 text-amber-600",
  danger: "border-rose-100 bg-rose-50 text-rose-600"
};

const progressBarToneClassMap: Record<Tone, string> = {
  default: "bg-slate-500",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500"
};

const chartSeriesColorMap: Record<Tone, string> = {
  default: "#64748b",
  info: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#f43f5e"
};

function getInitialPackageId() {
  return procurementPackages[0]?.id ?? "";
}

function getInitialBidderId(packageId: string) {
  const bidders = procurementBiddersByPackageId[packageId] ?? [];

  return bidders.find((bidder) => bidder.recommendedActionTone === "success")?.id ?? bidders[0]?.id ?? "";
}

function MiniBadge({ tone, children, className }: { tone: Tone; children: ReactNode; className?: string }) {
  return (
    <Badge tone={tone} className={cn("rounded-md px-2 py-0.5", className)}>
      {children}
    </Badge>
  );
}

export function ProcurementPage() {
  const [selectedPackageId, setSelectedPackageId] = useState(getInitialPackageId);
  const [selectedBidderId, setSelectedBidderId] = useState(() => getInitialBidderId(getInitialPackageId()));

  const activePackage = procurementPackages.find((item) => item.id === selectedPackageId) ?? procurementPackages[0] ?? null;
  const packageBidders = activePackage ? procurementBiddersByPackageId[activePackage.id] ?? [] : [];
  const leadBidder = packageBidders.find((item) => item.recommendedActionTone === "success") ?? packageBidders[0] ?? null;
  const activeBidder = packageBidders.find((item) => item.id === selectedBidderId) ?? leadBidder ?? packageBidders[0] ?? null;
  const activeSupplierProfile = activeBidder ? procurementSupplierProfilesById[activeBidder.supplierId] ?? null : null;
  const visibleIssues = activePackage ? procurementIssueLog.filter((item) => item.packageId === activePackage.id) : [];
  const radarProfile =
    (activeBidder ? procurementRadarProfiles[activeBidder.supplierId] : null) ?? procurementRadarProfiles["supplier-aurex-build-systems"];
  const claimsTrend =
    (activeBidder ? procurementClaimsTrends[activeBidder.supplierId] : null) ?? procurementClaimsTrends["supplier-aurex-build-systems"];
  const commercialAnalysis =
    (activePackage ? procurementCommercialAnalyses[activePackage.id] : null) ?? procurementCommercialAnalyses["facade-envelope"];

  const handlePackageChange = (packageId: string) => {
    setSelectedPackageId(packageId);
    setSelectedBidderId(getInitialBidderId(packageId));
  };

  if (!activePackage) {
    return (
      <Card className="rounded-2xl border-dashed p-10 text-center">
        <p className="text-sm font-bold text-slate-900">Procurement demo data unavailable</p>
        <p className="mt-2 text-xs text-slate-500">Add a tender package to render the procurement workbench.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <ProcurementHeader />
      <ProcurementSummaryGrid />

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        <TenderValidationMatrix
          activeBidder={activeBidder}
          activePackage={activePackage}
          leadBidder={leadBidder}
          packageBidders={packageBidders}
          selectedPackageId={selectedPackageId}
          visibleIssues={visibleIssues}
          onBidderSelect={setSelectedBidderId}
          onPackageChange={handlePackageChange}
        />
        <SupplierProfilePanel activeSupplierProfile={activeSupplierProfile} radarProfile={radarProfile} />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <CommercialAnalysisPanel analysis={commercialAnalysis} />
        <ContractualRiskPanel activeBidder={activeBidder} claimsTrend={claimsTrend} />
      </div>

      <IntelligenceLogPanel
        issues={visibleIssues}
        selectedBidderId={activeBidder?.id}
        onIssueSelect={(issue) => {
          if (issue.bidderId) {
            setSelectedBidderId(issue.bidderId);
          }
        }}
      />
    </div>
  );
}

function ProcurementHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Project Procurement Management</h2>
        <p className="mt-1 text-sm text-slate-500">Zero-Dispute Supply Chain &amp; Tender Validation</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="sm" className="uppercase tracking-widest">
          <Scan className="h-3.5 w-3.5 text-blue-300" />
          Initiate Agent
        </Button>
      </div>
    </div>
  );
}

function ProcurementSummaryGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {procurementSummaryCards.map((metric) => {
        const Icon = getIcon(metric.icon);
        const status = summaryStatusById[metric.id] ?? { label: "Live", tone: metric.tone };

        return (
          <Card key={metric.id} className="group flex h-36 flex-col justify-between rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div className={cn("rounded-lg p-2 transition-transform duration-200 group-hover:scale-105", summaryIconClassMap[metric.tone])}>
                <Icon className="h-5 w-5" />
              </div>
              <MiniBadge tone={status.tone}>{status.label}</MiniBadge>
            </div>

            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{metric.label}</p>
              <p className="text-3xl font-black text-slate-900">{metric.value}</p>
              <p className="mt-1 text-[10px] leading-tight text-slate-500">{metric.detail}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function ProcurementPackageSelector({
  selectedPackageId,
  onPackageChange
}: {
  selectedPackageId: string;
  onPackageChange: (packageId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {procurementPackages.map((item) => {
        const isActive = item.id === selectedPackageId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPackageChange(item.id)}
            className={cn(
              "min-w-[220px] rounded-xl border px-3.5 py-3 text-left transition-all duration-200",
              isActive
                ? "border-blue-500 bg-blue-50/50 shadow-[0_14px_30px_rgba(59,130,246,0.10)]"
                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/70"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <MiniBadge tone={item.tone}>{item.status}</MiniBadge>
              <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-blue-600" : "text-slate-400")}>
                {item.code}
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-slate-900">{item.name}</p>
            <p className="mt-1 text-[10px] leading-4 text-slate-500">{item.scope}</p>
          </button>
        );
      })}
    </div>
  );
}

function TenderValidationMatrix({
  activeBidder,
  activePackage,
  leadBidder,
  packageBidders,
  selectedPackageId,
  visibleIssues,
  onBidderSelect,
  onPackageChange
}: {
  activeBidder: ProcurementBidder | null;
  activePackage: ProcurementPackage;
  leadBidder: ProcurementBidder | null;
  packageBidders: ProcurementBidder[];
  selectedPackageId: string;
  visibleIssues: ProcurementIssue[];
  onBidderSelect: (bidderId: string) => void;
  onPackageChange: (packageId: string) => void;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl lg:col-span-2">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-900">
              <Scale className="mr-2 h-4 w-4 text-blue-600" />
              Tender Validation Matrix
            </h3>
            <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-slate-500">
              Digital BQ Validation, Compliance Auditing, Contractual Risk Prediction, and Intelligent Tender Evaluation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <IconButton variant="surface" size="sm" aria-label="Filter bidders">
              <Filter className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton variant="surface" size="sm" aria-label="Search bidders">
              <Search className="h-3.5 w-3.5" />
            </IconButton>
            <Button variant="subtle" size="sm" className="uppercase tracking-widest">
              Compare Bidders
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <ProcurementPackageSelector selectedPackageId={selectedPackageId} onPackageChange={onPackageChange} />
        </div>

        <div className="mt-4 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Package Stage</p>
            <p className="mt-1 font-bold text-slate-900">{activePackage.stage}</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Engineer Estimate</p>
            <p className="mt-1 font-bold text-slate-900">{activePackage.engineerEstimate}</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">BQ Coverage</p>
            <p className="mt-1 font-bold text-slate-900">{activePackage.bqCoverage}</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tender Lead</p>
            <p className="mt-1 font-bold text-slate-900">{activePackage.lead}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-100 bg-slate-50/40">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Bidder</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Spread</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Compliance</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Deviation</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packageBidders.map((bidder) => {
              const isSelected = activeBidder?.id === bidder.id;
              const isLead = leadBidder?.id === bidder.id;
              const hasCriticalSignal = visibleIssues.some((item) => item.bidderId === bidder.id && item.tone === "danger");

              return (
                <tr
                  key={bidder.id}
                  onClick={() => onBidderSelect(bidder.id)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    hasCriticalSignal
                      ? "bg-rose-50/30 hover:bg-rose-50/50"
                      : isSelected
                        ? "bg-blue-50/35 hover:bg-blue-50/50"
                        : "bg-white hover:bg-slate-50/70"
                  )}
                >
                  <td className="w-[40%] px-6 py-5 align-top">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{bidder.name}</span>
                      <MiniBadge tone={bidder.riskTone}>{bidder.riskLevel.toUpperCase()}</MiniBadge>
                      {isLead ? <MiniBadge tone="info">Lead</MiniBadge> : null}
                      {isSelected ? <MiniBadge tone="info">Selected</MiniBadge> : null}
                    </div>
                    <p className={cn("text-[11px] leading-relaxed", hasCriticalSignal ? "font-medium text-rose-700" : "text-slate-500")}>
                      {bidder.summary}
                    </p>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="block text-sm font-black text-slate-900">{bidder.commercialOffer}</span>
                    <span className="text-[10px] font-medium text-slate-400">{bidder.commercialSpread}</span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className={cn("mb-1 flex justify-between text-[9px] font-bold", bidder.complianceScore >= 90 ? "text-blue-600" : "text-rose-600")}>
                      <span className="text-slate-400">SCORE</span>
                      <span>{bidder.complianceScore}%</span>
                    </div>
                    <ProgressBar
                      value={bidder.complianceScore}
                      barClassName={bidder.complianceScore >= 90 ? "bg-blue-500" : bidder.complianceScore >= 85 ? "bg-amber-500" : "bg-rose-500"}
                    />
                  </td>
                  <td className="px-6 py-5 align-top">
                    {hasCriticalSignal ? (
                      <div className="inline-flex items-center rounded-md border border-rose-200 bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {bidder.bqDeviation}
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-900">{bidder.bqDeviation}</span>
                    )}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className={cn("mb-1 flex justify-between text-[9px] font-bold", toneTextClassMap[bidder.riskTone])}>
                      <span className="text-slate-400">RISK</span>
                      <span>{bidder.riskScore}</span>
                    </div>
                    <ProgressBar value={bidder.riskScore} barClassName={progressBarToneClassMap[bidder.riskTone]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function SupplierProfilePanel({
  activeSupplierProfile,
  radarProfile
}: {
  activeSupplierProfile: (typeof procurementSupplierProfilesById)[string] | null;
  radarProfile: RadarProfile;
}) {
  if (!activeSupplierProfile) {
    return (
      <Card className="rounded-2xl p-6">
        <p className="text-sm font-bold text-slate-900">Service Provider Profiling</p>
        <p className="mt-3 text-xs text-slate-500">Select a bidder to render service-provider context.</p>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center text-sm font-bold text-slate-900">
          <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" />
          Service Provider Profiling
        </h3>
        <MiniBadge tone={activeSupplierProfile.qualificationTone}>{activeSupplierProfile.qualificationStatus}</MiniBadge>
      </div>

      <p className="mb-4 text-[11px] leading-relaxed text-slate-500">
        Dynamic holistic profile pulling DWSS (Quality) and Smart Site (Safety) history.
      </p>

      <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="truncate text-sm font-bold text-slate-900">{activeSupplierProfile.name}</h4>
              <button type="button" aria-label={`Open ${activeSupplierProfile.name} profile`} className="text-slate-400 transition-colors hover:text-blue-500">
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="inline-flex shrink-0 items-center rounded-md border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-blue-600">
            <div className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
            {radarProfile.liveLabel}
          </div>
        </div>

        <ProcurementChart option={getProviderRadarOption(radarProfile)} className="mt-2 h-36 w-full" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Historic Projects</p>
          <p className="mt-0.5 text-sm font-bold leading-tight text-slate-900">{activeSupplierProfile.historicProjects}</p>
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Avg DWSS Score</p>
          <p className="mt-0.5 text-sm font-black text-slate-900">{radarProfile.avgDwssScore}</p>
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Avg Response Time</p>
          <p className="mt-0.5 text-sm font-bold text-slate-900">{activeSupplierProfile.responseTime}</p>
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Last Award</p>
          <p className="mt-0.5 truncate text-sm font-bold text-slate-900">{activeSupplierProfile.lastAward}</p>
        </div>
      </div>

      <div className="mt-auto border-t border-slate-50 pt-4">
        <div className="mb-1.5 flex justify-between text-[9px] font-black uppercase tracking-widest text-blue-600">
          <span className="text-slate-500">Integrity Score</span>
          <span>{activeSupplierProfile.integrityScore}%</span>
        </div>
        <ProgressBar value={activeSupplierProfile.integrityScore} barClassName="bg-blue-500" />
      </div>
    </Card>
  );
}

function CommercialAnalysisPanel({ analysis }: { analysis: CommercialAnalysis }) {
  return (
    <Card className="flex h-full flex-col rounded-2xl p-6 md:p-8">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center text-base font-bold text-slate-900">
          <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
          Commercial Spread &amp; Front-Loading Analysis
        </h3>
        <span className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", riskBadgeClassMap[analysis.signalTone])}>
          {analysis.signalTone === "danger" ? <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> : null}
          {analysis.signalLabel}
        </span>
      </div>

      <p className="mb-6 text-[13px] leading-relaxed text-slate-500">
        Comparison of stage-by-stage valuations against the Engineer&apos;s Estimate.
        <span className={cn("ml-1 font-medium", toneTextClassMap[analysis.signalTone])}>{analysis.highlightText}</span>
      </p>

      <div className="mt-auto flex min-h-[300px] flex-1 items-center">
        <ProcurementChart option={getCommercialSpreadOption(analysis)} className="h-[340px] w-full" />
      </div>
    </Card>
  );
}

function ContractualRiskPanel({
  activeBidder,
  claimsTrend
}: {
  activeBidder: ProcurementBidder | null;
  claimsTrend: ClaimsTrend;
}) {
  if (!activeBidder) {
    return (
      <Card className="rounded-2xl p-6 md:p-8">
        <p className="text-sm font-bold text-slate-900">Contractual Risk AI</p>
        <p className="mt-3 text-xs text-slate-500">Select a bidder to render the clause and claims view.</p>
      </Card>
    );
  }

  return (
    <Card className="relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-8">
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center text-base font-bold uppercase tracking-widest text-slate-900">
            <ShieldAlert className="mr-2 h-5 w-5 text-rose-500" />
            Contractual Risk AI
          </h3>
          <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider", riskBadgeClassMap[activeBidder.riskTone])}>
            {activeBidder.riskLevel} Risk
          </span>
        </div>

        <p className="mb-6 text-[13px] leading-relaxed text-slate-500">
          Historic claims exposure &amp; clause anomaly scoring. Chart illustrates the 5-year post-handover claim propensity.
        </p>

        <div className="mb-6 flex min-h-[180px] w-full flex-1 items-center">
          <ProcurementChart option={getClaimsTrendOption(claimsTrend, activeBidder.riskTone)} className="h-[180px] w-full" />
        </div>

        <div className="mb-6 mt-auto grid grid-cols-2 gap-4">
          {activeBidder.riskSignals.slice(0, 2).map((signal) => (
            <div key={signal.id} className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-center">
              <p className={cn("text-[11px] font-black uppercase tracking-widest", toneTextClassMap[signal.tone])}>{signal.value}</p>
              <p className="mt-1 text-[10px] text-slate-400">{signal.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <p className="text-[13px] italic leading-relaxed text-blue-900/70">&quot;{activeBidder.summary}&quot;</p>
        </div>
      </div>
    </Card>
  );
}

function IntelligenceLogPanel({
  issues,
  selectedBidderId,
  onIssueSelect
}: {
  issues: ProcurementIssue[];
  selectedBidderId?: string;
  onIssueSelect: (issue: ProcurementIssue) => void;
}) {
  return (
    <Card className="rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-3 border-b border-slate-50 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Procurement Intelligence Log</h3>
          <p className="mt-1 text-xs text-slate-400">Detected mismatches, missing submissions, and clause anomalies for the active package.</p>
        </div>
        <MiniBadge tone="info" className="px-3 py-1">
          {issues.length} Active Signals
        </MiniBadge>
      </div>

      {issues.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {issues.slice(0, 3).map((issue) => {
            const isSelected = selectedBidderId === issue.bidderId;

            return (
              <button
                key={issue.id}
                type="button"
                onClick={() => onIssueSelect(issue)}
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 hover:shadow-sm",
                  toneSurfaceClassMap[issue.tone],
                  isSelected ? "ring-1 ring-blue-200" : ""
                )}
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  <MiniBadge tone={issue.tone}>{issue.category}</MiniBadge>
                  <MiniBadge tone={issue.tone}>{issue.status}</MiniBadge>
                  {isSelected ? <MiniBadge tone="info">Selected Bidder</MiniBadge> : null}
                </div>

                <h4 className="mb-2 text-sm font-bold text-slate-900">{issue.title}</h4>
                <p className="mb-4 flex-1 text-[11px] leading-relaxed text-slate-500">{issue.message}</p>

                <div className="flex items-center justify-between border-t border-black/5 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/80 bg-white text-[8px] font-bold text-slate-500 shadow-sm">
                      {getInitials(issue.owner)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">{issue.owner}</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">{issue.timeLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-6 py-10 text-center">
          <p className="text-sm font-bold text-slate-900">No procurement signals detected</p>
          <p className="mt-2 text-xs text-slate-500">Jarvis will publish clause anomalies and clarification risks here as soon as the package is synced.</p>
        </div>
      )}
    </Card>
  );
}

function ProcurementChart({ option, className }: { option: EChartsOption; className: string }) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<ECharts | null>(null);
  const optionRef = useRef(option);

  optionRef.current = option;

  useEffect(() => {
    let isMounted = true;

    const handleResize = () => {
      instanceRef.current?.resize();
    };

    async function initChart() {
      const echarts = await import("echarts");

      if (!isMounted || !chartRef.current) {
        return;
      }

      instanceRef.current = echarts.getInstanceByDom(chartRef.current) ?? echarts.init(chartRef.current);
      instanceRef.current.setOption(optionRef.current, true);
      window.addEventListener("resize", handleResize);
    }

    void initChart();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    instanceRef.current?.setOption(option, true);
  }, [option]);

  return <div ref={chartRef} className={className} />;
}

function getProviderRadarOption(radarProfile: RadarProfile): EChartsOption {
  return {
    tooltip: {
      trigger: "item",
      textStyle: { fontSize: 11 }
    },
    radar: {
      indicator: radarProfile.indicators,
      radius: "65%",
      center: ["50%", "55%"],
      splitNumber: 4,
      axisName: { color: "#64748b", fontSize: 9 },
      splitArea: {
        areaStyle: { color: ["#f8fafc", "#f1f5f9", "#f8fafc", "#f1f5f9"] }
      },
      axisLine: { lineStyle: { color: "#e2e8f0" } },
      splitLine: { lineStyle: { color: "#e2e8f0" } }
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: radarProfile.values,
            itemStyle: { color: "#3b82f6" },
            lineStyle: { color: "#3b82f6", width: 2 },
            areaStyle: { color: "rgba(59,130,246,0.18)" },
            symbol: "circle",
            symbolSize: 6
          }
        ]
      }
    ]
  };
}

function getCommercialSpreadOption(analysis: CommercialAnalysis): EChartsOption {
  const comparisonColor = chartSeriesColorMap[analysis.signalTone];
  const maxValue = Math.max(...analysis.engineerEstimate, ...analysis.leadValues, ...analysis.comparisonValues);
  const axisMax = Math.ceil((maxValue + 1.5) / 3) * 3;

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      textStyle: { fontSize: 12 },
      valueFormatter: (value) => `${value}M`
    },
    legend: {
      data: ["Engineer Estimate", analysis.leadSeriesLabel, analysis.comparisonSeriesLabel],
      bottom: 0,
      icon: "circle",
      itemGap: 24,
      textStyle: { fontSize: 11, color: "#64748b" }
    },
    grid: { left: "2%", right: "2%", bottom: "14%", top: "8%", containLabel: true },
    xAxis: {
      type: "category",
      data: analysis.categories,
      axisLine: { lineStyle: { color: "#e2e8f0" } },
      axisTick: { show: false },
      axisLabel: { color: "#64748b", fontSize: 11, interval: 0, margin: 16 }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: axisMax,
      interval: 3,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#f1f5f9", type: "dashed" } },
      axisLabel: {
        color: "#94a3b8",
        fontSize: 11,
        margin: 16,
        formatter: (value: number) => `${value}M`
      }
    },
    series: [
      {
        name: "Engineer Estimate",
        type: "bar",
        barGap: "15%",
        barMaxWidth: 32,
        data: analysis.engineerEstimate,
        itemStyle: { color: "#cbd5e1", borderRadius: [4, 4, 0, 0] }
      },
      {
        name: analysis.leadSeriesLabel,
        type: "bar",
        barMaxWidth: 32,
        data: analysis.leadValues,
        itemStyle: { color: "#3b82f6", borderRadius: [4, 4, 0, 0] }
      },
      {
        name: analysis.comparisonSeriesLabel,
        type: "bar",
        barMaxWidth: 32,
        data: analysis.comparisonValues,
        itemStyle: { color: comparisonColor, borderRadius: [4, 4, 0, 0] }
      }
    ]
  };
}

function getClaimsTrendOption(claimsTrend: ClaimsTrend, tone: Tone): EChartsOption {
  const color = chartSeriesColorMap[tone];
  const maxValue = Math.max(...claimsTrend.values, 4);
  const axisMax = Math.ceil(maxValue + 0.5);

  return {
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/><span style='font-weight:700'>Claim Ratio: {c}%</span>",
      textStyle: { fontSize: 11 },
      backgroundColor: "rgba(255,255,255,0.96)",
      borderColor: "#e2e8f0",
      extraCssText: "box-shadow: 0 8px 24px rgba(15,23,42,0.08); border-radius: 10px;"
    },
    grid: { left: "2%", right: "5%", top: "8%", bottom: "10%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: claimsTrend.years,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#94a3b8", fontSize: 10, margin: 12 }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: axisMax,
      interval: Math.max(1, Math.ceil(axisMax / 4)),
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#f8fafc" } },
      axisLabel: {
        color: "#cbd5e1",
        fontSize: 10,
        margin: 12,
        formatter: (value: number) => `${value}%`
      }
    },
    series: [
      {
        data: claimsTrend.values,
        type: "line",
        smooth: 0.4,
        symbol: "circle",
        symbolSize: 8,
        itemStyle: { color, borderColor: "#fff", borderWidth: 2 },
        lineStyle: {
          width: 3,
          color,
          shadowColor: `${color}55`,
          shadowBlur: 8,
          shadowOffsetY: 4
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${color}40` },
              { offset: 1, color: `${color}00` }
            ]
          }
        }
      }
    ]
  };
}

function getInitials(label: string) {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
