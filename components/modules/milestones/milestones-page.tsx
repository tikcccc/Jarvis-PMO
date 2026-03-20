import { CheckCircle2, Clock, Database, ExternalLink, FileText, Milestone, Split, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import { milestoneImpactRows, milestoneLogs, milestones, milestoneStats } from "@/lib/mock-data/milestones";
import type { Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const borderToneClassMap: Record<Tone, string> = {
  default: "border-l-gray-300",
  info: "border-l-blue-500",
  success: "border-l-emerald-500",
  warning: "border-l-amber-500",
  danger: "border-l-rose-500"
};

export function MilestonesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {milestoneStats.map((stat) => {
          const Icon = getIcon(stat.icon);

          return (
            <Card key={stat.id} className={cn("p-4 border-l-4", borderToneClassMap[stat.tone])}>
              <p className="jarvis-text-10 font-bold text-gray-400 uppercase">{stat.label}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <Icon className="w-5 h-5 text-current" />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="jarvis-title-md flex items-center uppercase tracking-tight">
              <Milestone className="w-4 h-4 mr-2 text-blue-500" />
              Horizon Estate Development: Big Picture Timeline
            </h3>
            <Button variant="secondary" size="sm">
              <UploadCloud className="w-3 h-3" /> Ingest P6 Plan
            </Button>
          </div>

          <div className="p-0">
            {milestones.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex items-start px-8 py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                {index !== milestones.length - 1 ? (
                  <div className="absolute left-[39.5px] top-12 bottom-0 w-px bg-gray-100" />
                ) : null}

                <div
                  className={cn(
                    "z-10 w-4 h-4 rounded-full mt-1.5 border-4 border-white shadow-sm shrink-0",
                    item.status === "Completed"
                      ? "bg-emerald-500"
                      : item.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-gray-200"
                  )}
                />

                <div className="ml-8 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="jarvis-text-10 font-black uppercase tracking-widest leading-none text-gray-300">{item.stage}</span>
                      <h4 className="jarvis-title-sm mt-0.5 transition-colors group-hover:text-blue-600">{item.title}</h4>
                      <div className="flex items-center mt-1 space-x-3">
                        <span className="jarvis-copy-xs flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> Plan Date: {item.plannedDate}
                        </span>
                        {item.agentVerified ? (
                          <span className="jarvis-text-10 flex items-center rounded bg-emerald-50 px-1.5 py-0.5 font-bold uppercase text-emerald-600">
                            <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Agent Verified
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <Badge tone={item.tone}>{item.status}</Badge>
                  </div>

                  {item.progressPercent ? (
                    <div className="mt-4">
                      <div className="jarvis-text-10 mb-1.5 flex justify-between font-bold">
                        <span className="text-gray-400">Jarvis Progress Detection (Vision AI)</span>
                        <span className="text-blue-600">{item.progressPercent}%</span>
                      </div>
                      <ProgressBar value={item.progressPercent} barClassName="bg-blue-500" />
                    </div>
                  ) : null}

                  {item.evidenceLabel ? (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="jarvis-text-10 flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-medium text-gray-500 transition-colors group-hover:border-blue-200">
                        <FileText className="w-3 h-3 mr-1.5 text-blue-500" />
                        {item.evidenceLabel}
                        <ExternalLink className="w-3 h-3 ml-2 cursor-pointer opacity-50 hover:opacity-100" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="jarvis-title-md mb-4 flex items-center">
              <Split className="w-4 h-4 mr-2 text-rose-500" /> Delay Impact Simulation
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <p className="jarvis-text-10 font-bold uppercase text-rose-600">Scenario: Current Piling Lag</p>
                <p className="jarvis-copy-sm mt-1 text-rose-800">
                  Current site evidence suggests a 4-day lag in Piling. Predicted impact on &quot;Superstructure
                  Commencement&quot; is <span className="font-bold">+3 Days</span> due to buffer compression.
                </p>
              </div>

              <div className="space-y-3">
                <p className="jarvis-text-10 border-b border-gray-50 pb-2 font-bold uppercase tracking-widest text-gray-400">
                  Downstream Effects
                </p>
                {milestoneImpactRows.map((row) => (
                  <div key={row.id} className="flex justify-between text-xs items-center">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="text-gray-900 font-bold">{row.value}</span>
                  </div>
                ))}
              </div>

              <Button variant="subtle" size="md" className="w-full rounded-xl">
                Optimize Critical Path
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="jarvis-title-md mb-4 flex items-center">
              <Database className="w-4 h-4 mr-2 text-gray-400" /> Intelligence Logs
            </h3>
            <div className="space-y-4">
              {milestoneLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3">
                  <div className="jarvis-text-10-tight mt-0.5 rounded bg-gray-100 px-1 py-0.5 font-black text-gray-500">{log.type}</div>
                  <div>
                    <p className="jarvis-copy-xs leading-tight text-gray-700">{log.message}</p>
                    <span className="jarvis-text-10 text-gray-400">{log.timeLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
