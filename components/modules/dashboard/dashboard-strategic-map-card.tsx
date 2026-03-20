"use client";

import { useState } from "react";
import { Building2, FileCheck2, MapPinned } from "lucide-react";

import { PortfolioMap, type MarkerToneMode } from "@/components/modules/portfolio/portfolio-map";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projects } from "@/lib/mock-data/portfolio";
import { cn } from "@/lib/utils";

type StrategicLayer = "land" | "planning";

const strategicLayerConfig: Record<
  StrategicLayer,
  {
    title: string;
    subtitle: string;
    markerToneMode: MarkerToneMode;
    legend: Array<{ label: string; tone: "success" | "warning" | "danger" }>;
    metricLabel: string;
    value: (project: (typeof projects)[number]) => string;
    icon: typeof Building2;
  }
> = {
  land: {
    title: "LAND STATUS",
    subtitle: "Title readiness and site control",
    markerToneMode: "land",
    legend: [
      { label: "Cleared", tone: "success" },
      { label: "Pending", tone: "warning" },
      { label: "Contested", tone: "danger" }
    ],
    metricLabel: "Current Land Position",
    value: (project) => project.landStatus,
    icon: Building2
  },
  planning: {
    title: "PLANNING",
    subtitle: "Approval progression across portfolio",
    markerToneMode: "planning",
    legend: [
      { label: "80-100%", tone: "success" },
      { label: "40-79%", tone: "warning" },
      { label: "0-39%", tone: "danger" }
    ],
    metricLabel: "Approval Progress",
    value: (project) => project.approvalLabel,
    icon: FileCheck2
  }
};

export function DashboardStrategicMapCard() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [strategicLayer, setStrategicLayer] = useState<StrategicLayer>("land");
  const currentLayer = strategicLayerConfig[strategicLayer];
  const DetailIcon = currentLayer.icon;

  return (
    <Card className="h-full p-6 overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="jarvis-title-md">Portfolio Strategic Map (GIS)</h3>
          <p className="jarvis-copy-sm mt-1">{currentLayer.subtitle}</p>
        </div>
        <div className="flex space-x-2">
          {(["land", "planning"] as const).map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setStrategicLayer(layer)}
              className={cn(
                "jarvis-control-label-compact cursor-pointer rounded-lg px-3 py-1.5 transition-[background-color,color,transform] duration-200 motion-safe:hover:-translate-y-px",
                strategicLayer === layer ? "text-blue-600 bg-blue-50" : "text-gray-400 hover:bg-gray-50"
              )}
            >
              {strategicLayerConfig[layer].title}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[560px] xl:h-[600px] rounded-xl relative border border-gray-100 overflow-hidden">
        <PortfolioMap
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          markerToneMode={currentLayer.markerToneMode}
          showFallbackBanner={false}
          overlay={
            <div className="absolute left-4 bottom-4 z-20 max-w-[300px] rounded-2xl border border-white/80 bg-white/92 p-4 shadow-xl backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge tone={selectedProject.tone}>{selectedProject.status}</Badge>
                    <span className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Selected Asset</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-gray-900">{selectedProject.name}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <MapPinned className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 px-3 py-2">
                  <p className="jarvis-text-10 font-bold uppercase text-gray-400">Budget (EFC)</p>
                  <p className="text-xs font-bold text-gray-900">{selectedProject.budgetLabel}</p>
                </div>
                <div className="rounded-xl bg-gray-50 px-3 py-2">
                  <p className="jarvis-text-10 font-bold uppercase text-gray-400">{currentLayer.metricLabel}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <DetailIcon className="h-3.5 w-3.5 text-gray-400" />
                    <p className="text-xs font-bold text-gray-900">{currentLayer.value(selectedProject)}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {currentLayer.legend.map((item) => (
          <div key={item.label} className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                item.tone === "success" ? "bg-emerald-500" : item.tone === "warning" ? "bg-amber-500" : "bg-rose-500"
              )}
            />
            <span className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
