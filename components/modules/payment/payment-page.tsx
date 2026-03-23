"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ECharts, EChartsOption } from "echarts";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  AlignJustify,
  ArrowLeft,
  Bell,
  Camera,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Eye,
  FileBarChart,
  FileEdit,
  FileWarning,
  Folder,
  Hexagon,
  Inbox,
  Layers,
  Lock,
  Map as MapIcon,
  Maximize2,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Send
} from "lucide-react";

import { PaymentSiteMap } from "@/components/modules/payment/payment-site-map";
import { Card } from "@/components/ui/card";
import {
  paymentContractRules,
  paymentLiveImpactCard,
  paymentMcCertificates,
  paymentMcRuleBuckets,
  paymentNscCertificates,
  paymentNscRuleBuckets,
  paymentOverviewMetrics,
  paymentPendingTasks,
  paymentProgressComparisonItems,
  paymentSiteViewport,
  paymentValuationRecords,
  paymentVariationRecords
} from "@/lib/mock-data/payment";
import type {
  PaymentCertificateRecord,
  PaymentCertificateSummaryBucket,
  PaymentProgressComparisonItem,
  PaymentRuleBucket,
  PaymentTask,
  PaymentValuationRecord,
  PaymentVariationRecord
} from "@/lib/types";
import { cn } from "@/lib/utils";

type PrototypeBadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "dark" | "purple";
type PaymentSubmoduleId = "Tasks" | "CC" | "Processed" | "Initiated" | "Overview" | "Valuation" | "VO" | "MC_List" | "NSC_List";

type PaymentSidebarItem =
  | { type: "search"; placeholder: string }
  | { type: "title"; label: string }
  | { type: "spacer" }
  | { type: "group"; label: string }
  | { type: "link"; id: PaymentSubmoduleId; label: string; icon: LucideIcon; badge?: string; isChild?: boolean };

const prototypeBadgeClassMap: Record<PrototypeBadgeVariant, string> = {
  default: "border border-gray-200 bg-gray-100 text-gray-700",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
  danger: "border border-rose-200 bg-rose-50 text-rose-700",
  info: "border border-blue-200 bg-blue-50 text-blue-700",
  dark: "border border-slate-700 bg-slate-800 text-slate-100",
  purple: "border border-purple-200 bg-purple-50 text-purple-700"
};

const paymentSubmenuItems: PaymentSidebarItem[] = [
  { type: "search", placeholder: "Search forms/reports" },
  { type: "title", label: "Process Center" },
  { type: "link", id: "Tasks", label: "Pending Tasks", icon: Inbox, badge: "3" },
  { type: "link", id: "CC", label: "Copied to Me", icon: Send, badge: "1" },
  { type: "link", id: "Processed", label: "Processed", icon: CheckSquare },
  { type: "link", id: "Initiated", label: "Initiated by Me", icon: FileEdit },
  { type: "spacer" },
  { type: "title", label: "Jarvis PAY Core" },
  { type: "link", id: "Overview", label: "Payment Overview", icon: PieChart },
  { type: "link", id: "Valuation", label: "AI Valuation (Eagle Eye)", icon: Cpu, badge: "1" },
  { type: "link", id: "VO", label: "Variation Order (CE)", icon: FileWarning, badge: "2" },
  { type: "group", label: "Payment Ledgers" },
  { type: "link", id: "MC_List", label: "Payment for MC List", icon: FileBarChart, isChild: true },
  { type: "link", id: "NSC_List", label: "Payment for NSC List", icon: FileBarChart, isChild: true }
];

const summaryBucketLabelMap: Record<PaymentCertificateSummaryBucket, string> = {
  settled: "Certified / Paid",
  processing: "Processing",
  flagged: "AI Flagged"
};

const summaryBucketDotClassMap: Record<PaymentCertificateSummaryBucket, string> = {
  settled: "bg-emerald-500",
  processing: "bg-blue-500",
  flagged: "bg-rose-500"
};

const summaryBucketTextClassMap: Record<PaymentCertificateSummaryBucket, string> = {
  settled: "text-gray-700",
  processing: "text-gray-700",
  flagged: "text-rose-600 font-bold"
};

const EAGLE_EYE_IMAGE = "/image/eagle%20eye/eagle%20eye.png";

function formatAmount(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}k`;
  }

  return `$${formatAmount(value)}`;
}

function getPrototypeBadgeVariantFromBucket(bucketId: string): PrototypeBadgeVariant {
  if (bucketId.includes("nec")) {
    return "purple";
  }

  if (bucketId.includes("gcc")) {
    return "info";
  }

  if (bucketId.includes("fidic")) {
    return "default";
  }

  if (bucketId.includes("nsc")) {
    return "info";
  }

  return "default";
}

function getStatusSummary(records: PaymentCertificateRecord[]) {
  return (["settled", "processing", "flagged"] as const).map((bucket) => ({
    bucket,
    label: summaryBucketLabelMap[bucket],
    count: records.filter((record) => record.summaryBucket === bucket).length
  }));
}

function getRuleDistribution(records: PaymentCertificateRecord[], buckets: PaymentRuleBucket[]) {
  const totalValue = records.reduce((sum, record) => sum + record.amountValue, 0);

  return buckets
    .map((bucket) => {
      const value = records
        .filter((record) => record.ruleBucketId === bucket.id)
        .reduce((sum, record) => sum + record.amountValue, 0);

      return {
        ...bucket,
        value,
        widthPercent: totalValue === 0 ? 0 : (value / totalValue) * 100
      };
    })
    .filter((bucket) => bucket.value > 0);
}

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

function ProgressComparisonChart({ items }: { items: PaymentProgressComparisonItem[] }) {
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
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#E5E7EB",
          textStyle: { color: "#374151" },
          extraCssText: "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px;",
          formatter(params) {
            const seriesParams = Array.isArray(params) ? params : [params];
            const rows = seriesParams as Array<{ name: string; seriesName: string; value: number; color: string }>;
            const title = rows[0]?.name ?? "";
            const ai = rows.find((row) => row.seriesName === "Eagle Eye AI Progress")?.value ?? 0;
            const contractor = rows.find((row) => row.seriesName === "Contractor Claim")?.value ?? 0;
            const hasAlert = contractor - ai >= 5;

            const detailRows = rows
              .map(
                (row) =>
                  `<div style="display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:4px;">
                    <span style="font-size:11px;color:#6B7280;display:flex;align-items:center;">
                      <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${row.color};margin-right:6px;"></span>
                      ${row.seriesName}
                    </span>
                    <span style="font-weight:bold;font-size:11px;">${row.value}%</span>
                  </div>`
              )
              .join("");

            const alertMarkup = hasAlert
              ? `<div style="margin-top:8px;padding:4px 6px;background:#FFF1F2;color:#E11D48;border-radius:4px;font-size:10px;font-weight:bold;display:flex;align-items:center;">⚠️ Deviation > 5% (Audit Triggered)</div>`
              : "";

            return `<div style="font-weight:bold;margin-bottom:8px;font-size:12px;border-bottom:1px solid #E5E7EB;padding-bottom:4px;">${title}</div>${detailRows}${alertMarkup}`;
          }
        },
        legend: {
          data: ["Eagle Eye AI Progress", "Contractor Claim"],
          bottom: 0,
          icon: "roundRect",
          itemWidth: 12,
          itemHeight: 12,
          textStyle: { fontSize: 10, color: "#6B7280", fontWeight: "bold" }
        },
        grid: { left: "2%", right: "8%", bottom: "15%", top: "5%", containLabel: true },
        xAxis: {
          type: "value",
          max: 100,
          axisLabel: { formatter: "{value}%", fontSize: 10, color: "#9CA3AF" },
          splitLine: { lineStyle: { type: "dashed", color: "#F3F4F6" } }
        },
        yAxis: {
          type: "category",
          data: items.map((item) => item.label),
          axisLabel: { fontSize: 11, color: "#4B5563", fontWeight: "bold" },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [
          {
            name: "Eagle Eye AI Progress",
            type: "bar",
            data: items.map((item) => item.aiPercent),
            itemStyle: { color: "#10B981", borderRadius: [0, 4, 4, 0] },
            barWidth: 14,
            barGap: "20%"
          },
          {
            name: "Contractor Claim",
            type: "bar",
            data: items.map((item) => ({
              value: item.contractorPercent,
              itemStyle: { color: item.contractorPercent - item.aiPercent >= item.alertThresholdPercent ? "#F43F5E" : "#FBBF24" }
            })),
            itemStyle: { borderRadius: [0, 4, 4, 0] },
            barWidth: 14
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
  }, [items]);

  return <div className="mt-4 min-h-[250px] w-full flex-1" ref={chartRef} />;
}

function PendingTasksView({ tasks }: { tasks: PaymentTask[] }) {
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
              <PrototypeBadge variant="danger">High (2)</PrototypeBadge>
              <PrototypeBadge variant="info">Medium (1)</PrototypeBadge>
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

function PaymentDashboardView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Project Payment Management Overview</h2>
          <p className="mt-1 text-xs text-gray-500">Multi-Contract Rule Engine &amp; AI Payment Certification</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50">
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Sync ERP
          </button>
          <button className="flex items-center rounded-lg bg-[#208A9B] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1a7584]">
            <Cpu className="mr-2 h-3.5 w-3.5" />
            Run AI Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {paymentOverviewMetrics.map((metric) => (
          <Card
            key={metric.id}
            className={cn(
              "border-l-4 p-5 shadow-sm hover:shadow-sm",
              metric.tone === "info" && "border-l-[#208A9B]",
              metric.tone === "success" && "border-l-emerald-500",
              metric.tone === "warning" && "border-l-amber-500",
              metric.tone === "danger" && "border-l-rose-500 bg-rose-50/30"
            )}
          >
            <div className={cn("flex items-start justify-between", metric.icon ? "" : "block")}>
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
              <p className={cn("mt-1 text-[9px] font-bold", metric.tone === "danger" ? "text-rose-500/80" : metric.tone === "warning" ? "text-amber-600" : "text-gray-400")}>
                {metric.detailLabel}
              </p>
            ) : null}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex min-h-[400px] flex-col p-6 hover:shadow-sm">
          <div className="mb-2 flex items-start justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50/80 p-2.5">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">AI Progress Agent Verification</h3>
                <p className="text-[10px] font-medium text-gray-500">Physical Progress &gt; Invoice Progress Enforcement</p>
              </div>
            </div>
            <PrototypeBadge variant="success">Eagle Eye Live Sync</PrototypeBadge>
          </div>
          <ProgressComparisonChart items={paymentProgressComparisonItems} />
        </Card>

        <div className="space-y-6">
          <Card className="flex min-h-[188px] flex-col justify-center p-6 hover:shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-purple-50 p-2">
                  <Hexagon className="h-4 w-4 text-purple-600" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">Contract Logic Engine</h3>
              </div>
            </div>

            <div className="flex-1 space-y-3.5">
              {paymentContractRules.map((rule, index) => (
                <div
                  key={rule.id}
                  className={cn("flex items-center justify-between pb-1 text-xs", index < paymentContractRules.length - 1 && "border-b border-gray-50")}
                >
                  <span className="font-medium text-gray-600">{rule.label}</span>
                  <PrototypeBadge variant={rule.tone === "warning" ? "warning" : rule.tone === "success" ? "success" : "info"}>
                    {rule.statusLabel}
                  </PrototypeBadge>
                </div>
              ))}
            </div>
          </Card>

          <Card
            variant="emphasis"
            className="relative min-h-[188px] overflow-hidden border-slate-900 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),linear-gradient(145deg,#0f172a_0%,#111827_58%,#020617_100%)] p-6 text-white shadow-[0_28px_64px_rgba(15,23,42,0.24)] hover:shadow-[0_28px_64px_rgba(15,23,42,0.24)]"
          >
            <div className="absolute -bottom-6 -right-6 opacity-10">
              <Activity className="h-40 w-40" />
            </div>
            <div className="relative z-10 mb-5 flex items-center space-x-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wide">CE / VO Live Impact</h3>
            </div>

            <div className="relative z-10 mb-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">{paymentLiveImpactCard.label}</p>
              <p className="text-3xl font-light tracking-tight text-white">{paymentLiveImpactCard.valueLabel}</p>
            </div>

            <div className="relative z-10 mt-auto flex items-start rounded-lg border border-amber-400/30 bg-amber-400/[0.18] p-2.5 text-[10px] font-medium leading-relaxed text-amber-100 backdrop-blur-md">
              <AlertTriangle className="mr-2 mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{paymentLiveImpactCard.noteLabel}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PaymentLedgerView({
  title,
  accentHex,
  totalLabel,
  searchLabel,
  records,
  buckets
}: {
  title: string;
  accentHex: string;
  totalLabel: string;
  searchLabel: string;
  records: PaymentCertificateRecord[];
  buckets: PaymentRuleBucket[];
}) {
  const summaryRows = getStatusSummary(records);
  const distributionRows = getRuleDistribution(records, buckets);
  const totalAmount = records.reduce((sum, record) => sum + record.amountValue, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <Card className="flex items-start justify-between border border-gray-200 bg-white p-6 shadow-sm hover:shadow-sm">
        <div className="w-1/3 border-r border-gray-100 pr-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">
            {title === "Payment for MC List" ? "Certificate Status" : "NSC Certificate Status"}
          </h3>
          <div className="space-y-4">
            {summaryRows.map((row) => (
              <div key={row.bucket} className={cn("flex items-center justify-between text-sm", summaryBucketTextClassMap[row.bucket])}>
                <div className="flex items-center">
                  <div className={cn("mr-3 h-2.5 w-2.5 rounded-full", summaryBucketDotClassMap[row.bucket], row.bucket === "flagged" && "animate-pulse")} />
                  {row.label}
                </div>
                <span className="font-bold text-gray-900">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-2/3 pl-8">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">
            {title === "Payment for MC List" ? "Contract Rule Distribution" : "NSC Contract Rule Distribution"}
          </h3>
          <div className="space-y-5">
            {distributionRows.map((bucket) => (
              <div key={bucket.id}>
                <div className="mb-2 flex justify-between text-xs font-bold text-gray-700">
                  <span>{bucket.label}</span>
                  <span>{formatCompactCurrency(bucket.value)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${bucket.widthPercent}%`, backgroundColor: bucket.accentHex }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-800">
            <AlignJustify className="h-4 w-4 text-gray-600" />
            <span>{title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-xs text-gray-600 transition-colors hover:text-gray-900">
              <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
              Full Screen
            </button>
            <button
              className="rounded border px-4 py-1.5 text-xs font-bold transition-colors"
              style={{
                color: accentHex,
                backgroundColor: title === "Payment for MC List" ? "#E6F7FF" : "#EEF2FF",
                borderColor: title === "Payment for MC List" ? "#91D5FF" : "#C7D2FE"
              }}
            >
              Edit Report
            </button>
          </div>
        </div>

        <div className="relative p-8" style={{ backgroundColor: accentHex }}>
          <div className="absolute left-6 top-4 text-sm font-medium text-white">{totalLabel}</div>
          <div className="my-2 text-center text-[56px] font-normal tracking-tight text-white">{formatAmount(totalAmount)}</div>
          <div className="absolute bottom-4 right-6 flex items-center space-x-2 rounded-md border border-white/10 bg-black/15 px-3 py-1.5 backdrop-blur-sm">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white">100% Tx Secured</span>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white p-6">
          <div className="mb-3 flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-700">{searchLabel}</span>
            <span className="flex cursor-pointer items-center text-sm" style={{ color: accentHex }}>
              Equals
              <ChevronDown className="ml-1 h-4 w-4" />
            </span>
          </div>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2 text-sm outline-none transition-colors"
            style={{ borderColor: "#D1D5DB" }}
          />
        </div>

        <div className="bg-white">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left">
              <thead className="border-b border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Certificate ID</th>
                  <th className="px-6 py-4">{title === "Payment for MC List" ? "Contractor & Title" : "NSC & Title"}</th>
                  <th className="px-6 py-4">Rule Engine &amp; VO</th>
                  <th className="px-6 py-4">Jarvis AI Progress</th>
                  <th className="px-6 py-4 text-right">Amount ($)</th>
                  <th className="px-6 py-4 text-center">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {records.map((record) => (
                  <tr key={record.id} className="text-xs text-gray-700 transition-colors hover:bg-blue-50/30">
                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                          record.statusTone === "success" && "border-emerald-100 bg-emerald-50 text-emerald-700",
                          record.statusTone === "info" && "border-blue-100 bg-blue-50 text-blue-700",
                          record.statusTone === "danger" && "border-rose-200 bg-rose-50 text-rose-700"
                        )}
                      >
                        {record.statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium" style={{ color: accentHex }}>
                      {record.certificateNo}
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-900">{record.contractor}</p>
                      <p className="mt-0.5 text-[10px] text-gray-500">{record.contractTitle}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start space-y-1">
                        <PrototypeBadge variant={getPrototypeBadgeVariantFromBucket(record.ruleBucketId)}>{record.ruleLabel}</PrototypeBadge>
                        <span className="text-[10px] font-medium text-gray-500">{record.variationLabel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {record.aiProgressTone === "danger" ? (
                        <span className="flex w-fit items-center rounded-md border border-rose-100 bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-600">
                          <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                          {record.aiProgressLabel}
                        </span>
                      ) : (
                        <span className="flex items-center text-[11px] font-bold text-emerald-600">
                          <CheckCircle2 className="mr-1.5 h-4 w-4" />
                          {record.aiProgressLabel}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right text-[13px] font-bold text-gray-900">{formatAmount(record.amountValue)}</td>
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
    </div>
  );
}

function PaymentValuationView({ records }: { records: PaymentValuationRecord[] }) {
  const [reviewingRecord, setReviewingRecord] = useState<PaymentValuationRecord | null>(null);
  const [hoveredRecordId, setHoveredRecordId] = useState<string | null>(records[0]?.id ?? null);
  const activeRecord = records.find((record) => record.id === hoveredRecordId) ?? records[0] ?? null;

  if (!reviewingRecord) {
    return (
      <div className="flex h-full flex-col space-y-6 animate-in fade-in duration-500 font-sans">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-2.5 text-purple-600">
              <MapIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">GIS / BIM Site Map</h2>
              <p className="text-[10px] font-medium text-gray-500">Eagle Eye camera deployment network &amp; AI Progress Valuation</p>
            </div>
          </div>
        </div>

        <div className="grid min-h-[640px] flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="relative flex h-[640px] flex-col overflow-hidden border-gray-200 hover:shadow-sm lg:col-span-2">
            <div className="absolute right-16 top-4 z-20 flex items-center space-x-4 rounded-full border border-gray-100 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-600">
                <div className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <span>Normal</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-600">
                <div className="h-2.5 w-2.5 rounded-full bg-[#F43F5E]" />
                <span>Lagging / Flagged</span>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden bg-[#E2E8F0]">
              <PaymentSiteMap
                records={records}
                activeRecord={activeRecord}
                siteViewport={paymentSiteViewport}
                onFocusRecord={(record) => setHoveredRecordId(record.id)}
                onOpenRecord={(record) => {
                  setHoveredRecordId(record.id);
                  setReviewingRecord(record);
                }}
              />
            </div>
          </Card>

          <Card className="flex h-[640px] flex-col border-gray-200 bg-white p-5 shadow-sm hover:shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Monitored Zones</h3>
              <PrototypeBadge variant="info" className="border-[#91D5FF] bg-[#E6F7FF] text-[#1890FF]">
                3 ACTIVE
              </PrototypeBadge>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pb-4">
              {records.map((record) => {
                const isNormal = record.statusTone === "success";
                const isMatched = record.claimPercent === record.aiPercent;

                return (
                  <button
                    type="button"
                    key={record.id}
                    className={cn(
                      "group w-full cursor-pointer rounded-xl border p-4 text-left transition-all",
                      activeRecord?.id === record.id ? "border-[#1890FF] bg-blue-50/10 shadow-md" : "border-gray-200 hover:border-[#1890FF] hover:shadow-sm"
                    )}
                    onMouseEnter={() => setHoveredRecordId(record.id)}
                    onFocus={() => setHoveredRecordId(record.id)}
                    onClick={() => {
                      setHoveredRecordId(record.id);
                      setReviewingRecord(record);
                    }}
                  >
                    <div className="mb-1.5 flex items-start justify-between">
                      <h4 className="text-sm font-bold text-gray-900">{record.zoneLabel}</h4>
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                          isNormal ? "bg-emerald-50 text-[#10B981]" : "bg-rose-50 text-[#F43F5E]"
                        )}
                      >
                        {record.statusLabel}
                      </span>
                    </div>
                    <p className="mb-5 text-[10px] text-gray-500">Eagle Eye + Progress Agent active</p>

                    <div className="space-y-3.5">
                      <div>
                        <div className="mb-1.5 flex justify-between text-[10px] font-bold">
                          <span className={isMatched ? "text-[#10B981]" : "text-[#F43F5E]"}>AI Verified Progress</span>
                          <span className="text-gray-900">{record.aiPercent}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className={cn("h-full rounded-full", isMatched ? "bg-[#10B981]" : "bg-[#F43F5E]")}
                            style={{ width: `${record.aiPercent}%` }}
                          />
                        </div>
                      </div>

                      {!isMatched ? (
                        <div>
                          <div className="mb-1.5 flex justify-between text-[10px] font-bold text-gray-500">
                            <span>Contractor Claim</span>
                            <span>{record.claimPercent}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-gray-400" style={{ width: `${record.claimPercent}%` }} />
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                      <span className={cn("text-[9px] font-bold uppercase tracking-widest", isNormal ? "text-gray-400" : "text-[#F43F5E]")}>
                        {record.deviationLabel}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-[#1890FF]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const isCompleted = reviewingRecord.statusTone === "success";
  const exposureValue = reviewingRecord.claimAmountValue - reviewingRecord.aiAmountValue;

  return (
    <div className="flex h-full flex-col space-y-4 animate-in slide-in-from-right-4 duration-300 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setReviewingRecord(null)}
            className="flex items-center rounded-md p-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to GIS Map
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Zone Inspection: {reviewingRecord.zoneLabel}</h2>
            <p className="text-[10px] font-medium text-gray-500">
              {reviewingRecord.contractor} - {reviewingRecord.contractTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid min-h-[560px] flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="relative flex h-[560px] flex-col overflow-hidden border-gray-200 bg-gray-100 shadow-sm hover:shadow-sm lg:col-span-2">
          <div className="absolute left-4 top-4 z-10 flex items-center space-x-2 rounded-md bg-white/90 px-3 py-1.5 text-[10px] font-bold text-gray-800 shadow-sm backdrop-blur">
            <Camera className="h-3.5 w-3.5 text-[#208A9B]" />
            <span>Eagle Eye 360° Source: {reviewingRecord.cameraLabel}</span>
          </div>

          <div className="relative flex h-full w-full flex-1 items-center justify-center bg-[#0F172A]">
            <div className="absolute inset-4">
              <Image
                src={EAGLE_EYE_IMAGE}
                alt={`Eagle Eye inspection for ${reviewingRecord.zoneLabel}`}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-contain object-center opacity-95"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(2,6,23,0.16)_100%)]" />
          </div>
        </Card>

        <Card className="flex flex-col border-gray-200 p-6 shadow-sm hover:shadow-sm">
          <h3 className="mb-6 border-b border-gray-100 pb-3 text-sm font-bold uppercase tracking-widest text-gray-900">
            Progress Agent Assessment
          </h3>

          <div className="flex-1 space-y-6">
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">% Completion Discrepancy</p>

              <div>
                <div className="mb-1.5 flex justify-between text-[11px] font-bold text-gray-700">
                  <span>Contractor Claim</span>
                  <span className="text-amber-600">{reviewingRecord.claimPercent}%</span>
                </div>
                <div className="h-3 w-full rounded-r-full bg-gray-100 shadow-inner">
                  <div className="h-3 rounded-r-full bg-amber-400" style={{ width: `${reviewingRecord.claimPercent}%` }} />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex justify-between text-[11px] font-bold text-gray-700">
                  <span>Jarvis AI Detected</span>
                  <span className="text-emerald-600">{reviewingRecord.aiPercent}%</span>
                </div>
                <div className="h-3 w-full rounded-r-full bg-gray-100 shadow-inner">
                  <div className="h-3 rounded-r-full bg-emerald-500" style={{ width: `${reviewingRecord.aiPercent}%` }} />
                </div>
              </div>
            </div>

            {!isCompleted ? (
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-5 shadow-sm">
                <p className="mb-2 flex items-center text-[10px] font-bold uppercase tracking-widest text-rose-500">
                  <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                  AI Discrepancy Notes
                </p>
                <p className="text-xs font-bold leading-relaxed text-rose-900">{reviewingRecord.issueLabel}</p>
                <div className="mt-4 flex items-center justify-between border-t border-rose-200/50 pt-4 text-[11px]">
                  <span className="font-medium text-rose-700">Financial Exposure Risk:</span>
                  <span className="text-sm font-bold text-rose-600">${formatAmount(exposureValue)}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            {!isCompleted ? (
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-[#208A9B] py-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#1a7584]">
                  Adjust to AI Progress ({reviewingRecord.aiPercent}%)
                </button>
                <button className="w-full rounded-lg border border-rose-200 bg-white py-3 text-[11px] font-bold uppercase tracking-widest text-rose-600 shadow-sm transition-colors hover:bg-rose-50">
                  Reject Valuation Claim
                </button>
              </div>
            ) : (
              <button className="w-full rounded-lg bg-[#10B981] py-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#059669]">
                Certify &amp; Proceed to Payment
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function VariationOrderView({ records }: { records: PaymentVariationRecord[] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-amber-100 bg-amber-50 p-2.5 text-amber-600">
            <FileWarning className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Variation Order / CE Management</h2>
            <p className="text-[10px] font-medium text-gray-500">Real-Time integration of NEC Compensation Events and GCC VOs</p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="border-b border-gray-200 bg-gray-50/80 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <tr>
                <th className="px-6 py-4">VO / CE ID</th>
                <th className="px-6 py-4">Description &amp; Contractor</th>
                <th className="px-6 py-4 text-right">Est. Amount ($)</th>
                <th className="px-6 py-4">Contract Rule</th>
                <th className="px-6 py-4">Status &amp; SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {records.map((record) => (
                <tr key={record.id} className="text-xs text-gray-700 transition-colors hover:bg-blue-50/30">
                  <td className="px-6 py-4 font-mono font-bold text-amber-600">{record.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{record.description}</p>
                    <p className="text-[10px] text-gray-500">{record.contractor}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{formatAmount(record.estimatedAmountValue)}</td>
                  <td className="px-6 py-4">
                    <PrototypeBadge variant={record.ruleTone === "warning" ? "purple" : "info"}>{record.ruleLabel}</PrototypeBadge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start space-y-1">
                      <span className="font-bold text-gray-700">{record.statusLabel}</span>
                      {record.daysLeftLabel ? (
                        <span className="flex items-center text-[10px] font-bold text-rose-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {record.daysLeftLabel} left
                        </span>
                      ) : null}
                    </div>
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
      <FileEdit className="mb-4 h-12 w-12 opacity-20 text-[#208A9B]" />
      <p className="text-sm">
        View for <strong className="text-gray-600">{label}</strong> is under development.
      </p>
    </div>
  );
}

export function PaymentPage() {
  const [activeSubmodule, setActiveSubmodule] = useState<PaymentSubmoduleId>("Valuation");

  const activeSubmoduleLabel = paymentSubmenuItems.find(
    (item): item is Extract<PaymentSidebarItem, { type: "link" }> => item.type === "link" && item.id === activeSubmodule
  )?.label;

  return (
    <div className="min-h-full bg-[#F0F2F5]">
      <div className="flex min-h-full">
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
          <nav className="flex-1 overflow-y-auto py-4">
            {paymentSubmenuItems.map((item, index) => {
              if (item.type === "search") {
                return (
                  <div key={`search-${index}`} className="mb-4 mt-2 px-4">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder={item.placeholder}
                        className="w-full rounded-full border border-gray-300 py-1.5 pl-3 pr-8 text-xs focus:border-[#1890FF] focus:outline-none"
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
                <span className="text-[#208A9B]">Payment</span>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <button
                onClick={() => setActiveSubmodule("Overview")}
                className="rounded bg-[#208A9B] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#1a7584]"
              >
                Overview Dashboard
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search SSOT data..."
                  className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-4 text-xs outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#208A9B]"
                />
              </div>

              <button className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100">
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
              {activeSubmodule === "Tasks" ? <PendingTasksView tasks={paymentPendingTasks} /> : null}
              {activeSubmodule === "Overview" ? <PaymentDashboardView /> : null}
              {activeSubmodule === "MC_List" ? (
                <PaymentLedgerView
                  title="Payment for MC List"
                  accentHex="#208A9B"
                  totalLabel="Total payment"
                  searchLabel="Payment Certificate No."
                  records={paymentMcCertificates}
                  buckets={paymentMcRuleBuckets}
                />
              ) : null}
              {activeSubmodule === "NSC_List" ? (
                <PaymentLedgerView
                  title="Payment for NSC List"
                  accentHex="#5C6BC0"
                  totalLabel="Total NSC payment"
                  searchLabel="NSC Certificate No."
                  records={paymentNscCertificates}
                  buckets={paymentNscRuleBuckets}
                />
              ) : null}
              {activeSubmodule === "Valuation" ? <PaymentValuationView records={paymentValuationRecords} /> : null}
              {activeSubmodule === "VO" ? <VariationOrderView records={paymentVariationRecords} /> : null}
              {activeSubmodule === "CC" || activeSubmodule === "Processed" || activeSubmodule === "Initiated" ? (
                <PlaceholderView label={activeSubmoduleLabel ?? "Selected View"} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
