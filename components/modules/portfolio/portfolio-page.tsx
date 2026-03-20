"use client";

import { useState } from "react";
import { ChevronRight, ExternalLink, Filter, Layers, Search } from "lucide-react";

import { PortfolioMap } from "@/components/modules/portfolio/portfolio-map";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import { portfolioProjectLogs, portfolioStats, projects } from "@/lib/mock-data/portfolio";
import type { Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneClassMap: Record<Tone, string> = {
  default: "bg-gray-50 text-gray-600",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600"
};

export function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {portfolioStats.map((stat) => {
          const Icon = getIcon(stat.icon);

          return (
            <Card key={stat.id} className="p-4 flex items-center space-x-4">
              <div className={cn("p-1.5 rounded-lg", toneClassMap[stat.tone])}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="jarvis-text-10 font-bold uppercase text-gray-400">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <Card className="lg:col-span-2 relative overflow-hidden group">
          <PortfolioMap projects={projects} selectedProject={selectedProject} onSelectProject={setSelectedProject} />
        </Card>

        <div className="space-y-4">
          <Card className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <Badge tone={selectedProject.tone}>{selectedProject.status}</Badge>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900">{selectedProject.name}</h3>
              </div>
              <button type="button" className="text-gray-400 hover:text-blue-500 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="jarvis-text-10 font-bold uppercase text-gray-400">Budget (EFC)</p>
                  <p className="text-sm font-bold text-gray-900">{selectedProject.budgetLabel}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="jarvis-text-10 font-bold uppercase text-gray-400">Land Status</p>
                  <p className="text-sm font-bold text-gray-900">{selectedProject.landStatus}</p>
                </div>
              </div>

              <div>
                <div className="jarvis-text-10 mb-2 flex justify-between font-bold uppercase">
                  <span className="text-gray-400">Government Approval</span>
                  <span className="text-blue-600">{selectedProject.approvalLabel}</span>
                </div>
                <ProgressBar value={selectedProject.approvalLabel} barClassName="bg-blue-500" />
              </div>

              <div className="space-y-3">
                <p className="jarvis-text-10 border-b border-gray-50 pb-2 font-bold uppercase tracking-widest text-gray-400">
                  SSOT Intelligence Logs
                </p>
                {portfolioProjectLogs.map((log) => {
                  const Icon = getIcon(log.icon);
                  return (
                    <div key={log.id} className="flex items-center space-x-3 group cursor-pointer">
                      <Icon className="h-3.5 w-3.5 text-gray-300 group-hover:text-blue-500" />
                      <div className="flex-1">
                        <p className="jarvis-copy-xs leading-none">{log.message}</p>
                        <span className="jarvis-text-10 text-gray-400">{log.timeLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-xs font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-black"
            >
              VIEW FULL PROJECT RECORD (SSOT)
            </button>
          </Card>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="jarvis-title-md flex items-center">
            <Layers className="w-4 h-4 mr-2 text-gray-400" />
            Project Portfolio Health Matrix
          </h3>
          <div className="flex space-x-2">
            <button type="button" className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-200">
              <Filter className="w-4 h-4 text-gray-400" />
            </button>
            <button type="button" className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="jarvis-text-10 bg-gray-50/20 border-b border-gray-50 font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Land Condition</th>
              <th className="px-6 py-4">Approval Progress</th>
              <th className="px-6 py-4">EFC Budget</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-gray-900">{project.name}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge tone={project.tone}>{project.status}</Badge>
                </td>
                <td className="jarvis-text-11 px-6 py-4 font-medium text-gray-600">{project.landStatus}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16">
                      <ProgressBar
                        value={project.approvalLabel}
                        barClassName={project.tone === "success" ? "bg-emerald-500" : "bg-blue-500"}
                      />
                    </div>
                    <span className="jarvis-text-10 font-bold text-gray-900">{project.approvalLabel}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-gray-900">{project.budgetLabel}</td>
                <td className="px-6 py-4 text-right">
                  <button type="button" className="p-1.5 text-gray-300 group-hover:text-blue-500 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
