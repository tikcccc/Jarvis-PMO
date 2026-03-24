"use client";

import type { ECharts, EChartsOption } from "echarts";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  AlignJustify,
  ArrowLeft,
  Bell,
  Camera,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileArchive,
  FileBarChart,
  FileEdit,
  FileText,
  Filter,
  Fingerprint,
  Folder,
  Inbox,
  Key,
  Layers,
  Lock,
  MapPin,
  Maximize2,
  MessageSquare,
  PieChart,
  Plus,
  RefreshCw,
  Scan,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Users
} from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  qualityCompetencyAlert,
  qualityDailyArchiveStats,
  qualityDailyLogs,
  qualityInspectionDistribution,
  qualityInspectionForms,
  qualityInspectionRegistryStats,
  qualityInspectionStatusSummary,
  qualityLiveFeedItems,
  qualityOverviewMetrics,
  qualityPassRateTrend,
  qualityPendingTasks,
  qualityPersonnelRecords,
  qualityRfiDistribution,
  qualityRfiRecords,
  qualityRfiStatusSummary,
  qualitySupervisionCases
} from "@/lib/mock-data/quality";
import type {
  QualityAiCheck,
  QualityDailyLogRecord,
  QualityInspectionFormRecord,
  QualityLiveFeedItem,
  QualityOverviewMetric,
  QualityPersonnelRecord,
  QualityPassRateTrend,
  QualityRfiRecord,
  QualitySupervisionCase,
  QualityTask,
  Tone
} from "@/lib/types";
import { cn } from "@/lib/utils";

type PrototypeBadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "dark" | "purple";
type QualitySubmoduleId =
  | "Tasks"
  | "MyApprovals"
  | "Processed"
  | "Initiated"
  | "Overview"
  | "Supervision"
  | "Biometric"
  | "RFI"
  | "InspectionForms"
  | "SiteDaily";

type QualitySidebarItem =
  | { type: "search"; placeholder: string }
  | { type: "title"; label: string }
  | { type: "spacer" }
  | { type: "group"; label: string }
  | { type: "link"; id: QualitySubmoduleId; label: string; icon: LucideIcon; badge?: string; isChild?: boolean };

const prototypeBadgeClassMap: Record<PrototypeBadgeVariant, string> = {
  default: "border border-gray-200 bg-gray-100 text-gray-700",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
  danger: "border border-rose-200 bg-rose-50 text-rose-700",
  info: "border border-blue-200 bg-blue-50 text-blue-700",
  dark: "border border-slate-700 bg-slate-800 text-slate-100",
  purple: "border border-purple-200 bg-purple-50 text-purple-700"
};

const qualitySubmenuItems: QualitySidebarItem[] = [
  { type: "search", placeholder: "Search DWSS logs..." },
  { type: "title", label: "Process Center" },
  { type: "link", id: "Tasks", label: "Pending Inspections", icon: Inbox, badge: "3" },
  { type: "link", id: "MyApprovals", label: "My Approvals", icon: CheckSquare, badge: "2" },
  { type: "link", id: "Processed", label: "Processed", icon: Send },
  { type: "link", id: "Initiated", label: "Initiated by Me", icon: FileEdit },
  { type: "spacer" },
  { type: "title", label: "Jarvis DWSS Core" },
  { type: "link", id: "Overview", label: "Quality Overview", icon: PieChart },
  { type: "link", id: "Supervision", label: "Work Supervision", icon: ClipboardCheck },
  { type: "link", id: "Biometric", label: "Biometric Control", icon: Fingerprint, badge: "1" },
  { type: "link", id: "RFI", label: "Dynamic RFI Tracking", icon: MessageSquare, badge: "1" },
  { type: "group", label: "Digital Registries" },
  { type: "link", id: "InspectionForms", label: "Inspection Forms", icon: FileBarChart, isChild: true },
  { type: "group", label: "Automated Logs" },
  { type: "link", id: "SiteDaily", label: "Smart Site Daily", icon: FileArchive, isChild: true }
];

const liveFeedIconMap: Record<QualityLiveFeedItem["icon"], LucideIcon> = {
  checkCircle2: CheckCircle2,
  shieldAlert: ShieldAlert,
  messageSquare: MessageSquare,
  camera: Camera
};

function PrototypeBadge({
  children,
  variant = "default",
  className
}: {
  children: React.ReactNode;
  variant?: PrototypeBadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        prototypeBadgeClassMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

function toneToPrototypeVariant(tone: Tone): PrototypeBadgeVariant {
  if (tone === "success") {
    return "success";
  }

  if (tone === "warning") {
    return "warning";
  }

  if (tone === "danger") {
    return "danger";
  }

  if (tone === "info") {
    return "info";
  }

  return "default";
}

function QualityPassRateChart({ trend }: { trend: QualityPassRateTrend }) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<ECharts | null>(null);

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

      const option: EChartsOption = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#E5E7EB",
          textStyle: { color: "#374151", fontSize: 12 }
        },
        legend: {
          data: ["First-Time Pass Rate", "Defect Rectification Rate"],
          bottom: 0,
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: { fontSize: 10, color: "#6B7280", fontWeight: "bold" }
        },
        grid: { left: "3%", right: "4%", bottom: "15%", top: "10%", containLabel: true },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: trend.labels,
          axisLabel: { fontSize: 10, color: "#9CA3AF" },
          axisLine: { lineStyle: { color: "#E5E7EB" } }
        },
        yAxis: {
          type: "value",
          max: 100,
          min: 60,
          axisLabel: { formatter: "{value}%", fontSize: 10, color: "#9CA3AF" },
          splitLine: { lineStyle: { type: "dashed", color: "#F3F4F6" } }
        },
        series: [
          {
            name: "First-Time Pass Rate",
            type: "line",
            smooth: true,
            data: trend.firstPassRate,
            itemStyle: { color: "#10B981" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(16, 185, 129, 0.2)" },
                { offset: 1, color: "rgba(16, 185, 129, 0)" }
              ])
            }
          },
          {
            name: "Defect Rectification Rate",
            type: "line",
            smooth: true,
            data: trend.defectRectificationRate,
            itemStyle: { color: "#3B82F6" }
          }
        ]
      };

      instanceRef.current = echarts.getInstanceByDom(chartRef.current) ?? echarts.init(chartRef.current);
      instanceRef.current.setOption(option, true);
      window.addEventListener("resize", handleResize);
    }

    void initChart();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, [trend]);

  return <div ref={chartRef} className="h-[220px] w-full" />;
}

function PendingTasksView({ tasks }: { tasks: QualityTask[] }) {
  const highPriorityCount = tasks.filter((task) => task.priorityLabel === "High").length;
  const mediumPriorityCount = tasks.filter((task) => task.priorityLabel === "Medium").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-rose-100 bg-rose-50 p-2.5 text-rose-600">
            <Inbox className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">My Pending Tasks</h2>
            <p className="text-[10px] font-medium text-gray-500">Process Center tasks requiring your immediate action</p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Priority Filter</span>
            <div className="flex space-x-2">
              <PrototypeBadge variant="danger">High ({highPriorityCount})</PrototypeBadge>
              <PrototypeBadge variant="info">Medium ({mediumPriorityCount})</PrototypeBadge>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="border-b border-gray-100 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">Task Priority</th>
                <th className="px-6 py-4">Task Description &amp; Context</th>
                <th className="px-6 py-4">Contractor</th>
                <th className="px-6 py-4">Received</th>
                <th className="px-6 py-4">Deadline (SLA)</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {tasks.map((task) => (
                <tr key={task.id} className="group cursor-pointer text-xs text-gray-700 transition-colors hover:bg-blue-50/30">
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "flex items-center text-[10px] font-bold tracking-wider",
                        task.priorityTone === "danger" ? "text-rose-600" : "text-blue-600"
                      )}
                    >
                      <div
                        className={cn(
                          "mr-2 h-2 w-2 rounded-full",
                          task.priorityTone === "danger" ? "bg-rose-500 animate-pulse" : "bg-blue-500"
                        )}
                      />
                      {task.priorityLabel}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-[13px] font-bold text-gray-900">{task.title}</p>
                    <p className="mt-1 text-[11px] text-gray-500">{task.context}</p>
                  </td>
                  <td className="px-6 py-5 font-medium">{task.contractor}</td>
                  <td className="px-6 py-5 text-gray-500">{task.receivedLabel}</td>
                  <td className="px-6 py-5">
                    <span className={cn("flex items-center font-bold", task.priorityTone === "danger" ? "text-rose-600" : "text-gray-700")}>
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {task.deadlineLabel}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="rounded bg-gray-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-colors hover:bg-gray-800 group-hover:opacity-100">
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function OverviewMetricCard({ metric }: { metric: QualityOverviewMetric }) {
  return (
    <Card
      className={cn(
        "border-l-4 p-5 shadow-sm hover:shadow-sm",
        metric.tone === "info" && "border-l-[#208A9B]",
        metric.tone === "success" && "border-l-emerald-500",
        metric.tone === "warning" && "border-l-amber-500",
        metric.tone === "danger" && "border-l-rose-500 bg-rose-50/30"
      )}
    >
      <div className="flex items-start justify-between">
        <p
          className={cn(
            "mb-1 text-[10px] font-bold uppercase tracking-widest",
            metric.tone === "danger" ? "text-rose-500" : "text-gray-400"
          )}
        >
          {metric.label}
        </p>
        {metric.icon === "alertTriangle" ? <AlertTriangle className="h-4 w-4 text-rose-500" /> : null}
      </div>
      <div className="flex items-baseline space-x-2">
        <p className={cn("tracking-tight", metric.tone === "danger" ? "text-2xl font-bold text-rose-600" : "text-2xl font-light text-gray-900")}>
          {metric.valueLabel}
        </p>
        {metric.changeLabel ? <span className="text-[10px] font-bold text-emerald-500">{metric.changeLabel}</span> : null}
      </div>
      {metric.detailLabel ? (
        <p
          className={cn(
            "mt-1 text-[9px] font-bold",
            metric.tone === "danger" ? "text-rose-500/80" : metric.tone === "warning" ? "text-amber-600" : "text-gray-400"
          )}
        >
          {metric.detailLabel}
        </p>
      ) : null}
    </Card>
  );
}

function QualityDashboardView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quality Management Overview</h2>
          <p className="mt-1 text-xs text-gray-500">Jarvis DWSS: Zero-Defect Digital Work Supervision</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50">
            <FileText className="mr-2 h-3.5 w-3.5" />
            Export BD Report
          </button>
          <button className="flex items-center rounded-lg bg-[#208A9B] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1a7584]">
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Sync BIM Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {qualityOverviewMetrics.map((metric) => (
          <OverviewMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex min-h-[350px] flex-col p-6 hover:shadow-sm">
          <div className="mb-4 flex items-start justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-2.5">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">Inspection Performance</h3>
                <p className="text-[10px] font-medium text-gray-500">AI-verified vs human-approved pass rates</p>
              </div>
            </div>
          </div>
          <QualityPassRateChart trend={qualityPassRateTrend} />
        </Card>

        <Card className="flex min-h-[350px] flex-col overflow-hidden p-0 hover:shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/50 p-5">
            <h3 className="flex items-center text-sm font-bold uppercase tracking-wide text-gray-900">
              <Activity className="mr-2 h-4 w-4 text-[#208A9B]" />
              Live Quality Feed
            </h3>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {qualityLiveFeedItems.map((feed) => {
              const Icon = liveFeedIconMap[feed.icon];

              return (
                <div key={feed.id} className="flex items-start space-x-3">
                  <div
                    className={cn(
                      "rounded-md p-1.5",
                      feed.tone === "success" && "bg-emerald-50 text-emerald-500",
                      feed.tone === "danger" && "bg-rose-50 text-rose-500",
                      feed.tone === "warning" && "bg-amber-50 text-amber-500",
                      feed.tone === "info" && "bg-blue-50 text-blue-500"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{feed.message}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-gray-400">
                      {feed.timeLabel} · System Generated
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function getSupervisionActionCopy(record: QualitySupervisionCase) {
  if (record.statusTone === "success") {
    return {
      primaryLabel: "Certificate Issued",
      primaryClassName: "bg-[#10B981] hover:bg-[#059669]",
      secondaryLabel: "View Archive",
      secondaryClassName: "border-gray-200 text-gray-600 hover:bg-gray-50"
    };
  }

  if (record.statusLabel === "Commence Pending") {
    return {
      primaryLabel: "Release Commence Lock",
      primaryClassName: "bg-[#208A9B] hover:bg-[#1a7584]",
      secondaryLabel: "View Blocking RFI",
      secondaryClassName: "border-amber-200 text-amber-700 hover:bg-amber-50"
    };
  }

  if (record.statusLabel === "In Progress") {
    return {
      primaryLabel: "Request Completion Review",
      primaryClassName: "bg-[#208A9B] hover:bg-[#1a7584]",
      secondaryLabel: "Escalate Issue",
      secondaryClassName: "border-rose-200 text-rose-600 hover:bg-rose-50"
    };
  }

  return {
    primaryLabel: "Approve & Generate Cert",
    primaryClassName: "bg-[#10B981] hover:bg-[#059669]",
    secondaryLabel: "Reject",
    secondaryClassName: "border-rose-200 text-rose-600 hover:bg-rose-50"
  };
}

function SupervisionEvidenceCard({
  submissionLabel,
  submissionNote
}: {
  submissionLabel: string;
  submissionNote: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex justify-between border-b border-gray-200 bg-gray-50 px-3 py-2 text-[10px] font-bold text-gray-600">
        Contractor Submission
        <span className="text-blue-500">{submissionLabel}</span>
      </div>
      <div className="p-3">
        <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#38bdf8_100%)]">
          <div className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
            <Camera className="h-3.5 w-3.5" />
            <span>Field Evidence Snapshot</span>
          </div>
        </div>
        <p className="text-[9px] text-gray-500">{submissionNote}</p>
      </div>
    </div>
  );
}

function VerificationSummaryCard({ checks }: { checks: QualityAiCheck[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#208A9B]/30 bg-blue-50/10">
      <div className="flex items-center border-b border-[#208A9B]/20 bg-[#208A9B]/10 px-3 py-2 text-[10px] font-bold text-[#208A9B]">
        <Scan className="mr-1.5 h-3 w-3" />
        Eagle Eye AI Verification
      </div>
      <div className="space-y-3 p-3">
        {checks.map((check) => (
          <div key={check.id} className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-700">{check.label}</span>
            <PrototypeBadge variant={toneToPrototypeVariant(check.tone)}>{check.resultLabel}</PrototypeBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkSupervisionView() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(qualitySupervisionCases[0]?.id ?? "");
  const selectedCase = qualitySupervisionCases.find((record) => record.id === selectedCaseId) ?? qualitySupervisionCases[0];

  if (!selectedCase) {
    return null;
  }

  const commenceUnlocked = selectedCase.commenceChecks.every((check) => check.passed);
  const actionCopy = getSupervisionActionCopy(selectedCase);
  const completionStateLabel =
    selectedCase.statusTone === "success"
      ? "Approved"
      : selectedCase.statusLabel === "Commence Pending"
        ? "Locked"
        : selectedCase.statusLabel === "In Progress"
          ? "Monitoring"
          : "Pending";

  return (
    <div className="flex h-full flex-col space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex shrink-0 items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-blue-600">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Work Supervision Loop</h2>
            <p className="text-[10px] font-medium text-gray-500">Digital double-lock for Commence &amp; Completion Approval</p>
          </div>
        </div>
        <button className="flex items-center rounded-lg bg-[#208A9B] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#1a7584]">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          New Request
        </button>
      </div>

      <div className="grid min-h-[500px] flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col overflow-hidden p-0 hover:shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Process Queue</span>
            <Filter className="h-3.5 w-3.5 cursor-pointer text-gray-400" />
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {qualitySupervisionCases.map((record) => (
              <button
                key={record.id}
                type="button"
                onClick={() => setSelectedCaseId(record.id)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-all",
                  selectedCase.id === record.id ? "border-blue-500 bg-blue-50/10 shadow-sm" : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                )}
              >
                <div className="mb-2 flex items-start justify-between">
                  <PrototypeBadge variant={toneToPrototypeVariant(record.statusTone)}>{record.statusLabel}</PrototypeBadge>
                  <span className="text-[9px] font-bold uppercase text-gray-400">{record.timeLabel}</span>
                </div>
                <h4 className="mb-1 text-sm font-bold text-gray-900">{record.title}</h4>
                <p className="text-[10px] text-gray-500">
                  {record.zoneLabel} · {record.contractor}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="relative flex flex-col overflow-hidden p-6 hover:shadow-sm lg:col-span-2">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-blue-50 opacity-60" />

          <div className="mb-6 flex items-start justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="mb-1 flex items-center space-x-2">
                <h3 className="text-lg font-bold text-gray-900">{selectedCase.title}</h3>
                <PrototypeBadge variant={toneToPrototypeVariant(selectedCase.statusTone)}>{selectedCase.statusLabel}</PrototypeBadge>
              </div>
              <p className="text-xs font-medium text-gray-500">
                {selectedCase.zoneLabel} · {selectedCase.contractor} · {selectedCase.disciplineLabel}
              </p>
            </div>
            <button className="rounded bg-gray-100 px-3 py-1.5 text-[10px] font-bold text-gray-600 transition-colors hover:bg-gray-200">
              View BIM
            </button>
          </div>

          <div className="flex-1 space-y-8">
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-emerald-600 shadow-sm">
                <CheckCircle className="h-3.5 w-3.5" />
              </div>
              <div className="absolute bottom-[-24px] left-[11px] top-6 w-0.5 bg-emerald-100" />

              <h4 className="mb-3 flex items-center text-xs font-bold uppercase tracking-widest text-gray-900">
                Step 1: Commence Approval ({commenceUnlocked ? "Unlocked" : "Locked"})
                <Lock className={cn("ml-2 h-3 w-3", commenceUnlocked ? "text-gray-400" : "text-amber-500")} />
              </h4>
              <div className="mb-3 grid grid-cols-2 gap-3">
                {selectedCase.commenceChecks.map((check) => (
                  <div
                    key={check.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-3",
                      check.passed ? "border-emerald-100 bg-emerald-50/30" : "border-amber-100 bg-amber-50/40"
                    )}
                  >
                    <span className="text-[10px] font-bold text-gray-600">{check.label}</span>
                    {check.passed ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Clock className="h-3.5 w-3.5 text-amber-500" />}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400">{selectedCase.commenceNote}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-blue-600 shadow-sm">
                <Activity className="h-3.5 w-3.5" />
              </div>
              <div className="absolute bottom-[-24px] left-[11px] top-6 w-0.5 bg-gray-100" />

              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-900">Step 2: Execution &amp; Monitoring</h4>
              <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-700">Biometric Check</p>
                    <p className="text-[9px] text-gray-500">{selectedCase.executionSummary}</p>
                  </div>
                </div>
                <PrototypeBadge variant={toneToPrototypeVariant(selectedCase.executionTone)}>
                  {selectedCase.executionTone === "success" ? "Verified" : selectedCase.executionTone === "warning" ? "Watch" : "Active"}
                </PrototypeBadge>
              </div>
            </div>

            <div className="relative pl-8">
              <div
                className={cn(
                  "absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-sm",
                  selectedCase.statusTone === "success" ? "bg-emerald-100 text-emerald-600" : "animate-pulse bg-amber-100 text-amber-600"
                )}
              >
                <Camera className="h-3.5 w-3.5" />
              </div>

              <h4 className="mb-3 flex items-center text-xs font-bold uppercase tracking-widest text-gray-900">
                Step 3: Completion Approval ({completionStateLabel})
                <Key className={cn("ml-2 h-3 w-3", selectedCase.statusTone === "success" ? "text-emerald-500" : "text-amber-500")} />
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <SupervisionEvidenceCard
                  submissionLabel={selectedCase.submissionAttachmentLabel}
                  submissionNote={selectedCase.submissionNote}
                />
                <VerificationSummaryCard checks={selectedCase.aiChecks} />
              </div>

              <p className="mt-4 text-[10px] text-gray-500">{selectedCase.completionNote}</p>

              <div className="mt-5 flex space-x-3">
                <button
                  className={cn(
                    "flex-1 rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm transition-colors",
                    actionCopy.primaryClassName
                  )}
                >
                  {actionCopy.primaryLabel}
                </button>
                <button
                  className={cn(
                    "rounded-lg border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors",
                    actionCopy.secondaryClassName
                  )}
                >
                  {actionCopy.secondaryLabel}
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function BiometricTrackingView({ records }: { records: QualityPersonnelRecord[] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-2.5 text-indigo-600">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Personnel Movement &amp; Competency</h2>
            <p className="text-[10px] font-medium text-gray-500">Biometric tracking matched with Trade Certificates</p>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 rounded-xl border border-rose-200 bg-rose-50 p-4 shadow-sm">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
        <div>
          <h4 className="text-xs font-bold text-rose-900">{qualityCompetencyAlert.title}</h4>
          <p className="mt-1 text-[11px] font-medium text-rose-700">{qualityCompetencyAlert.message}</p>
        </div>
        <button className="ml-auto rounded bg-rose-600 px-3 py-1.5 text-[10px] font-bold uppercase text-white shadow transition-colors hover:bg-rose-700">
          Acknowledge
        </button>
      </div>

      <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Live Site Roster</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              className="w-64 rounded-md border border-gray-300 py-1.5 pl-9 pr-4 text-xs outline-none transition-colors focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="border-b border-gray-100 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">Worker ID &amp; Name</th>
                <th className="px-6 py-4">Trade / Role</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Current Zone</th>
                <th className="px-6 py-4">Time In</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {records.map((record) => (
                <tr
                  key={record.id}
                  className={cn(
                    "group cursor-pointer text-xs text-gray-700 transition-colors",
                    record.tone === "danger" ? "bg-rose-50/30" : "hover:bg-indigo-50/30"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold",
                          record.tone === "danger" ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {record.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{record.name}</p>
                        <p className="font-mono text-[10px] text-gray-500">{record.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{record.roleLabel}</td>
                  <td className="px-6 py-4 text-gray-500">{record.company}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-[11px]">
                      <MapPin className="mr-1 h-3 w-3 text-gray-400" />
                      {record.zoneLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{record.timeInLabel}</td>
                  <td className="px-6 py-4 text-center">
                    {record.tone === "danger" ? (
                      <div className="flex flex-col items-center">
                        <PrototypeBadge variant="danger">{record.statusLabel}</PrototypeBadge>
                        <span className="mt-1 text-[9px] font-bold text-rose-500">{record.reasonLabel}</span>
                      </div>
                    ) : (
                      <PrototypeBadge variant="success">{record.statusLabel}</PrototypeBadge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SummaryDistributionCard({
  title,
  leftSummary,
  rightSummary
}: {
  title?: string;
  leftSummary: Array<{ label: string; count: number; tone: Tone }>;
  rightSummary: Array<{ label: string; percent: number; accentHex: string }>;
}) {
  return (
    <Card className="border border-gray-200 bg-white p-6 shadow-sm hover:shadow-sm">
      {title ? <div className="mb-5 text-sm font-bold text-gray-900">{title}</div> : null}
      <div className="flex items-start justify-between">
        <div className="w-1/3 border-r border-gray-100 pr-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">
            {title?.includes("Form") ? "Form Status" : "RFI SLA Status"}
          </h3>
          <div className="space-y-4">
            {leftSummary.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between text-sm",
                  item.tone === "danger" && "font-bold text-rose-600"
                )}
              >
                <div className="flex items-center text-gray-700">
                  <div
                    className={cn(
                      "mr-3 h-2.5 w-2.5 rounded-full",
                      item.tone === "success" && "bg-[#10B981]",
                      item.tone === "info" && "bg-[#3B82F6]",
                      item.tone === "warning" && "bg-[#FBBF24]",
                      item.tone === "danger" && "animate-pulse bg-[#F43F5E]"
                    )}
                  />
                  {item.label}
                </div>
                <span className="font-bold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-2/3 pl-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">
            {title?.includes("Form") ? "Form Type Distribution" : "RFI Type Distribution"}
          </h3>
          <div className="space-y-5">
            {rightSummary.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-xs font-bold text-gray-700">
                  <span>{item.label}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.accentHex }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function RfiRegistryView({ records }: { records: QualityRfiRecord[] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <SummaryDistributionCard leftSummary={qualityRfiStatusSummary} rightSummary={qualityRfiDistribution} />

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-800">
            <MessageSquare className="h-4 w-4 text-amber-600" />
            <span>Dynamic RFI Registry</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-xs text-gray-600 transition-colors hover:text-gray-900">
              <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
              Full Screen
            </button>
            <button className="rounded border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 transition-colors hover:bg-amber-100">
              Export RFI Log
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white p-6">
          <div className="mb-3 flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-700">RFI ID, Keyword, or BIM Location</span>
            <span className="flex cursor-pointer items-center text-sm text-amber-600 hover:text-amber-700">
              Contains
              <ChevronDown className="ml-1 h-4 w-4" />
            </span>
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="e.g., RFI-042, Clash, Tower A..."
              className="flex-1 rounded border border-gray-300 p-2 text-sm outline-none transition-colors focus:border-amber-500"
            />
            <button className="rounded bg-gray-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
              New RFI
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="border-b border-gray-200 bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">RFI ID</th>
                <th className="px-6 py-4">Description &amp; Location</th>
                <th className="px-6 py-4">Type &amp; Raised By</th>
                <th className="px-6 py-4">SLA Countdown</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {records.map((record) => (
                <tr key={record.id} className="text-xs text-gray-700 transition-colors hover:bg-amber-50/20">
                  <td className="px-6 py-5">
                    <PrototypeBadge variant={toneToPrototypeVariant(record.statusTone)} className={record.statusTone === "danger" ? "animate-pulse" : ""}>
                      {record.statusLabel}
                    </PrototypeBadge>
                  </td>
                  <td className="bg-gray-50/50 px-6 py-5 font-mono font-bold text-gray-900">{record.id}</td>
                  <td className="px-6 py-5">
                    <p className="max-w-xs truncate font-bold text-gray-900">{record.description}</p>
                    <p className="mt-1 flex items-center text-[10px] text-gray-500">
                      <MapPin className="mr-1 h-3 w-3 text-amber-500" />
                      {record.locationLabel}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-start space-y-1">
                      <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gray-700">
                        {record.typeLabel}
                      </span>
                      <span className="text-[10px] font-medium text-gray-500">{record.contractor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "flex items-center text-[11px] font-bold",
                        record.slaTone === "danger" && "text-rose-600",
                        record.slaTone === "warning" && "text-amber-600",
                        record.slaTone === "success" && "text-emerald-600",
                        record.slaTone === "default" && "text-gray-600"
                      )}
                    >
                      {record.slaTone === "danger" ? (
                        <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                      ) : record.slaTone === "success" ? (
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                      ) : (
                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                      )}
                      {record.slaLabel}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="rounded bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800">
                      View BIM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InspectionFormsView({ records }: { records: QualityInspectionFormRecord[] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <SummaryDistributionCard title="Form Summary" leftSummary={qualityInspectionStatusSummary} rightSummary={qualityInspectionDistribution} />

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-800">
            <AlignJustify className="h-4 w-4 text-gray-600" />
            <span>Inspection Forms Registry</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-xs text-gray-600 transition-colors hover:text-gray-900">
              <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
              Full Screen
            </button>
            <button className="rounded border border-[#B2DFDB] bg-[#E0F2F1] px-4 py-1.5 text-xs font-bold text-[#208A9B] transition-colors hover:bg-[#B2DFDB]">
              Export Registry
            </button>
          </div>
        </div>

        <div className="relative bg-[#208A9B] p-8">
          <div className="absolute left-6 top-4 text-sm font-medium text-white">Total Inspections Processed</div>
          <div className="my-2 text-center text-[56px] font-normal tracking-tight text-white">{qualityInspectionRegistryStats.totalProcessedLabel}</div>
          <div className="absolute bottom-4 right-6 flex items-center space-x-2 rounded-md border border-white/10 bg-black/15 px-3 py-1.5 backdrop-blur-sm">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white">100% Immutable Records</span>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white p-6">
          <div className="mb-3 flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-700">Form ID or Contractor</span>
            <span className="flex cursor-pointer items-center text-sm text-[#208A9B] hover:text-[#1a7584]">
              Contains
              <ChevronDown className="ml-1 h-4 w-4" />
            </span>
          </div>
          <input
            type="text"
            placeholder="Search forms..."
            className="w-full rounded border border-gray-300 p-2 text-sm outline-none transition-colors focus:border-[#208A9B]"
          />
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="border-b border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Form ID</th>
                <th className="px-6 py-4">Task &amp; Location</th>
                <th className="px-6 py-4">Form Type &amp; Contractor</th>
                <th className="px-6 py-4">Eagle Eye AI Verification</th>
                <th className="px-6 py-4 text-right">Submitted Date</th>
                <th className="px-6 py-4 text-center">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {records.map((record) => (
                <tr key={record.formId} className="text-xs text-gray-700 transition-colors hover:bg-blue-50/30">
                  <td className="px-6 py-5">
                    <PrototypeBadge variant={toneToPrototypeVariant(record.statusTone)}>{record.statusLabel}</PrototypeBadge>
                  </td>
                  <td className="px-6 py-5 font-medium text-[#208A9B]">{record.formId}</td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-gray-900">{record.taskTitle}</p>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      {record.locationLabel}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-start space-y-1">
                      <PrototypeBadge variant={toneToPrototypeVariant(record.typeTone)}>{record.typeLabel}</PrototypeBadge>
                      <span className="text-[10px] font-medium text-gray-500">{record.contractor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {record.aiVerificationTone === "danger" ? (
                      <span className="flex w-fit items-center rounded-md border border-rose-100 bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-600">
                        <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                        {record.aiVerificationLabel}
                      </span>
                    ) : record.aiVerificationTone === "default" ? (
                      <span className="flex items-center text-[11px] font-bold text-gray-500">
                        <Clock className="mr-1.5 h-4 w-4" />
                        {record.aiVerificationLabel}
                      </span>
                    ) : (
                      <span className="flex items-center text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="mr-1.5 h-4 w-4" />
                        {record.aiVerificationLabel}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-gray-900">{record.submittedLabel}</td>
                  <td className="px-6 py-5 text-center">
                    {record.auditState === "secured" ? (
                      <div className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent p-1.5 text-emerald-500 transition-colors hover:border-emerald-200 hover:bg-emerald-50">
                        <Lock className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center p-1.5 text-amber-500">
                        <Activity className="h-4 w-4 animate-pulse" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DailyReportQr() {
  return (
    <div className="grid h-16 w-16 grid-cols-6 gap-[2px] rounded border border-gray-200 bg-white p-2 shadow-sm">
      {Array.from({ length: 36 }).map((_, index) => (
        <div key={index} className={index % 5 === 0 || index % 7 === 0 ? "bg-slate-900" : "bg-gray-100"} />
      ))}
    </div>
  );
}

function SiteDailyLogView({ records }: { records: QualityDailyLogRecord[] }) {
  const [selectedReport, setSelectedReport] = useState<QualityDailyLogRecord | null>(null);

  if (selectedReport) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 animate-in slide-in-from-right-4 duration-300 font-sans">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="flex items-center rounded-md p-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Archive
            </button>
            <div className="h-4 w-px bg-gray-200" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Smart Site Daily Log</h2>
              <p className="text-[10px] font-medium text-gray-500">Auto-generated immutable records via DWSS</p>
            </div>
          </div>
          <button className="rounded bg-gray-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow transition-colors hover:bg-gray-800">
            Download PDF
          </button>
        </div>

        <Card className="border-t-4 border-t-[#208A9B] bg-[#FAFAFA] p-8 shadow-lg hover:shadow-lg">
          <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Site Daily Report</h1>
              <p className="mt-1 text-sm font-medium text-gray-500">Horizon Estates · Phase 1</p>
            </div>
            <div className="text-right">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Date</p>
              <p className="text-lg font-bold text-gray-900">{selectedReport.dateLabel}</p>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center rounded-xl border border-blue-100 bg-blue-50/50 p-3">
            <Lock className="mr-2 h-4 w-4 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
              Blockchain Immutable Record Hash: {selectedReport.hashLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Weather Conditions
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-light text-gray-800">{selectedReport.temperatureLabel}</div>
                  <div className="text-xs font-medium text-gray-600">
                    {selectedReport.weatherLabel} · Humidity 65% · Wind 12km/h
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Workforce Attendance
                </h3>
                <div className="space-y-2 text-sm font-medium text-gray-800">
                  <div className="flex justify-between">
                    <span>Management / Supervisory:</span>
                    <span>{selectedReport.managementCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Labor (Main Con):</span>
                    <span>{selectedReport.mainConCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialist Sub-cons:</span>
                    <span>{selectedReport.specialistCount}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                    <span>Total On-Site:</span>
                    <span>{selectedReport.workersCount}</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Process Summary
                </h3>
                <ul className="space-y-2 text-sm text-gray-800">
                  {selectedReport.processEntries.map((entry) => (
                    <li key={entry.id} className="flex items-start">
                      {entry.tone === "success" ? (
                        <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      ) : entry.tone === "danger" ? (
                        <ShieldAlert className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      ) : (
                        <Activity className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      )}
                      {entry.label}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  System Anomalies (Auto-Logged)
                </h3>
                {selectedReport.anomalyNote ? (
                  <div className="rounded border border-rose-100 bg-rose-50 p-3 text-xs font-medium text-rose-800">
                    {selectedReport.anomalyNote}
                  </div>
                ) : (
                  <div className="rounded border border-gray-100 bg-gray-50 p-3 text-xs font-medium italic text-gray-500">
                    No anomalies detected during this reporting period.
                  </div>
                )}
              </section>
            </div>
          </div>

          <div className="mt-12 flex items-end justify-between border-t border-gray-200 pt-6">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Generated By</p>
              <p className="text-sm font-bold text-gray-900">Jarvis DWSS Engine</p>
            </div>
            <DailyReportQr />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-slate-100">
            <FileArchive className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Smart Site Daily Archive</h2>
            <p className="text-[10px] font-medium text-gray-500">Immutable daily records generated by DWSS Engine</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex items-center justify-between border-l-4 border-l-slate-800 p-5 shadow-sm hover:shadow-sm">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Logs Archived</p>
            <p className="text-2xl font-bold text-gray-900">{qualityDailyArchiveStats.totalLogs}</p>
          </div>
          <FileArchive className="h-8 w-8 text-gray-200" />
        </Card>
        <Card className="flex items-center justify-between border-l-4 border-l-blue-500 p-5 shadow-sm hover:shadow-sm">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Avg. Daily Workforce</p>
            <p className="text-2xl font-bold text-gray-900">{qualityDailyArchiveStats.averageWorkforce}</p>
          </div>
          <Users className="h-8 w-8 text-blue-100" />
        </Card>
        <Card className="flex items-center justify-between border-l-4 border-l-rose-500 p-5 shadow-sm hover:shadow-sm">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Anomalies This Week</p>
            <p className="text-2xl font-bold text-rose-600">{qualityDailyArchiveStats.anomaliesThisWeek}</p>
          </div>
          <ShieldAlert className="h-8 w-8 text-rose-100" />
        </Card>
      </div>

      <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Daily Report Registry</span>
          <div className="flex space-x-2">
            <input
              type="month"
              className="rounded border border-gray-300 p-1.5 text-xs text-gray-600 outline-none transition-colors focus:border-slate-800"
              defaultValue="2026-03"
            />
            <button className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="border-b border-gray-100 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">Report Date</th>
                <th className="px-6 py-4">Weather Conditions</th>
                <th className="px-6 py-4">Total Workforce</th>
                <th className="px-6 py-4">Anomalies Detected</th>
                <th className="px-6 py-4">Status &amp; Tx Hash</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {records.map((record) => (
                <tr key={record.dateLabel} className="group text-xs text-gray-700 transition-colors hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-gray-900">{record.dateLabel}</td>
                  <td className="px-6 py-5 text-gray-600">
                    {record.weatherLabel}, {record.temperatureLabel}
                  </td>
                  <td className="px-6 py-5 font-medium text-blue-600">{record.workersCount} Personnel</td>
                  <td className="px-6 py-5">
                    {record.anomaliesCount > 0 ? (
                      <span className="flex items-center font-bold text-rose-600">
                        <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                        {record.anomaliesCount}
                      </span>
                    ) : (
                      <span className="font-medium text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-start space-y-1">
                      <PrototypeBadge variant={record.tone === "success" ? "success" : "default"}>{record.statusLabel}</PrototypeBadge>
                      <span className="flex items-center font-mono text-[9px] text-gray-400">
                        <Lock className="mr-1 h-3 w-3" />
                        {record.hashLabel}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(record)}
                      className="rounded bg-slate-800 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-700"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function PlaceholderView({ label }: { label: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm">
      <FileEdit className="mb-4 h-12 w-12 text-[#208A9B] opacity-20" />
      <p className="text-sm">
        View for <strong className="text-gray-600">{label}</strong> is ready for queue extension.
      </p>
    </div>
  );
}

export function QualityPage() {
  const [activeSubmodule, setActiveSubmodule] = useState<QualitySubmoduleId>("Overview");

  const activeSubmoduleLabel = qualitySubmenuItems.find(
    (item): item is Extract<QualitySidebarItem, { type: "link" }> => item.type === "link" && item.id === activeSubmodule
  )?.label;

  return (
    <div className="min-h-full bg-[#F0F2F5]">
      <div className="flex min-h-full">
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
          <nav className="flex-1 overflow-y-auto py-4">
            {qualitySubmenuItems.map((item, index) => {
              if (item.type === "search") {
                return (
                  <div key={`search-${index}`} className="mb-4 mt-2 px-4">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder={item.placeholder}
                        className="w-full rounded-full border border-gray-300 py-1.5 pl-3 pr-8 text-xs outline-none transition-colors focus:border-[#1890FF]"
                      />
                      <Search className="absolute right-3 h-3.5 w-3.5 text-gray-400" />
                      <button type="button" className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F7FF] text-[#1890FF]">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              }

              if (item.type === "title") {
                return (
                  <div
                    key={`title-${item.label}`}
                    className="mx-2 flex cursor-pointer items-center justify-between rounded-xl px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4 text-[#5C6BC0]" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                );
              }

              if (item.type === "group") {
                return (
                  <div
                    key={`group-${item.label}`}
                    className="mx-2 flex cursor-pointer items-center space-x-3 rounded-xl px-4 pb-2 pt-4 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    <Folder className="h-4 w-4 fill-[#5C6BC0]/20 text-[#5C6BC0]" />
                    <span>{item.label}</span>
                  </div>
                );
              }

              if (item.type === "spacer") {
                return <div key={`spacer-${index}`} className="mx-5 my-2 border-t border-gray-100" />;
              }

              const isActive = activeSubmodule === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSubmodule(item.id)}
                  className={cn(
                    "mx-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-xl px-4 py-2 transition-all",
                    isActive ? "bg-[#F0F7FF] text-[#1890FF] shadow-[inset_0_0_0_1px_rgba(24,144,255,0.14)]" : "text-gray-600 hover:bg-gray-50",
                    item.isChild ? "pl-11" : "pl-8"
                  )}
                >
                  <div className="flex min-w-0 items-center space-x-2.5">
                    <item.icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-[#1890FF]" : "text-gray-400")} />
                    <span className="truncate text-xs font-medium leading-5">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-[#FF4D4F] px-1.5 py-[1px] text-[9px] font-bold leading-none text-white">{item.badge}</span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
            <div className="flex items-center space-x-4">
              <div className="mx-1 h-4 w-px bg-gray-200" />
              <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Portfolios
                <ChevronRight className="mx-1.5 h-3 w-3" />
                <span className="text-gray-800">Horizon Estates</span>
                <ChevronRight className="mx-1.5 h-3 w-3" />
                <span className="text-[#208A9B]">Quality</span>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <button
                type="button"
                onClick={() => setActiveSubmodule("Overview")}
                className="rounded bg-[#208A9B] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#1a7584]"
              >
                Overview Dashboard
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search DWSS data..."
                  className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-4 text-xs outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#208A9B]"
                />
              </div>

              <button type="button" className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-white bg-rose-500 shadow-sm" />
              </button>

              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white bg-gradient-to-tr from-[#208A9B] to-blue-500 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-lg">
                JD
              </div>
            </div>
          </header>

          <div className="flex-1 px-6 py-6 xl:px-8">
            <div className="pb-6">
              {activeSubmodule === "Tasks" ? <PendingTasksView tasks={qualityPendingTasks} /> : null}
              {activeSubmodule === "Overview" ? <QualityDashboardView /> : null}
              {activeSubmodule === "Supervision" ? <WorkSupervisionView /> : null}
              {activeSubmodule === "Biometric" ? <BiometricTrackingView records={qualityPersonnelRecords} /> : null}
              {activeSubmodule === "RFI" ? <RfiRegistryView records={qualityRfiRecords} /> : null}
              {activeSubmodule === "InspectionForms" ? <InspectionFormsView records={qualityInspectionForms} /> : null}
              {activeSubmodule === "SiteDaily" ? <SiteDailyLogView records={qualityDailyLogs} /> : null}
              {activeSubmodule === "MyApprovals" || activeSubmodule === "Processed" || activeSubmodule === "Initiated" ? (
                <PlaceholderView label={activeSubmoduleLabel ?? "Selected View"} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
