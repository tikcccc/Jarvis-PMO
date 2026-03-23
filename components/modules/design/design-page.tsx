"use client";

import Image from "next/image";
import type { ECharts, EChartsOption } from "echarts";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  BarChart2,
  CheckCircle2,
  DollarSign,
  FileText,
  Hammer,
  Layers,
  Maximize2,
  Minimize2,
  Share2,
  ShieldAlert,
  Split,
  TrendingDown,
  TrendingUp,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import {
  designDfmaNarrative,
  designDfmaSignals,
  designIssueDistribution,
  designIssuesByPackageId,
  designLineageStages,
  designPackages,
  designSuggestions,
  designSummaryMetrics,
  designTradeCostItems,
  designTradeCostTrend
} from "@/lib/mock-data/design";
import type { DesignIssue, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

type DesignBadgeTone = Tone | "purple";

const badgeToneClassMap: Record<DesignBadgeTone, string> = {
  default: "bg-slate-100 text-slate-700",
  info: "bg-blue-50 text-blue-700 border border-blue-200/50",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
  warning: "bg-amber-50 text-amber-700 border border-amber-200/50",
  danger: "bg-rose-50 text-rose-700 border border-rose-200/50",
  purple: "bg-purple-50 text-purple-700 border border-purple-200/50"
};

const summaryIconToneClassMap: Record<Tone, string> = {
  default: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  info: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
  success: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
  warning: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  danger: "bg-rose-50 text-rose-600 ring-1 ring-rose-100"
};

const issueSeverityToneClassMap: Record<DesignIssue["severityLabel"], string> = {
  High: "text-rose-600",
  Medium: "text-amber-600",
  Low: "text-emerald-600"
} as const;

const DESIGN_2D_DRAWING_SRC = "/image/design/2d%20drawing.png";
const DESIGN_3D_BIM_SRC = "/image/design/3d%20bim.jpg";

const trendScaleMin = 90;
const trendScaleMax = 110;
const costTrendOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "#ffffff",
    textStyle: { color: "#0f172a", fontSize: 12 },
    borderColor: "#e2e8f0",
    padding: 10,
    borderRadius: 8,
    formatter: '{b} <br/>Actual: <span style="font-weight:600">${c}M</span> <br/><span style="color:#64748b">Budget: $100M</span>'
  },
  grid: { top: 15, right: 10, bottom: 20, left: 35 },
  xAxis: {
    type: "category",
    data: designTradeCostTrend.map((point) => point.monthLabel),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: "#64748b", fontSize: 10, margin: 8, fontWeight: 500 }
  },
  yAxis: {
    type: "value",
    min: trendScaleMin,
    max: trendScaleMax,
    splitLine: { lineStyle: { color: "#f1f5f9", type: "dashed" } },
    axisLabel: { color: "#94a3b8", fontSize: 10, fontWeight: 500 }
  },
  series: [
    {
      data: designTradeCostTrend.map((point) => ({
        value: point.actualValue,
        itemStyle: {
          color: point.actualValue > point.budgetValue ? "#f43f5e" : "#10b981",
          borderRadius: [3, 3, 0, 0]
        }
      })),
      type: "bar",
      barWidth: "25%",
      emphasis: {
        itemStyle: {
          shadowBlur: 12,
          shadowColor: "rgba(15, 23, 42, 0.12)"
        }
      },
      markLine: {
        data: [{ yAxis: 100, name: "Budget" }],
        lineStyle: { color: "#cbd5e1", type: "dashed", width: 1.5 },
        symbol: "none",
        label: { show: false }
      }
    }
  ]
} satisfies EChartsOption;

function formatTradeValue(value: number, unit: string) {
  return `$${value.toFixed(value % 1 === 0 ? 0 : 1)}${unit}`;
}

function getInitialPackageId() {
  return designPackages[1]?.id ?? designPackages[0]?.id ?? "";
}

function PrototypeCard({ className, ...props }: ComponentPropsWithoutRef<typeof Card>) {
  return <Card className={cn("rounded-2xl border-slate-200/70 shadow-sm transition-all duration-300 hover:shadow-md", className)} {...props} />;
}

function DesignBadge({
  children,
  className,
  tone = "default"
}: {
  children: ReactNode;
  className?: string;
  tone?: DesignBadgeTone;
}) {
  return (
    <span
      className={cn(
        "jarvis-text-10 inline-flex rounded-md px-2.5 py-1 font-semibold uppercase tracking-wider",
        badgeToneClassMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

function DesignViewerSurface({
  selectedIssue
}: {
  selectedIssue: DesignIssue | null;
}) {
  const [viewerMode, setViewerMode] = useState<"2d" | "3d">("2d");
  const [isExpanded, setIsExpanded] = useState(false);
  const viewerSrc = viewerMode === "2d" ? DESIGN_2D_DRAWING_SRC : DESIGN_3D_BIM_SRC;
  const viewerAlt = viewerMode === "2d" ? "2D design coordination drawing" : "3D BIM coordination view";
  const toggleViewerMode = () => setViewerMode((current) => (current === "2d" ? "3d" : "2d"));
  const toggleExpanded = () => setIsExpanded((current) => !current);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const renderViewerCanvas = (expanded: boolean) => (
    <div
      className={cn(
        "overflow-hidden border border-slate-300/70 bg-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.16)]",
        expanded ? "relative h-full w-full rounded-none border-0" : "absolute inset-0 rounded-none border-0 shadow-none"
      )}
    >
      <Image
        src={viewerSrc}
        alt={viewerAlt}
        fill
        sizes={expanded ? "90vw" : "(min-width: 1280px) 66vw, 100vw"}
        className={cn(
          "object-cover object-center transition-transform duration-700 ease-[var(--jarvis-motion-ease-emphasis)] motion-safe:group-hover:scale-[1.03]",
          selectedIssue ? "scale-100 opacity-100" : "scale-[1.02] grayscale-[0.32] opacity-45"
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.06),transparent_30%,rgba(15,23,42,0.14))]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/16 via-transparent to-slate-950/22" />
      <div className="jarvis-viewer-scan pointer-events-none absolute inset-x-[8%] top-[-24%] h-24 bg-gradient-to-b from-transparent via-sky-400/16 to-transparent opacity-60 mix-blend-screen" />

      <div className="absolute right-5 top-5 z-20 flex items-center gap-1 rounded-xl border border-white/14 bg-slate-950/76 p-1 shadow-[0_18px_36px_rgba(15,23,42,0.28)] backdrop-blur-md">
        <button
          type="button"
          onClick={toggleViewerMode}
          className="inline-flex h-7 items-center rounded-lg border border-white/10 bg-white/6 px-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/84 transition-colors hover:bg-white/10 hover:text-white"
        >
          {viewerMode === "2d" ? "View 3D" : "View 2D"}
        </button>
        <IconButton
          variant="surface"
          size="sm"
          onClick={toggleExpanded}
          className="h-7 w-7 border-white/10 bg-white/6 text-white/84 shadow-none hover:border-white/18 hover:bg-white/12 hover:text-white"
        >
          {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </IconButton>
      </div>

    </div>
  );

  return (
    <>
      <div className="group relative flex h-[392px] cursor-zoom-in items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-100">
        {renderViewerCanvas(false)}
      </div>

      {isExpanded ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/46 p-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded design viewer"
          onClick={toggleExpanded}
        >
          <div className="group relative h-full max-h-[84vh] w-full max-w-[1380px]" onClick={(event) => event.stopPropagation()}>
            {renderViewerCanvas(true)}
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DesignPage() {
  const [activePackageId, setActivePackageId] = useState(getInitialPackageId);
  const [selectedIssueId, setSelectedIssueId] = useState(() => (designIssuesByPackageId[getInitialPackageId()] ?? [])[0]?.id ?? "");
  const currentIssues = designIssuesByPackageId[activePackageId] ?? [];
  const selectedIssue = currentIssues.find((issue) => issue.id === selectedIssueId) ?? currentIssues[0] ?? null;

  const handlePackageChange = (packageId: string) => {
    setActivePackageId(packageId);
    setSelectedIssueId((designIssuesByPackageId[packageId] ?? [])[0]?.id ?? "");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-1.5 flex items-center space-x-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Project Design Management</h2>
            <DesignBadge tone="info">SSOT BIM-Cost Sync</DesignBadge>
          </div>
          <p className="text-xs font-medium text-slate-500">
            Real-time Model Health, Specification Consistency &amp; Design-to-Quantity Extraction
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="secondary" size="sm" className="shadow-sm">
            <FileText className="mr-2 h-4 w-4 text-slate-400" />
            AUDIT LOGS
          </Button>
          <Button variant="primary" size="sm" className="shadow-md shadow-slate-900/10">
            <Activity className="mr-2 h-4 w-4 text-blue-400" />
            INITIATE AGENT
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {designSummaryMetrics.map((metric) => {
          const Icon = getIcon(metric.icon);

          return (
            <PrototypeCard key={metric.id} className="group flex flex-col justify-between p-5">
              <div className="flex items-start justify-between">
              <div className={cn("rounded-lg p-2 transition-transform group-hover:scale-105", summaryIconToneClassMap[metric.tone])}>
                  <Icon className="h-4 w-4" />
                </div>
                <DesignBadge tone={metric.tone}>{metric.statusLabel}</DesignBadge>
              </div>
              <div className="mt-4">
                <p className="jarvis-text-10 mb-1.5 leading-none font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </div>
            </PrototypeCard>
          );
        })}
      </div>

      <PrototypeCard className="flex flex-col space-y-5 bg-gradient-to-r from-white to-slate-50/50 px-6 py-5">
        <div className="flex items-center justify-between border-b border-slate-100/50 pb-2">
          <div>
            <div className="mb-1.5 flex items-center space-x-2.5">
              <div className="rounded bg-slate-100 p-1">
                <Share2 className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <h3 className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-800">Design Lineage (SSOT)</h3>
            </div>
            <p className="jarvis-text-10 font-medium text-slate-500">Approved drawing lineage from master plan to construction release.</p>
          </div>
          <Button
            variant="ghost"
            size="inline"
            className="hidden border-0 bg-transparent text-blue-600 shadow-none hover:bg-transparent hover:text-blue-800 sm:inline-flex"
          >
            View Full History
          </Button>
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-2 sm:px-12">
          <div className="absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 border-t border-dashed border-slate-300 bg-slate-200 sm:left-14 sm:right-14" />

          {designLineageStages.map((stage) => {
            const Icon = getIcon(stage.icon);
            const isActive = stage.statusLabel === "Active";
            const isApproved = stage.statusLabel === "Approved";

            return (
              <div key={stage.id} className="group relative z-10 flex w-24 cursor-pointer flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm transition-all duration-300",
                    isActive
                      ? "scale-110 bg-blue-600 text-white ring-[3px] ring-blue-50"
                      : isApproved
                        ? "bg-emerald-500 text-white hover:scale-105"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="mt-2.5 text-center">
                  <p className={cn("jarvis-text-10 whitespace-nowrap font-bold uppercase tracking-wider transition-colors", isActive ? "text-blue-600" : "text-slate-700")}>
                    {stage.stage}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap text-[9px] font-medium text-slate-400">{stage.dateLabel}</p>
                </div>

                <div className="pointer-events-none absolute -top-10 rounded-md bg-slate-900 px-2.5 py-1 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <span className="whitespace-nowrap text-[9px] font-semibold tracking-wide">View Record</span>
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
                </div>
              </div>
            );
          })}
        </div>
      </PrototypeCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PrototypeCard className="flex h-full flex-col overflow-hidden border-slate-200/80 shadow-md">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="rounded border border-slate-100 bg-white p-1 shadow-sm">
                    <Layers className="h-3.5 w-3.5 text-slate-600" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Design Control Surface</h3>
                </div>
              </div>

              <div className="no-scrollbar flex overflow-x-auto rounded-lg border border-slate-200/50 bg-slate-200/60 p-1">
                {designPackages.map((pkg) => {
                  const isActive = pkg.id === activePackageId;

                  return (
                    <Button
                      key={pkg.id}
                      onClick={() => handlePackageChange(pkg.id)}
                      variant={isActive ? "secondary" : "ghost"}
                      size="xs"
                      className={cn(
                        "shrink-0 rounded-md px-3",
                        isActive
                          ? "border-slate-200 bg-white text-blue-700 shadow-sm"
                          : "border-transparent bg-transparent text-slate-500 hover:bg-slate-200/50 hover:text-slate-800"
                      )}
                    >
                      {pkg.name}
                      {pkg.tone === "danger" ? (
                        <span className="ml-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                      ) : null}
                    </Button>
                  );
                })}
              </div>
            </div>

            <DesignViewerSurface selectedIssue={selectedIssue} />

            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-white px-5 py-3 md:flex-row md:items-center">
              <div className="flex items-center space-x-2">
                <div className="rounded bg-slate-50 p-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-slate-500" />
                </div>
                <h4 className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-800">Active Issue Matrix</h4>
              </div>

              <div className="rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-2 shadow-sm">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {designIssueDistribution.map((bucket) => (
                    <div key={bucket.id} className="jarvis-text-10 flex items-center font-semibold" style={{ color: bucket.colorHex }}>
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full shadow-sm" style={{ backgroundColor: bucket.colorHex }} />
                      {bucket.label} ({bucket.count})
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead className="jarvis-text-10 border-b border-slate-200 bg-slate-50/50 font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 whitespace-nowrap">Issue ID</th>
                    <th className="px-5 py-3 whitespace-nowrap">Type</th>
                    <th className="px-5 py-3 whitespace-nowrap">Trade &amp; Location</th>
                    <th className="px-5 py-3 whitespace-nowrap">Severity</th>
                    <th className="px-5 py-3 text-right whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentIssues.length > 0 ? (
                    currentIssues.map((issue) => {
                      const isSelected = selectedIssue?.id === issue.id;

                      return (
                        <tr
                          key={issue.id}
                          onClick={() => setSelectedIssueId(issue.id)}
                          className={cn("cursor-pointer transition-colors duration-200", isSelected ? "bg-blue-50/60" : "hover:bg-slate-50")}
                        >
                          <td className="px-5 py-3.5 text-xs font-semibold text-slate-900">{issue.id}</td>
                          <td className="px-5 py-3.5">
                            <DesignBadge
                              tone={
                                issue.typeLabel === "Clash"
                                  ? "danger"
                                  : issue.typeLabel === "Spec Mismatch"
                                    ? "warning"
                                    : issue.typeLabel === "Missing Info"
                                      ? "purple"
                                      : "default"
                              }
                              className="px-2 py-0.5 font-bold"
                            >
                              {issue.typeLabel}
                            </DesignBadge>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="mb-0.5 text-xs font-medium text-slate-900">{issue.trade}</p>
                            <p className="jarvis-text-10 text-slate-500">{issue.area}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={cn("jarvis-text-10 font-bold uppercase tracking-wider", issueSeverityToneClassMap[issue.severityLabel])}>{issue.severityLabel}</span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span className="jarvis-text-10 font-semibold text-slate-500">{issue.statusLabel}</span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                        No active issues detected in this package.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </PrototypeCard>
        </div>

        <div className="flex h-full flex-col gap-6">
          <PrototypeCard className="shrink-0 p-5">
            <div className="mb-4 flex items-center border-b border-slate-100 pb-3">
              <div className="mr-2 rounded bg-blue-50 p-1">
                <Split className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Issue Deep Dive</h3>
            </div>

            {selectedIssue ? (
              <IssueDetail issue={selectedIssue} />
            ) : (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-200" />
                <p className="text-xs font-medium text-slate-400">Select an issue from the matrix to view details.</p>
              </div>
            )}
          </PrototypeCard>

          <PrototypeCard className="shrink-0 border-amber-100/50 bg-gradient-to-b from-white to-amber-50/20 p-5">
            <div className="mb-4 flex items-center border-b border-slate-100 pb-3">
              <div className="mr-2 rounded bg-amber-50 p-1">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">AI Design Suggestions</h3>
            </div>

            <div className="space-y-3">
              {designSuggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
            </div>
          </PrototypeCard>

          <PrototypeCard className="relative flex flex-1 flex-col justify-between overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-md">
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-600/20 blur-[30px]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-4 flex shrink-0 items-center space-x-2 border-b border-slate-700/50 pb-3">
                <div className="rounded-md border border-blue-500/30 bg-blue-500/20 p-1">
                  <Hammer className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <h3 className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-100">DfMA Constructability</h3>
              </div>

              <div className="flex flex-1 flex-col justify-center space-y-4">
                {designDfmaSignals.map((signal) => (
                  <div key={signal.id}>
                    <div className="jarvis-text-10 mb-1.5 flex justify-between font-semibold uppercase tracking-wider">
                      <span className="text-slate-400">{signal.label}</span>
                      <span className={signal.tone === "success" ? "font-bold text-emerald-400" : "font-bold text-amber-400"}>{signal.valueLabel}</span>
                    </div>
                    <ProgressBar
                      value={signal.progressPercent}
                      className="h-1.5 rounded-full border border-slate-700 bg-slate-800"
                      barClassName={signal.tone === "success" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-auto shrink-0 pt-4">
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-3 backdrop-blur-sm">
                  <p className="jarvis-text-10 leading-relaxed font-medium italic text-slate-300">&quot;{designDfmaNarrative}&quot;</p>
                </div>
              </div>
            </div>
          </PrototypeCard>
        </div>
      </div>

      <div className="mt-6">
        <PrototypeCard className="p-6">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
            <div className="flex-1 border-b border-slate-100 pb-6 xl:border-r xl:border-b-0 xl:pr-8 xl:pb-0">
              <div className="mb-5 flex h-8 items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 rounded bg-emerald-50 p-1">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Trade Cost Extractor</h3>
                </div>
                <DesignBadge tone="info">LIVE SYNC</DesignBadge>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span className="jarvis-text-10 flex items-center font-semibold uppercase tracking-widest text-slate-500">
                  <BarChart2 className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                  6-Month Cost Deviation Trend
                </span>
              </div>

              <CostTrendChart />
            </div>

            <div className="flex flex-col xl:w-[45%]">
              <div className="mb-5 hidden h-8 items-center xl:flex">
                <h4 className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-500">Real-time Package Cost Sync</h4>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:grid-cols-1">
                {designTradeCostItems.map((trade) => {
                  const ratio = Math.min((trade.extractedValue / trade.budgetValue) * 100, 100);
                  const deltaPercent = Math.abs(((trade.extractedValue - trade.budgetValue) / trade.budgetValue) * 100).toFixed(1);

                  return (
                    <div key={trade.id} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                      <div className="flex items-end justify-between">
                        <p className="text-xs font-semibold text-slate-800">{trade.trade}</p>
                        <div className="text-right">
                          <p className={cn("text-sm font-bold", trade.status === "over" ? "text-rose-600" : "text-emerald-600")}>
                            {formatTradeValue(trade.extractedValue, trade.unit)}
                          </p>
                        </div>
                      </div>

                      <ProgressBar
                        value={`${ratio}%`}
                        className="relative h-1.5 rounded-full bg-slate-200/60"
                        barClassName={trade.status === "over" ? "bg-rose-500" : "bg-emerald-500"}
                      />

                      <div className="jarvis-text-10 flex justify-between font-semibold uppercase tracking-wider">
                        <span className="text-slate-500">BGT: {formatTradeValue(trade.budgetValue, trade.unit)}</span>
                        {trade.status === "over" ? (
                          <span className="flex items-center text-rose-600">
                            <TrendingUp className="mr-0.5 h-2.5 w-2.5" />+{deltaPercent}%
                          </span>
                        ) : null}
                        {trade.status === "under" ? (
                          <span className="flex items-center text-emerald-600">
                            <TrendingDown className="mr-0.5 h-2.5 w-2.5" />-{deltaPercent}%
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </PrototypeCard>
      </div>
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: typeof designSuggestions[number] }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-amber-200 hover:shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded border border-amber-100/50 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
          {suggestion.typeLabel}
        </span>
        <span className="jarvis-text-10 font-semibold text-slate-400">{suggestion.statusLabel}</span>
      </div>
      <p className="mb-3 text-xs leading-relaxed font-medium text-slate-700">{suggestion.description}</p>
      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Est. Savings</span>
        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-600">{suggestion.savingsLabel}</span>
      </div>
    </div>
  );
}

function IssueDetail({ issue }: { issue: DesignIssue }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-start justify-between">
        <div>
          <span className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-400">{issue.id}</span>
          <h4 className="mt-1 text-sm font-bold text-slate-900">{issue.typeLabel} Exception</h4>
        </div>
        <DesignBadge tone={issue.severityLabel === "High" ? "danger" : "warning"}>{issue.severityLabel}</DesignBadge>
      </div>

      <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-xs leading-relaxed font-medium text-slate-700">{issue.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400">Location</p>
          <p className="jarvis-text-11 truncate font-semibold text-slate-900">{issue.area}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400">Spec Ref</p>
          <p className="jarvis-text-11 truncate font-semibold text-slate-900">{issue.specReference}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2.5 pt-1 sm:flex-row sm:space-y-0 sm:space-x-2.5">
        <Button variant="subtle" size="sm" className="flex-1 shadow-sm">
          Assign RFI
        </Button>
        <Button variant="secondary" size="sm" className="flex-1 shadow-sm">
          View in 3D
        </Button>
      </div>
    </div>
  );
}

function CostTrendChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let chart: ECharts | undefined;
    let isMounted = true;

    const handleResize = () => {
      chart?.resize();
    };

    async function initChart() {
      const echarts = await import("echarts");

      if (!isMounted || !chartRef.current) {
        return;
      }

      chart = echarts.getInstanceByDom(chartRef.current) ?? echarts.init(chartRef.current);
      chart.setOption(costTrendOption, true);
      window.addEventListener("resize", handleResize);
    }

    void initChart();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      chart?.dispose();
    };
  }, []);

  return <div ref={chartRef} className="h-[220px] w-full" />;
}
