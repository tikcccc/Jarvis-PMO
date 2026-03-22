"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  History,
  RefreshCw,
  ShieldCheck,
  Target
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TabButton } from "@/components/ui/tab-button";
import { getIcon } from "@/lib/icons";
import { requirementRecords, requirementSummaryCards } from "@/lib/mock-data/requirements";
import type { RequirementRecord, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

type RequirementTab = "attributes" | "traceability" | "history";

const summaryCardStyleMap: Record<Tone, string> = {
  default: "border-gray-200 bg-white",
  info: "border-blue-100 bg-blue-50/30",
  success: "border-emerald-100 bg-emerald-50/30",
  warning: "border-amber-100 bg-amber-50/30",
  danger: "border-rose-100 bg-rose-50/30"
};

const summaryIconStyleMap: Record<Tone, string> = {
  default: "bg-gray-100 text-gray-500",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

const progressBarClassMap: Record<Tone, string> = {
  default: "bg-gray-400",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  danger: "bg-rose-500"
};

const workbenchIconStyleMap: Record<Tone, string> = {
  default: "bg-gray-100 text-gray-500",
  info: "bg-blue-100 text-blue-600",
  success: "bg-emerald-100 text-emerald-600",
  warning: "bg-amber-100 text-amber-600",
  danger: "bg-rose-100 text-rose-600"
};

const historyDotClassMap: Record<RequirementRecord["history"][number]["type"], string> = {
  baseline: "bg-blue-500",
  review: "bg-amber-400",
  drift: "bg-rose-500"
};

const traceabilityToneClassMap: Record<Tone, string> = {
  default: "border-gray-200 bg-gray-50/80 text-gray-500",
  info: "border-blue-100 bg-blue-50/70 text-blue-600",
  success: "border-emerald-100 bg-emerald-50/70 text-emerald-600",
  warning: "border-amber-100 bg-amber-50/70 text-amber-600",
  danger: "border-rose-100 bg-rose-50/70 text-rose-600"
};

const stripToneClassMap: Record<Tone, string> = {
  default: "border-b border-gray-100 bg-gray-50/70",
  info: "border-b border-blue-100 bg-blue-50/60",
  success: "border-b border-emerald-100 bg-emerald-50/60",
  warning: "border-b border-amber-100 bg-amber-50/70",
  danger: "border-b border-slate-900 bg-slate-950"
};

const stripTitleToneClassMap: Record<Tone, string> = {
  default: "text-gray-700",
  info: "text-blue-700",
  success: "text-emerald-700",
  warning: "text-amber-700",
  danger: "text-rose-300"
};

const stripCopyToneClassMap: Record<Tone, string> = {
  default: "text-gray-600",
  info: "text-blue-700/80",
  success: "text-emerald-700/80",
  warning: "text-amber-700/80",
  danger: "text-slate-300"
};

const stripChipToneClassMap: Record<Tone, string> = {
  default: "border-gray-200 bg-white text-gray-700",
  info: "border-blue-100 bg-white/80 text-blue-700",
  success: "border-emerald-100 bg-white/80 text-emerald-700",
  warning: "border-amber-100 bg-white/80 text-amber-700",
  danger: "border-white/10 bg-black/30 text-white"
};

const requirementTabs: Array<{ id: RequirementTab; label: string; icon: typeof Database }> = [
  { id: "attributes", label: "Evidence", icon: Database },
  { id: "traceability", label: "Linkage", icon: GitBranch },
  { id: "history", label: "Audit", icon: History }
];

function getSelectedRequirement(requirementId: string) {
  return requirementRecords.find((item) => item.id === requirementId) ?? requirementRecords[0];
}

export function RequirementsPage() {
  const defaultRequirementId = requirementRecords.find((item) => item.tone === "danger")?.id ?? requirementRecords[0]?.id ?? "";
  const [activeRequirementId, setActiveRequirementId] = useState(defaultRequirementId);
  const [activeTab, setActiveTab] = useState<RequirementTab>("attributes");
  const activeRequirement = getSelectedRequirement(activeRequirementId);
  const hasRiskAlert = Boolean(activeRequirement.riskAlert);
  const stripTone = hasRiskAlert ? "danger" : activeRequirement.tone;
  const sidecarMessage = hasRiskAlert
    ? "Zone B contamination now conflicts with the feasibility baseline and needs downstream review."
    : activeRequirement.tone === "warning"
      ? "This record is pending PMO review before the next baseline close."
      : "Baseline aligned. No contradiction or escalation is open.";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Project Requirements Management</h2>
            <Badge tone="info">SSOT Master Record</Badge>
          </div>
          <p className="jarvis-page-copy">The Project&apos;s Digital Gene Bank (9 Key Elements)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="md">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Change Requests
          </Button>
          <Button variant="secondary" size="md">
            <History className="w-3.5 h-3.5" />
            Global Audit Logs
          </Button>
          <Button variant="primary" size="md">
            <Activity className="w-3.5 h-3.5" />
            Initiate Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {requirementSummaryCards.map((card) => {
          const Icon = getIcon(card.icon);

          return (
            <Card key={card.id} className={cn("p-4 border-l-4", summaryCardStyleMap[card.tone])}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">{card.label}</p>
                  <p
                    className={cn(
                      "mt-1 text-xl font-bold",
                      card.tone === "danger"
                        ? "text-rose-600"
                        : card.tone === "warning"
                          ? "text-amber-600"
                          : card.tone === "success"
                            ? "text-emerald-600"
                            : card.tone === "info"
                              ? "text-blue-600"
                              : "text-gray-900"
                    )}
                  >
                    {card.value}
                  </p>
                </div>
                <div className={cn("rounded-lg p-2", summaryIconStyleMap[card.tone])}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 xl:h-[760px]">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-500" />
                <h3 className="jarvis-title-md uppercase tracking-tight">Requirements Baseline Workbench</h3>
              </div>
              <p className="jarvis-copy-xs mt-1">Active baseline health, ownership, and requirement drift in one control surface.</p>
            </div>
            <Button variant="subtle" size="sm">
              <RefreshCw className="w-3.5 h-3.5" />
              Sync All Agents
            </Button>
          </div>

          <div className="h-full overflow-x-auto">
            <div className="min-w-[720px]">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-10 border-b border-gray-100 bg-white shadow-sm">
                  <tr className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">
                    <th className="px-6 py-4">Element Name</th>
                    <th className="px-4 py-4">Version</th>
                    <th className="px-4 py-4">Owner</th>
                    <th className="px-4 py-4">Integrity</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {requirementRecords.map((requirement) => {
                    const isActive = requirement.id === activeRequirement.id;
                    const metaLabel = [
                      requirement.syncTimeLabel,
                      `${requirement.relatedModules.length} modules`,
                      requirement.openChangeCount > 0 ? `${requirement.openChangeCount} open CR` : "No open CR"
                    ].join("  •  ");

                    return (
                      <tr
                        key={requirement.id}
                        className={cn(
                          "group cursor-pointer transition-colors",
                          isActive ? "bg-blue-50/40" : "hover:bg-gray-50"
                        )}
                        onClick={() => setActiveRequirementId(requirement.id)}
                      >
                        <td className="relative px-6 py-4">
                          {isActive ? <div className={cn("absolute inset-y-0 left-0 w-1", progressBarClassMap[requirement.tone])} /> : null}
                          <div className="flex items-start gap-3">
                            <div className={cn("mt-0.5 rounded-md p-1.5", workbenchIconStyleMap[requirement.tone])}>
                              <Target className="h-4 w-4" />
                            </div>
                            <div>
                              <p className={cn("text-xs font-bold", isActive ? "text-gray-900" : "text-gray-700")}>{requirement.title}</p>
                              <p className="jarvis-text-10 mt-1 text-gray-400">{metaLabel}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn("jarvis-text-10 rounded border px-2 py-1 font-bold", isActive ? "border-gray-200 bg-white text-gray-700" : "border-transparent bg-gray-100 text-gray-500")}>
                            {requirement.version}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[11px] font-medium text-gray-600">{requirement.owner}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex w-24 items-center gap-2">
                            <span className="jarvis-text-10 w-8 font-bold text-gray-600">{requirement.integrityScore}%</span>
                            <ProgressBar value={requirement.integrityScore} barClassName={progressBarClassMap[requirement.tone]} />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge tone={requirement.tone}>{requirement.statusLabel}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className={cn("px-5 py-3.5", stripToneClassMap[stripTone])}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {hasRiskAlert ? (
                      <AlertTriangle className="h-4 w-4 text-rose-400" />
                    ) : (
                      <ShieldCheck className={cn("h-4 w-4", stripTone === "warning" ? "text-amber-600" : "text-emerald-600")} />
                    )}
                    <h3 className={cn("jarvis-text-10 font-black uppercase tracking-widest", stripTitleToneClassMap[stripTone])}>
                      {hasRiskAlert ? "Baseline Drift Radar" : activeRequirement.tone === "warning" ? "Baseline Review Status" : "Baseline Status"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("jarvis-text-10 font-mono", hasRiskAlert ? "text-slate-400" : "text-gray-500")}>Record: {activeRequirement.version}</span>
                    <span
                      className={cn(
                        "jarvis-text-10 rounded-full border px-2 py-0.5 font-bold uppercase tracking-widest",
                        hasRiskAlert
                          ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
                          : activeRequirement.tone === "warning"
                            ? "border-amber-200 bg-amber-100/80 text-amber-700"
                            : "border-emerald-200 bg-emerald-100/80 text-emerald-700"
                      )}
                    >
                      {hasRiskAlert ? activeRequirement.riskAlert?.severityLabel : activeRequirement.tone === "warning" ? "Review" : "Stable"}
                    </span>
                  </div>
                </div>

                <p className={cn("text-[10.5px] leading-5", stripCopyToneClassMap[stripTone])}>{sidecarMessage}</p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <div className={cn("rounded-lg border px-2.5 py-2", stripChipToneClassMap[stripTone])}>
                      <p className={cn("jarvis-text-10 mb-0.5 font-bold uppercase tracking-widest", hasRiskAlert ? "text-slate-500" : "text-inherit/70")}>
                        {hasRiskAlert ? "Budget Impact" : "Open Changes"}
                      </p>
                      <p className="text-[11px] font-bold">
                        {hasRiskAlert ? activeRequirement.riskAlert?.budgetImpactLabel : activeRequirement.openChangeCount}
                      </p>
                    </div>
                    <div className={cn("rounded-lg border px-2.5 py-2", stripChipToneClassMap[stripTone])}>
                      <p className={cn("jarvis-text-10 mb-0.5 font-bold uppercase tracking-widest", hasRiskAlert ? "text-slate-500" : "text-inherit/70")}>
                        {hasRiskAlert ? "Timeline Impact" : "Linked Modules"}
                      </p>
                      <p className="text-[11px] font-bold">
                        {hasRiskAlert ? activeRequirement.riskAlert?.timelineImpactLabel : activeRequirement.relatedModules.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={hasRiskAlert ? "primary" : "accent"}
                      size="xs"
                      className={cn(
                        "px-3",
                        hasRiskAlert ? "border-rose-600 bg-rose-600 hover:border-rose-500 hover:bg-rose-500" : ""
                      )}
                    >
                      <ArrowRightLeft className="h-3.5 w-3.5" />
                      {hasRiskAlert ? "Open Change Request" : "View Linkage"}
                    </Button>
                    {hasRiskAlert ? (
                      <Button
                        variant="ghost"
                        size="xs"
                        className="border-white/10 bg-white/5 px-3 text-slate-300 hover:bg-white/10 hover:text-white"
                      >
                        Dismiss
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-100 bg-white px-6 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="jarvis-title-md uppercase tracking-tight">{activeRequirement.title}</h3>
                    <Badge tone={activeRequirement.tone}>{activeRequirement.statusLabel}</Badge>
                  </div>
                  <p className="mt-1 text-[10px] font-medium leading-5 text-gray-500">{activeRequirement.statement}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeRequirement.relatedModules.map((module) => (
                      <span key={module} className="jarvis-text-10 rounded-full border border-gray-200 bg-gray-50 px-2 py-1 font-bold text-gray-600">
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                <Badge tone="default">{activeRequirement.version}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/70 px-2">
              {requirementTabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  active={activeTab === tab.id}
                  className="w-full"
                >
                  <tab.icon className="mr-1.5 h-3.5 w-3.5" />
                  {tab.label}
                </TabButton>
              ))}
            </div>

            <div className="bg-white p-6">
              {activeTab === "attributes" ? (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <p className="jarvis-text-10 mb-3 border-b border-gray-50 pb-2 font-bold uppercase tracking-widest text-gray-400">
                      Structured Data Attributes
                    </p>
                    <div className="space-y-3">
                      {activeRequirement.specificFields.map((field) => (
                        <div key={field.label} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                          <span className="jarvis-text-10 font-bold text-gray-500">{field.label}</span>
                          <span className="text-xs font-bold text-gray-900 text-right">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="jarvis-text-10 mb-3 border-b border-gray-50 pb-2 font-bold uppercase tracking-widest text-gray-400">
                      Source Evidence
                    </p>
                    <div className="space-y-2">
                      {activeRequirement.evidence.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="flex w-full items-center gap-3 rounded-md border border-blue-100 bg-blue-50/30 px-3 py-2 text-left transition-colors hover:border-blue-300"
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium text-blue-800">{item.label}</p>
                            <p className="jarvis-text-10 text-blue-500">{item.kind}  •  {item.sourceLabel}</p>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-blue-300" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === "traceability" ? (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <p className="jarvis-text-10 mb-3 border-b border-gray-50 pb-2 font-bold uppercase tracking-widest text-gray-400">
                      Downstream Impact
                    </p>
                    <div className="space-y-3">
                      {activeRequirement.linkages.map((link) => (
                        <div key={link.id} className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <GitBranch className="h-3.5 w-3.5 text-blue-400" />
                              <div>
                                <p className="text-[11px] font-bold text-gray-800">{link.targetLabel}</p>
                                <p className="jarvis-text-10 text-gray-400">{link.targetType === "module" ? "Module" : "Requirement"} dependency</p>
                              </div>
                            </div>
                            <span className={cn("jarvis-text-10 rounded-full border px-2 py-1 font-black uppercase tracking-widest", traceabilityToneClassMap[link.tone])}>
                              {link.impactLabel}
                            </span>
                          </div>
                          <p className="jarvis-copy-xs mt-3 leading-relaxed">{link.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === "history" ? (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="relative ml-3 space-y-6 border-l border-gray-100 pl-5">
                    {activeRequirement.history.map((entry) => (
                      <div key={entry.id} className="relative">
                        <div className={cn("absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm", historyDotClassMap[entry.type])} />
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <span className="text-[10px] font-black text-gray-900">{entry.version}</span>
                          <span className="jarvis-text-10 text-gray-400">{entry.dateLabel}</span>
                        </div>
                        <p className="text-[11px] font-medium leading-relaxed text-gray-700">{entry.action}</p>
                        <span className="jarvis-text-10 mt-1.5 inline-block font-bold uppercase tracking-widest text-gray-400">
                          By: {entry.author}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
