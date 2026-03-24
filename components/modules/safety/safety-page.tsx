"use client";

import type { ECharts, EChartsOption } from "echarts";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpDown,
  Bell,
  Camera,
  ChevronRight,
  Globe,
  Layers,
  MapPin,
  Play,
  Search,
  ShieldAlert,
  Users,
  Wind
} from "lucide-react";

import { SafetySiteMap } from "@/components/modules/safety/safety-site-map";
import { Card } from "@/components/ui/card";
import {
  safetyCmpData,
  safetyCraneData,
  safetyDroneData,
  safetyEnvironmentData,
  safetyExcavationData,
  safetyGasData,
  safetyHoistData,
  safetyPersonnelData,
  safetySiteViewport,
  safetyStructuralData,
  safetyVideoData
} from "@/lib/mock-data/safety";
import type {
  SafetyCameraFeed,
  SafetyDeviceStatus,
  SafetyDistributionItem,
  SafetyDroneFinding,
  SafetyMapPoint,
  SafetyMetricCard,
  SafetyStatusIconKey,
  SafetyTrendChart,
  SafetyWorkerRecord,
  Tone
} from "@/lib/types";
import { cn } from "@/lib/utils";

type PrototypeBadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "dark";
type SafetySubmoduleId =
  | "cmp"
  | "video"
  | "personnel"
  | "crane"
  | "hoist"
  | "environment"
  | "excavation"
  | "gas"
  | "structural"
  | "drone";

type SafetySidebarItem = { id: SafetySubmoduleId; label: string; icon: LucideIcon; badge?: string };

const prototypeBadgeClassMap: Record<PrototypeBadgeVariant, string> = {
  default: "border border-gray-200 bg-gray-100 text-gray-700",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
  danger: "border border-rose-200 bg-rose-50 text-rose-700",
  info: "border border-blue-200 bg-blue-50 text-blue-700",
  dark: "border border-slate-700 bg-slate-800 text-slate-100"
};

const toneSurfaceClassMap: Record<Tone, string> = {
  default: "bg-gray-50 text-gray-600",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

const toneTextClassMap: Record<Tone, string> = {
  default: "text-gray-700",
  info: "text-blue-600",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600"
};

const toneStatusClassMap: Record<Tone, string> = {
  default: "border-gray-200 bg-gray-100 text-gray-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700"
};

const safetyIconMap: Record<SafetyStatusIconKey, LucideIcon> = {
  camera: Camera,
  shield: ShieldAlert,
  vehicle: ArrowUpDown,
  wind: Wind,
  alert: Bell,
  user: Users,
  activity: Activity,
  globe: Globe,
  mapPin: MapPin
};

const safetySubmenuItems: SafetySidebarItem[] = [
  { id: "cmp", label: "Central Management Platform", icon: Layers, badge: "LIVE" },
  { id: "video", label: "Smart Video Analytics", icon: Play, badge: "12" },
  { id: "personnel", label: "Personnel Location", icon: Users },
  { id: "crane", label: "Tower Crane Safety", icon: ShieldAlert },
  { id: "hoist", label: "Hoisting Monitoring", icon: ArrowUpDown },
  { id: "environment", label: "Environmental & Dust", icon: Wind, badge: "1" },
  { id: "excavation", label: "Excavation & Slopes", icon: MapPin, badge: "1" },
  { id: "gas", label: "Gas Detection", icon: Bell },
  { id: "structural", label: "Structural Health", icon: Activity },
  { id: "drone", label: "Drone Inspection", icon: Globe, badge: "2" }
];

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

function SafetyChart({ option, className }: { option: EChartsOption; className?: string }) {
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

      const instance = instanceRef.current ?? echarts.init(chartRef.current);
      instanceRef.current = instance;
      instance.setOption(option);
      handleResize();
    }

    initChart();
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, [option]);

  return <div ref={chartRef} className={className} />;
}

function DonutChart({ items, className }: { items: SafetyDistributionItem[]; className?: string }) {
  const option: EChartsOption = {
    tooltip: { trigger: "item" },
    color: items.map((item) => item.accentHex),
    series: [
      {
        type: "pie",
        radius: ["58%", "80%"],
        label: { show: false },
        itemStyle: { borderColor: "#fff", borderWidth: 2 },
        data: items.map((item) => ({
          value: item.value,
          name: item.label
        }))
      }
    ]
  };

  return <SafetyChart option={option} className={className} />;
}

function TrendChart({ chart, className }: { chart: SafetyTrendChart; className?: string }) {
  const seriesOptions = chart.series.map((series) => ({
    name: series.label,
    type: series.type,
    data: series.values,
    smooth: series.type === "line" ? (series.smooth ?? true) : undefined,
    barWidth: series.type === "bar" ? 18 : undefined,
    areaStyle: series.type === "line" && series.area ? { color: `${series.accentHex}1A` } : undefined,
    itemStyle:
      series.type === "bar"
        ? {
            color: (params: { value: number }) =>
              series.thresholdValue !== undefined && params.value > series.thresholdValue ? "#EF4444" : series.accentHex
          }
        : { color: series.accentHex },
    lineStyle: series.type === "line" ? { color: series.accentHex, width: 3 } : undefined,
    markLine:
      series.thresholdValue !== undefined
        ? {
            symbol: "none",
            label: { show: false },
            lineStyle: { color: series.tone === "danger" ? "#E11D48" : "#EF4444", type: "dashed" },
            data: [{ yAxis: series.thresholdValue }]
          }
        : undefined
  })) as EChartsOption["series"];

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255,255,255,0.95)",
      borderColor: "#E5E7EB",
      textStyle: { color: "#374151", fontSize: 11 }
    },
    legend:
      chart.series.length > 1
        ? {
            data: chart.series.map((series) => series.label),
            bottom: 0,
            icon: "circle",
            itemWidth: 8,
            itemHeight: 8,
            textStyle: { fontSize: 10, color: "#6B7280", fontWeight: "bold" }
          }
        : undefined,
    grid: {
      left: "4%",
      right: "4%",
      top: "10%",
      bottom: chart.series.length > 1 ? "16%" : "10%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: chart.series.every((series) => series.type === "bar"),
      data: chart.labels,
      axisLabel: { fontSize: 10, color: "#9CA3AF" },
      axisLine: { lineStyle: { color: "#E5E7EB" } }
    },
    yAxis: {
      type: "value",
      name: chart.unitLabel,
      min: chart.minValue,
      max: chart.maxValue,
      nameTextStyle: { color: "#9CA3AF", fontSize: 10, padding: [0, 0, 0, 0] },
      axisLabel: { fontSize: 10, color: "#9CA3AF" },
      splitLine: { lineStyle: { color: "#E5E7EB", type: "dashed" } }
    },
    series: seriesOptions
  };

  return <SafetyChart option={option} className={className} />;
}

function GaugeChart({ value, className }: { value: number; className?: string }) {
  const option: EChartsOption = {
    series: [
      {
        type: "gauge",
        progress: { show: true, width: 10, itemStyle: { color: "#8B5CF6" } },
        axisLine: { lineStyle: { width: 10, color: [[1, "#E5E7EB"]] } },
        axisTick: { show: false },
        splitLine: { length: 12, lineStyle: { width: 2, color: "#CBD5E1" } },
        axisLabel: { color: "#9CA3AF", fontSize: 10 },
        pointer: { width: 5, itemStyle: { color: "#6D28D9" } },
        detail: { valueAnimation: true, formatter: "{value}%", fontSize: 22, color: "#111827", offsetCenter: [0, "70%"] },
        title: { offsetCenter: [0, "100%"], color: "#6B7280", fontSize: 11, fontWeight: "bold" },
        data: [{ value, name: "Current Load" }]
      }
    ]
  };

  return <SafetyChart option={option} className={className} />;
}

function MetricTile({ metric, className }: { metric: SafetyMetricCard; className?: string }) {
  const Icon = safetyIconMap[metric.icon];

  return (
    <Card className={cn("flex items-center justify-between border-gray-200 p-4 shadow-sm hover:shadow-sm", className)}>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{metric.label}</p>
        <p className={cn("mt-2 text-2xl font-black leading-none", toneTextClassMap[metric.tone])}>{metric.valueLabel}</p>
        {metric.detailLabel ? <p className="mt-2 text-[11px] font-medium text-gray-500">{metric.detailLabel}</p> : null}
      </div>
      <div className={cn("rounded-xl p-3", toneSurfaceClassMap[metric.tone])}>
        <Icon className="h-5 w-5" />
      </div>
    </Card>
  );
}

function CameraFeedCard({
  feed,
  className,
  children
}: {
  feed: SafetyCameraFeed;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-gray-200 bg-slate-900", className)}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
        style={{
          backgroundImage: feed.imageUrl
            ? `linear-gradient(180deg, rgba(15,23,42,0.2), rgba(15,23,42,0.45)), url("${feed.imageUrl}")`
            : "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(2,6,23,0.18)_100%)]" />
      <div className="absolute left-0 top-0 flex w-full items-start justify-between bg-gradient-to-b from-black/70 to-transparent p-3">
        <span className="text-xs font-semibold text-white drop-shadow">{feed.title}</span>
        <span
          className={cn(
            "rounded border px-1.5 py-0.5 text-[9px] font-bold",
            feed.tone === "danger"
              ? "border-rose-400/60 bg-rose-500/20 text-rose-200"
              : feed.tone === "warning"
                ? "border-amber-400/60 bg-amber-500/20 text-amber-100"
                : "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
          )}
        >
          {feed.statusLabel}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/85 drop-shadow">{feed.timeLabel}</div>
      {feed.noteLabel ? (
        <div className="absolute bottom-3 right-3 rounded border border-white/15 bg-black/35 px-2 py-1 text-[10px] font-bold text-white/80 backdrop-blur">
          {feed.noteLabel}
        </div>
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">{children}</div>
    </div>
  );
}

function ViewHeader({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">{title}</h2>
        {description ? <p className="mt-1 text-[11px] font-medium text-gray-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function DeviceStatusRow({ item }: { item: SafetyDeviceStatus }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-gray-900">{item.label}</p>
          {item.detailLabel ? <p className="mt-1 text-[10px] text-gray-500">{item.detailLabel}</p> : null}
        </div>
        <span className={cn("rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider", toneStatusClassMap[item.tone])}>
          {item.statusLabel}
        </span>
      </div>
    </div>
  );
}

function WorkerRow({ worker }: { worker: SafetyWorkerRecord }) {
  return (
    <tr className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50/20">
      <td className="px-3 py-3">
        <p className="text-xs font-bold text-gray-900">{worker.name}</p>
        <p className="text-[10px] text-gray-500">
          {worker.tradeLabel} / {worker.id}
        </p>
      </td>
      <td className="px-3 py-3 text-xs text-gray-600">{worker.zoneLabel}</td>
      <td className="px-3 py-3">
        <span className={cn("rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider", toneStatusClassMap[worker.tone])}>
          {worker.statusLabel}
        </span>
      </td>
    </tr>
  );
}

function CentralManagementView() {
  const [activePoint, setActivePoint] = useState<SafetyMapPoint>(safetyCmpData.mapPoints[0]);
  const eLockTotal = safetyCmpData.lockDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Central Management Platform"
        description="DevB compliance feed, live site risk overlay, and command-center alert monitoring."
        action={<PrototypeBadge variant="info">DevB Auto-Reporting</PrototypeBadge>}
      />

      <div className="grid min-h-[680px] grid-cols-[18rem_minmax(0,1fr)_21rem] gap-4">
        <div className="space-y-4">
          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">E-Lock Info</h3>
                <p className="mt-1 text-[10px] font-medium text-gray-500">CMP device uptime snapshot</p>
              </div>
              <PrototypeBadge variant="success">100% Synced</PrototypeBadge>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24">
                <DonutChart items={safetyCmpData.lockDistribution} className="h-full w-full" />
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-gray-900">{eLockTotal}</div>
              </div>
              <div className="space-y-2">
                {safetyCmpData.lockDistribution.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.accentHex }} />
                    {item.label}: {item.value}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-3 text-sm font-bold text-orange-600">
              Alert Count: <span className="text-xl">0</span>
            </div>
          </Card>

          <Card className="flex min-h-[360px] flex-col border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Safety Video Status</h3>
              <PrototypeBadge variant="success">3 Feeds</PrototypeBadge>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {safetyCmpData.videoStatuses.map((item) => (
                <DeviceStatusRow key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">AI Monitoring</p>
              <p className="mt-1 text-3xl font-black text-gray-900">50</p>
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden border-gray-200 p-0 shadow-sm hover:shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">GIS / Device Overlay</h3>
              <p className="text-[10px] font-medium text-gray-500">Project location and all smart safety devices</p>
            </div>
            <PrototypeBadge variant="dark">All Devices</PrototypeBadge>
          </div>
          <div className="h-[610px] bg-[#E2E8F0]">
            <SafetySiteMap
              points={safetyCmpData.mapPoints}
              activePoint={activePoint}
              siteViewport={safetySiteViewport}
              onFocusPoint={setActivePoint}
              onOpenPoint={setActivePoint}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Today&apos;s Alerts</h3>
              <PrototypeBadge variant="warning">10 Total</PrototypeBadge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {safetyCmpData.alertMetrics.map((metric) => {
                const Icon = safetyIconMap[metric.icon];

                return (
                  <div key={metric.id} className="rounded-xl border border-gray-100 bg-gray-50/60 p-3 text-center">
                    <div className={cn("mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full", toneSurfaceClassMap[metric.tone])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{metric.label}</p>
                    <p className="mt-1 text-2xl font-black text-gray-900">{metric.valueLabel}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="flex min-h-[280px] flex-col border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Hong Kong Observatory</h3>
                <p className="mt-1 text-[10px] font-medium text-gray-500">{safetyCmpData.weather.updatedLabel}</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                <Wind className="h-4 w-4" />
              </div>
            </div>
            <p className="line-clamp-5 text-[11px] leading-relaxed text-gray-500">{safetyCmpData.weather.summary}</p>
            <div className="mt-auto rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">{safetyCmpData.weather.conditionLabel}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-3xl font-black text-gray-900">{safetyCmpData.weather.temperatureLabel}</p>
                <p className="text-xs font-bold text-gray-500">Humidity: {safetyCmpData.weather.humidityLabel}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SmartVideoAnalyticsView() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Smart Video Analytics"
        action={
          <div className="flex rounded-lg bg-gray-100 p-1 text-xs font-bold">
            <button className="rounded-md bg-white px-3 py-1.5 text-blue-600 shadow-sm">Live Feed</button>
            <button className="px-3 py-1.5 text-gray-500">AI Alerts (12)</button>
          </div>
        }
      />

      <div className="grid min-h-[660px] grid-cols-[minmax(0,1fr)_21rem] gap-4">
        <div className="grid grid-cols-2 gap-4">
          {safetyVideoData.feeds.map((feed) => (
            <CameraFeedCard key={feed.id} feed={feed} className="min-h-[310px]">
              <button className="rounded-full border border-white/40 bg-white/15 p-3 text-white backdrop-blur">
                <Play className="h-4 w-4" />
              </button>
            </CameraFeedCard>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Camera Status</p>
                <p className="mt-2 text-2xl font-black text-gray-900">
                  50 <span className="text-xs font-medium text-gray-400">/ 52 Online</span>
                </p>
              </div>
              <div className="relative h-16 w-16">
                <DonutChart items={safetyVideoData.statusDistribution} className="h-full w-full" />
              </div>
            </div>
          </Card>

          <Card className="flex min-h-[560px] flex-col border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-gray-900">Today&apos;s AI Alerts</h3>
              <p className="mt-1 text-[10px] font-medium text-gray-500">Helmet, vest, smoking, and unauthorized access recognition</p>
            </div>
            <TrendChart chart={safetyVideoData.alertTrend} className="mb-4 h-40 w-full border-b border-gray-100 pb-3" />
            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {safetyVideoData.alerts.map((alert) => (
                <DeviceStatusRow key={alert.id} item={alert} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PersonnelLocationView() {
  const [activePoint, setActivePoint] = useState<SafetyMapPoint>(safetyPersonnelData.mapPoints[0]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Personnel Location & Attendance"
        action={<button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-sm">Export Roster</button>}
      />

      <div className="grid min-h-[640px] grid-cols-[minmax(0,1fr)_21rem] gap-4">
        <Card className="overflow-hidden border-gray-200 p-0 shadow-sm hover:shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">Workforce Heatmap</h3>
              <p className="text-[10px] font-medium text-gray-500">UWB and gate data aligned to the site model</p>
            </div>
            <PrototypeBadge variant="info">142 Workers</PrototypeBadge>
          </div>
          <div className="h-[580px] bg-[#E2E8F0]">
            <SafetySiteMap
              points={safetyPersonnelData.mapPoints}
              activePoint={activePoint}
              siteViewport={safetySiteViewport}
              onFocusPoint={setActivePoint}
              onOpenPoint={setActivePoint}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Total On-Site</p>
                <p className="mt-2 text-3xl font-black text-gray-900">142</p>
                <p className="mt-1 text-xs font-medium text-gray-500">Workers tracked across active zones</p>
              </div>
              <div className="h-20 w-20">
                <DonutChart items={safetyPersonnelData.workforceDistribution} className="h-full w-full" />
              </div>
            </div>
          </Card>

          <Card className="flex min-h-[472px] flex-col border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Active Roster</h3>
                <p className="mt-1 text-[10px] font-medium text-gray-500">Searchable attendance and last-known zone</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ID..."
                  className="w-28 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-xs outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto rounded-xl border border-gray-100">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-3 py-3">Worker</th>
                    <th className="px-3 py-3">Zone</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {safetyPersonnelData.roster.map((worker) => (
                    <WorkerRow key={worker.id} worker={worker} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TowerCraneView() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Tower Crane & Plant Safety"
        action={<button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 shadow-sm">Equipment List</button>}
      />

      <div className="grid grid-cols-4 gap-4">
        {safetyCraneData.metrics.slice(0, 3).map((metric) => (
          <MetricTile key={metric.id} metric={metric} />
        ))}
        <Card className="flex items-center justify-between border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Cert Validity</p>
            <p className="mt-2 text-2xl font-black text-gray-900">100%</p>
            <p className="mt-2 text-[11px] font-medium text-gray-500">12 valid / 2 expiring</p>
          </div>
          <div className="h-14 w-14">
            <DonutChart items={safetyCraneData.certDistribution} className="h-full w-full" />
          </div>
        </Card>
      </div>

      <div className="grid min-h-[520px] grid-cols-[minmax(0,1fr)_21rem] gap-4">
        <Card className="flex flex-col border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Crane 1 - Load Moment Indicator (LMI)</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">Real-time load profile with threshold guardrail</p>
          </div>
          <TrendChart chart={safetyCraneData.loadTrend} className="h-[420px] w-full" />
        </Card>

        <div className="space-y-4">
          <Card className="border-gray-200 p-2 shadow-sm hover:shadow-sm">
            <CameraFeedCard feed={safetyCraneData.cameraFeed} className="h-[248px]" />
          </Card>
          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-gray-900">Lifting Permits (PTL)</h3>
              <p className="mt-1 text-[10px] font-medium text-gray-500">Permit-to-lift workflow status</p>
            </div>
            <div className="space-y-3">
              {safetyCraneData.permits.map((item) => (
                <DeviceStatusRow key={item.id} item={item} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function HoistingMonitoringView() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader title="Hoisting Monitoring" action={<PrototypeBadge variant="success">System Active</PrototypeBadge>} />

      <div className="grid min-h-[560px] grid-cols-[minmax(0,1fr)_21rem] gap-4">
        <Card className="border-gray-200 p-5 shadow-sm hover:shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Hoist A (Passenger & Material)</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">Load, speed, and operator authorization in one surface</p>
          </div>
          <div className="grid grid-cols-[18rem_minmax(0,1fr)] gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <GaugeChart value={safetyHoistData.loadPercent} className="h-60 w-full" />
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <TrendChart chart={safetyHoistData.speedTrend} className="h-60 w-full" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {safetyHoistData.statusMetrics.map((metric) => (
              <MetricTile key={metric.id} metric={metric} className="min-h-[112px]" />
            ))}
          </div>
        </Card>

        <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900">Live Camera Feed</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">Cabin verification and occupancy trace</p>
          </div>
          <CameraFeedCard feed={safetyHoistData.cameraFeed} className="h-[440px]" />
        </Card>
      </div>
    </div>
  );
}

function EnvironmentalMonitoringView() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Environmental & Dust Monitoring"
        description="Real-time air quality, noise, and auto-sprinkler linkage for compliance-heavy periods."
      />

      <div className="grid grid-cols-4 gap-4">
        {safetyEnvironmentData.metrics.map((metric) => (
          <MetricTile key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid min-h-[420px] grid-cols-2 gap-4">
        <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900">Air Quality Trend (Today)</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">PM2.5 and PM10 thresholds for active works</p>
          </div>
          <TrendChart chart={safetyEnvironmentData.airTrend} className="h-[320px] w-full" />
        </Card>
        <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900">Site Noise Levels (dB)</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">Limit exceedance highlighted in red</p>
          </div>
          <TrendChart chart={safetyEnvironmentData.noiseTrend} className="h-[320px] w-full" />
        </Card>
      </div>
    </div>
  );
}

function ExcavationSlopesView() {
  const [activePoint, setActivePoint] = useState<SafetyMapPoint>(safetyExcavationData.mapPoints[0]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Excavation & Slopes Monitoring"
        action={<button className="rounded-lg bg-rose-500 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-sm">Emergency Evacuate</button>}
      />

      <div className="grid min-h-[580px] grid-cols-[minmax(0,1fr)_21rem] gap-4">
        <Card className="overflow-hidden border-gray-200 p-0 shadow-sm hover:shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">Danger-Zone GIS</h3>
              <p className="text-[10px] font-medium text-gray-500">Sensor and e-lock state on the excavation perimeter</p>
            </div>
            <PrototypeBadge variant="danger">Alarm Ready</PrototypeBadge>
          </div>
          <div className="h-[520px] bg-[#E2E8F0]">
            <SafetySiteMap
              points={safetyExcavationData.mapPoints}
              activePoint={activePoint}
              siteViewport={safetySiteViewport}
              onFocusPoint={setActivePoint}
              onOpenPoint={setActivePoint}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900">Soil Displacement Trend</h3>
            </div>
            <TrendChart chart={safetyExcavationData.displacementTrend} className="h-[220px] w-full" />
          </Card>

          <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-500" />
              <h3 className="text-sm font-bold text-gray-900">Danger Zone E-Locks</h3>
            </div>
            <div className="space-y-3">
              {safetyExcavationData.locks.map((item) => (
                <DeviceStatusRow key={item.id} item={item} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function GasDetectionView() {
  const [activePoint, setActivePoint] = useState<SafetyMapPoint>(safetyGasData.mapPoints[0]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader title="Gas Detection (Confined Spaces)" />

      <div className="grid grid-cols-3 gap-4">
        {safetyGasData.metrics.map((metric) => (
          <MetricTile key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid min-h-[430px] grid-cols-[minmax(0,1fr)_22rem] gap-4">
        <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900">Gas Trend - Basement Level 2</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">CO and H2S monitoring with fan automation threshold</p>
          </div>
          <TrendChart chart={safetyGasData.trend} className="h-[320px] w-full" />
        </Card>
        <Card className="overflow-hidden border-gray-200 p-0 shadow-sm hover:shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">Confined Space Map</h3>
              <p className="text-[10px] font-medium text-gray-500">Sensor node and exhaust linkage</p>
            </div>
            <PrototypeBadge variant="warning">1 Trigger</PrototypeBadge>
          </div>
          <div className="h-[320px] bg-[#E2E8F0]">
            <SafetySiteMap
              points={safetyGasData.mapPoints}
              activePoint={activePoint}
              siteViewport={safetySiteViewport}
              onFocusPoint={setActivePoint}
              onOpenPoint={setActivePoint}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function StructuralHealthView() {
  const [activePoint, setActivePoint] = useState<SafetyMapPoint>(safetyStructuralData.mapPoints[0]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader title="Structural Health Monitoring" action={<PrototypeBadge variant="success">Sensors Online 24/24</PrototypeBadge>} />

      <div className="grid min-h-[540px] grid-cols-[22rem_minmax(0,1fr)] gap-4">
        <Card className="overflow-hidden border-gray-200 p-0 shadow-sm hover:shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">Sensor GIS</h3>
              <p className="text-[10px] font-medium text-gray-500">Settlement and drift nodes on adjacent structures</p>
            </div>
            <PrototypeBadge variant="success">Safe</PrototypeBadge>
          </div>
          <div className="h-[470px] bg-[#E2E8F0]">
            <SafetySiteMap
              points={safetyStructuralData.mapPoints}
              activePoint={activePoint}
              siteViewport={safetySiteViewport}
              onFocusPoint={setActivePoint}
              onOpenPoint={setActivePoint}
            />
          </div>
        </Card>

        <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900">Settlement Trend - Adjacent Building (Sensor S1)</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">Daily monitored variance against warning threshold</p>
          </div>
          <TrendChart chart={safetyStructuralData.settlementTrend} className="h-[300px] w-full" />
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
            {safetyStructuralData.metrics.map((metric) => (
              <MetricTile key={metric.id} metric={metric} className="min-h-[108px]" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DroneInspectionView() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <ViewHeader
        title="Drone Inspection & AI Analysis"
        action={<button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-sm"><Play className="h-3.5 w-3.5" />Launch Auto-Mission</button>}
      />

      <div className="grid min-h-[560px] grid-cols-[minmax(0,1fr)_21rem] gap-4">
        <Card className="border-gray-200 p-2 shadow-sm hover:shadow-sm">
          <CameraFeedCard feed={safetyDroneData.cameraFeed} className="h-[520px]">
            <div className="pointer-events-none absolute left-[62%] top-[44%] flex h-24 w-24 items-end justify-center border-2 border-rose-500 bg-rose-500/20 pb-1 text-[9px] font-bold text-white">
              Missing Tie
            </div>
          </CameraFeedCard>
        </Card>

        <Card className="border-gray-200 p-4 shadow-sm hover:shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900">AI Defect Detection Log</h3>
            <p className="mt-1 text-[10px] font-medium text-gray-500">High-risk facade and scaffold findings from the latest flight</p>
          </div>
          <div className="space-y-3">
            {safetyDroneData.findings.map((finding: SafetyDroneFinding) => (
              <div key={finding.id} className={cn("rounded-xl border p-3", finding.severityTone === "danger" ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50")}>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      finding.severityTone === "danger" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {finding.severityLabel}
                  </span>
                  <span className="text-[10px] text-gray-400">{finding.timeLabel}</span>
                </div>
                <p className="mt-2 text-xs font-bold text-gray-900">{finding.title}</p>
                <p className="mt-1 text-[10px] text-gray-500">{finding.zoneLabel}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function SafetyPage() {
  const [activeSubmodule, setActiveSubmodule] = useState<SafetySubmoduleId>("cmp");

  return (
    <div className="min-h-full bg-[#F0F2F5]">
      <div className="flex min-h-full">
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
          <nav className="flex-1 overflow-y-auto py-4">
            {safetySubmenuItems.map((item) => {
              const isActive = activeSubmodule === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubmodule(item.id)}
                  className={cn(
                    "mx-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-xl px-4 py-2 transition-all",
                    isActive ? "bg-[#F0F7FF] text-[#1890FF] shadow-[inset_0_0_0_1px_rgba(24,144,255,0.14)]" : "text-gray-600 hover:bg-gray-50",
                    "pl-8"
                  )}
                >
                  <div className="flex min-w-0 items-center space-x-2.5">
                    <item.icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-[#1890FF]" : "text-gray-400")} />
                    <span className="truncate text-xs font-medium leading-5">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-[1px] text-[9px] font-bold leading-none",
                        item.badge === "LIVE" ? "bg-emerald-500 text-white" : "bg-[#FF4D4F] text-white"
                      )}
                    >
                      {item.badge}
                    </span>
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
                <span className="text-[#208A9B]">Safety</span>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <button
                onClick={() => setActiveSubmodule("cmp")}
                className="rounded bg-[#208A9B] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#1a7584]"
              >
                Safety Command
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Smart Site data..."
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
            {activeSubmodule === "cmp" ? <CentralManagementView /> : null}
            {activeSubmodule === "video" ? <SmartVideoAnalyticsView /> : null}
            {activeSubmodule === "personnel" ? <PersonnelLocationView /> : null}
            {activeSubmodule === "crane" ? <TowerCraneView /> : null}
            {activeSubmodule === "hoist" ? <HoistingMonitoringView /> : null}
            {activeSubmodule === "environment" ? <EnvironmentalMonitoringView /> : null}
            {activeSubmodule === "excavation" ? <ExcavationSlopesView /> : null}
            {activeSubmodule === "gas" ? <GasDetectionView /> : null}
            {activeSubmodule === "structural" ? <StructuralHealthView /> : null}
            {activeSubmodule === "drone" ? <DroneInspectionView /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
