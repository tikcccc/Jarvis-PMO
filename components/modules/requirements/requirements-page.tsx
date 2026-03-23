"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRightLeft,
  CheckCircle2,
  ChevronRight,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  History,
  LayoutDashboard,
  LayoutGrid,
  List,
  Radio,
  Target
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { requirementRecords } from "@/lib/mock-data/requirements";
import type { RequirementHistoryEntry, RequirementRecord, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

type RequirementViewMode = "map" | "list";

const toneAccentClassMap: Record<Tone, string> = {
  default: "bg-slate-400",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  danger: "bg-rose-500"
};

const toneSurfaceClassMap: Record<Tone, string> = {
  default: "border-slate-200 bg-slate-50/70 text-slate-600",
  info: "border-blue-100 bg-blue-50 text-blue-600",
  success: "border-emerald-100 bg-emerald-50 text-emerald-600",
  warning: "border-amber-100 bg-amber-50 text-amber-600",
  danger: "border-rose-100 bg-rose-50 text-rose-600"
};

const toneBorderClassMap: Record<Tone, string> = {
  default: "border-gray-200 hover:border-blue-300 hover:shadow-blue-50/50",
  info: "border-blue-100 hover:border-blue-300 hover:shadow-blue-50/50",
  success: "border-gray-200 hover:border-blue-300 hover:shadow-blue-50/50",
  warning: "border-amber-200 hover:border-amber-400 hover:shadow-amber-100/60",
  danger: "border-rose-200 hover:border-rose-400 hover:shadow-rose-100/60"
};

const toneIconClassMap: Record<Tone, string> = {
  default: "bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600",
  info: "bg-blue-50 text-blue-600",
  success: "bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600",
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

const timelineDotClassMap: Record<RequirementHistoryEntry["type"], string> = {
  baseline: "bg-blue-500",
  review: "bg-amber-400",
  drift: "bg-rose-500"
};

function getRequirementById(requirementId: string) {
  return requirementRecords.find((item) => item.id === requirementId) ?? requirementRecords[0];
}

function getBaselineIntegrityLabel() {
  if (!requirementRecords.length) {
    return "0.0%";
  }

  const averageIntegrity =
    requirementRecords.reduce((total, record) => total + record.integrityScore, 0) / requirementRecords.length;

  return `${averageIntegrity.toFixed(1)}%`;
}

function getRequirementStateLabel(record: RequirementRecord) {
  if (record.riskAlert || record.tone === "danger") {
    return "Drift";
  }

  if (record.tone === "warning") {
    return "Review";
  }

  return "Aligned";
}

function getRequirementStateTone(record: RequirementRecord): Tone {
  if (record.riskAlert || record.tone === "danger") {
    return "danger";
  }

  if (record.tone === "warning") {
    return "warning";
  }

  return "success";
}

function buildRadarRecords() {
  const criticalRecords = requirementRecords.filter((record) => record.riskAlert || record.tone === "danger");
  const secondaryRecords = requirementRecords.filter(
    (record) =>
      !criticalRecords.some((criticalRecord) => criticalRecord.id === record.id) &&
      (record.tone === "warning" || record.openChangeCount > 0)
  );

  return [...criticalRecords, ...secondaryRecords].slice(0, 2);
}

function RequirementsOverview({
  onOpenRequirement
}: {
  onOpenRequirement: (requirementId: string) => void;
}) {
  const [viewMode, setViewMode] = useState<RequirementViewMode>("map");

  const baselineIntegrityLabel = getBaselineIntegrityLabel();
  const driftCount = requirementRecords.filter((record) => record.riskAlert || record.tone === "danger").length;
  const pendingReviewCount = requirementRecords.filter((record) => record.tone === "warning").length;
  const radarRecords = buildRadarRecords();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span className="flex items-center">
          <LayoutDashboard className="mr-1 h-3 w-3" />
          Command Modules
        </span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900">Requirements Overview</span>
      </div>

      <Card
        variant="emphasis"
        className="flex flex-col items-start justify-between gap-4 overflow-hidden border-none bg-slate-950 px-4 py-4 shadow-lg shadow-slate-200/50 md:flex-row md:items-center"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-3 border-white/0 md:border-r md:border-r-slate-700 md:pr-6">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <Database className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-400">Baseline Integrity</p>
              <p className="text-xl font-black text-white">{baselineIntegrityLabel}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-400">Open Drifts</p>
              <div className="mt-0.5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-500 motion-safe:animate-pulse" />
                <p className="text-sm font-bold text-rose-400">{driftCount} Critical</p>
              </div>
            </div>
            <div>
              <p className="jarvis-text-10 font-bold uppercase tracking-widest text-slate-400">Pending Review</p>
              <p className="mt-0.5 text-sm font-bold text-amber-400">{pendingReviewCount} Records</p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="border border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          <History className="h-3.5 w-3.5" />
          Audit Logs
        </Button>
      </Card>

      <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Radio
                className={cn("h-4 w-4", driftCount > 0 ? "text-rose-500 motion-safe:animate-pulse" : "text-gray-400")}
              />
              <h3 className="jarvis-control-label text-gray-900">Global Drift Radar</h3>
            </div>
            <p className="jarvis-copy-xs mt-1 pl-6">Top active cross-module propagation signals under the current baseline.</p>
          </div>

          {driftCount > 0 ? (
            <span className="relative ml-6 flex h-2 w-2 md:ml-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
          ) : null}
        </div>

        <div className="bg-[#FAFAFA] p-5">
          <p className="jarvis-text-10 mb-4 font-bold uppercase tracking-widest text-gray-400">Active Impact Propagation</p>

          {radarRecords.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {radarRecords.map((record) => {
                const stateTone = getRequirementStateTone(record);

                return (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => onOpenRequirement(record.id)}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-lg border bg-white p-4 text-left shadow-sm transition-all hover:shadow-md",
                      stateTone === "danger" ? "border-rose-200 hover:border-rose-400" : "border-amber-200 hover:border-amber-400"
                    )}
                  >
                    <div className={cn("absolute top-0 left-0 h-full w-1", toneAccentClassMap[stateTone])} />

                    <div className="mb-2.5 flex items-start justify-between gap-3">
                      <span className={cn("jarvis-control-label-compact flex items-center", toneTextClassMap[stateTone])}>
                        {stateTone === "danger" ? (
                          <AlertTriangle className="mr-1.5 h-3 w-3" />
                        ) : (
                          <AlertCircle className="mr-1.5 h-3 w-3" />
                        )}
                        {record.title}
                      </span>
                      <span className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">
                        {record.syncTimeLabel}
                      </span>
                    </div>

                    <p className="text-xs leading-snug font-bold text-gray-800">{record.riskAlert?.message ?? record.statement}</p>

                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                      {record.linkages.slice(0, 2).map((link) => (
                        <div
                          key={link.id}
                          className={cn(
                            "flex items-center justify-between rounded-md border px-2 py-1.5",
                            toneSurfaceClassMap[link.tone]
                          )}
                        >
                          <span className="jarvis-control-label-compact flex items-center">
                            <ArrowRightLeft className="mr-1.5 h-3 w-3" />
                            {link.targetLabel}
                          </span>
                          <span className="jarvis-text-10 font-bold">{link.impactLabel}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-200 bg-white px-4 py-6 text-center">
              <p className="text-sm font-bold text-gray-700">No active propagation signals</p>
              <p className="jarvis-copy-xs mt-1">All requirement domains are currently aligned with the baseline.</p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm md:flex-row md:items-center">
          <div className="pl-2">
            <h3 className="text-sm font-black uppercase tracking-tight text-gray-900">Digital Gene Bank (9 Key Elements)</h3>
            <p className="jarvis-copy-xs mt-0.5">Select an element to view detailed SSOT records and agent activity.</p>
          </div>

          <div className="flex items-center rounded-lg border border-gray-200/60 bg-gray-100/80 p-1">
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={cn(
                "jarvis-control-label-compact inline-flex items-center rounded-md px-4 py-1.5 transition-all",
                viewMode === "map" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <LayoutGrid className="mr-1.5 h-3.5 w-3.5" />
              Map
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "jarvis-control-label-compact inline-flex items-center rounded-md px-4 py-1.5 transition-all",
                viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <List className="mr-1.5 h-3.5 w-3.5" />
              List
            </button>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {requirementRecords.map((record) => {
              const stateTone = getRequirementStateTone(record);

              return (
                <Card
                  key={record.id}
                  onClick={() => onOpenRequirement(record.id)}
                  className={cn(
                    "group relative flex cursor-pointer flex-col overflow-hidden border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    toneBorderClassMap[stateTone]
                  )}
                >
                  <div className={cn("absolute top-0 left-0 h-1 w-full", toneAccentClassMap[stateTone])} />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={cn("rounded-lg p-2.5 transition-colors", toneIconClassMap[stateTone])}>
                        <Target className="h-4 w-4" />
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <Badge tone={stateTone} className="shadow-sm">
                          {record.version}
                        </Badge>
                        {stateTone === "danger" ? (
                          <span className="jarvis-text-10 flex items-center font-black uppercase tracking-widest text-rose-500 motion-safe:animate-pulse">
                            <AlertTriangle className="mr-1 h-2.5 w-2.5" />
                            Drift
                          </span>
                        ) : stateTone === "warning" ? (
                          <span className="jarvis-text-10 flex items-center font-black uppercase tracking-widest text-amber-500">
                            <AlertCircle className="mr-1 h-2.5 w-2.5" />
                            Review
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <h4 className="text-base leading-tight font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {record.title}
                    </h4>
                    <p className="mt-2 min-h-[2.75rem] text-[11px] leading-relaxed text-gray-500">{record.statement}</p>

                    <div className="mt-auto pt-4">
                      <div className="jarvis-text-10 mb-1.5 flex justify-between font-bold uppercase tracking-widest">
                        <span className="text-gray-400">Data Integrity</span>
                        <span className={toneTextClassMap[stateTone]}>{record.integrityScore}%</span>
                      </div>
                      <ProgressBar value={record.integrityScore} barClassName={toneAccentClassMap[stateTone]} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-5 py-3 transition-colors group-hover:bg-blue-50/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-[9px] font-black text-gray-700 shadow-sm">
                        {record.owner.charAt(0)}
                      </div>
                      <span className="jarvis-text-11 font-bold text-gray-600">{record.owner}</span>
                    </div>

                    <div className="jarvis-text-10 flex items-center font-bold text-gray-400 transition-colors group-hover:text-blue-600">
                      <GitBranch className="mr-1.5 h-3.5 w-3.5" />
                      {record.relatedModules.length} Nodes
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="overflow-hidden border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-4 py-3">Element</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Version</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Linked Impact</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requirementRecords.map((record) => {
                  const stateTone = getRequirementStateTone(record);

                  return (
                    <tr
                      key={record.id}
                      onClick={() => onOpenRequirement(record.id)}
                      className="cursor-pointer transition-colors hover:bg-blue-50/30"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={cn("h-1.5 w-1.5 rounded-full", toneAccentClassMap[stateTone])} />
                          <span className="text-xs font-bold text-gray-900">{record.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("jarvis-text-10 flex items-center font-bold", toneTextClassMap[stateTone])}>
                          {stateTone === "danger" ? (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          ) : stateTone === "warning" ? (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                          )}
                          {getRequirementStateLabel(record)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-600">{record.version}</td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-600">{record.owner}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {record.relatedModules.slice(0, 3).map((moduleName) => (
                            <span key={moduleName} className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
                              {moduleName}
                            </span>
                          ))}
                          {record.relatedModules.length > 3 ? (
                            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
                              +{record.relatedModules.length - 3}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="jarvis-control-label-compact text-blue-600">View Details</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}

function RequirementDetailView({
  requirement,
  onBack
}: {
  requirement: RequirementRecord;
  onBack: () => void;
}) {
  const stateTone = getRequirementStateTone(requirement);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button type="button" onClick={onBack} className="flex items-center transition-colors hover:text-blue-600">
            <LayoutDashboard className="mr-1 h-3 w-3" />
            Modules
          </button>
          <ChevronRight className="h-3 w-3" />
          <button type="button" onClick={onBack} className="transition-colors hover:text-blue-600">
            Requirements
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900">{requirement.title}</span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center text-xs font-bold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Overview
        </button>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className={cn("rounded-lg p-2", toneSurfaceClassMap[stateTone])}>
              <Database className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{requirement.title} Dossier</h2>
            <Badge tone={stateTone}>{requirement.version}</Badge>
          </div>
          <p className="ml-12 max-w-2xl text-sm leading-relaxed text-gray-500">
            SSOT baseline record governing this specific requirement domain. Actively monitored by Jarvis Recording
            Agents for cross-module consistency.
          </p>
        </div>

        <Button variant="subtle" size="sm" className="px-4">
          <ExternalLink className="h-3.5 w-3.5" />
          Open Raw JSON Record
        </Button>
      </div>

      {requirement.riskAlert || stateTone === "danger" ? (
        <div className="flex items-start gap-3 rounded-r-xl border-l-4 border-rose-500 bg-rose-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-500" />
          <div>
            <h4 className="jarvis-control-label text-rose-800">Active Drift Detected</h4>
            <p className="mt-1 text-sm font-medium text-rose-700">
              {requirement.riskAlert?.message ?? requirement.statement}
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col gap-8 p-6 lg:col-span-2">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="jarvis-control-label text-gray-400">Captured Domain Data</h3>
              <Badge tone="info">SSOT Synchronized</Badge>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {requirement.specificFields.map((field) => (
                <div key={field.label} className="rounded-xl border border-gray-100/70 bg-gray-50 p-3">
                  <p className="jarvis-text-10 font-bold uppercase tracking-wider text-gray-400">{field.label}</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="jarvis-control-label mb-4 border-b border-gray-100 pb-2 text-gray-400">
              Impact Propagation (Linked Modules)
            </h3>
            <div className="flex flex-wrap gap-2">
              {requirement.linkages.map((link) => (
                <div
                  key={link.id}
                  className={cn(
                    "flex items-center rounded-lg border px-3 py-2",
                    stateTone === "danger" ? "border-rose-100 bg-rose-50 text-rose-700" : "border-gray-200 bg-gray-50 text-gray-700"
                  )}
                >
                  <GitBranch className={cn("mr-2 h-3.5 w-3.5", stateTone === "danger" ? "text-rose-400" : "text-gray-400")} />
                  <span className="text-xs font-bold">{link.targetLabel}</span>
                  <span
                    className={cn(
                      "jarvis-text-10 ml-2 rounded px-1.5 py-0.5 font-black",
                      stateTone === "danger" ? "bg-white text-rose-600" : "bg-white text-gray-500"
                    )}
                  >
                    {link.impactLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="jarvis-control-label text-gray-400">Source Evidence &amp; Metadata</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="group flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:border-blue-200">
                <div className="flex items-center text-xs font-medium text-gray-700">
                  <Database className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  <div className="flex flex-col">
                    <span>{requirement.title.replace(/\s+/g, "_")}_{requirement.version.replace(".", "_")}.json</span>
                    <span className="jarvis-text-10 text-gray-400">Structured Data Payload</span>
                  </div>
                </div>
                <Badge tone="success">Verified</Badge>
              </div>

              {requirement.evidence.map((evidence) => (
                <div
                  key={evidence.id}
                  className="group flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:border-blue-200"
                >
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <FileText className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                    <div className="flex flex-col">
                      <span>{evidence.label}</span>
                      <span className="jarvis-text-10 text-gray-400">
                        {evidence.kind} • {evidence.sourceLabel}
                      </span>
                    </div>
                  </div>
                  <Badge tone="success">Verified</Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="border-gray-100 bg-slate-50 p-6">
          <h3 className="jarvis-control-label mb-6 flex items-center text-gray-400">
            <History className="mr-2 h-4 w-4" />
            Agent Activity &amp; Audit
          </h3>

          <div className="relative space-y-4 before:absolute before:top-0 before:bottom-0 before:left-2.5 before:w-px before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {requirement.history.map((entry) => (
              <div key={entry.id} className="relative pl-8">
                <div
                  className={cn(
                    "absolute top-1 left-0 flex h-5 w-5 items-center justify-center rounded-full border border-white text-white shadow",
                    timelineDotClassMap[entry.type]
                  )}
                >
                  {entry.type === "drift" ? (
                    <AlertTriangle className="h-2.5 w-2.5" />
                  ) : entry.type === "review" ? (
                    <History className="h-2.5 w-2.5" />
                  ) : (
                    <Activity className="h-2.5 w-2.5" />
                  )}
                </div>

                <div
                  className={cn(
                    "rounded-lg border p-3 shadow-sm",
                    entry.type === "drift"
                      ? "border-rose-100 bg-rose-50"
                      : entry.type === "review"
                        ? "border-amber-100 bg-white"
                        : "border-gray-100 bg-white"
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "jarvis-control-label-compact",
                        entry.type === "drift"
                          ? "text-rose-600"
                          : entry.type === "review"
                            ? "text-amber-600"
                            : "text-blue-600"
                      )}
                    >
                      {entry.author}
                    </span>
                    <span className="jarvis-text-10 text-gray-400">{entry.dateLabel}</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-gray-700">{entry.action}</p>
                  <span className="jarvis-text-10 mt-2 inline-flex font-bold uppercase tracking-widest text-gray-400">
                    {entry.version}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" className="mt-6 w-full justify-center">
            View Full Audit Log
          </Button>
        </Card>
      </div>
    </div>
  );
}

export function RequirementsPage() {
  const [detailRequirementId, setDetailRequirementId] = useState<string | null>(null);

  if (detailRequirementId) {
    return <RequirementDetailView requirement={getRequirementById(detailRequirementId)} onBack={() => setDetailRequirementId(null)} />;
  }

  return <RequirementsOverview onOpenRequirement={setDetailRequirementId} />;
}
