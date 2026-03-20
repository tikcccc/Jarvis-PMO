import { Activity, ChevronRight, Database, Eye, Scan } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { moduleMetaById } from "@/lib/mock-data/modules";
import type { ModuleMeta } from "@/lib/types";

interface GenericModulePageProps {
  moduleId: ModuleMeta["id"];
}

export function GenericModulePage({ moduleId }: GenericModulePageProps) {
  const moduleConfig = moduleMetaById[moduleId];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{moduleConfig.title}</h2>
          <p className="jarvis-page-copy mt-1">{moduleConfig.desc}</p>
        </div>
        <div className="flex space-x-2">
          <button type="button" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50">
            AUDIT LOGS
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 shadow-lg shadow-gray-200"
          >
            INITIATE AGENT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moduleConfig.sections.map((section) => (
          <Card key={section} className="p-5 border-l-4 border-l-gray-100 hover:border-l-blue-500 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Database className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              </div>
              <Badge tone="info">Synced</Badge>
            </div>
            <h4 className="jarvis-title-sm mb-1">{section}</h4>
            <p className="jarvis-copy-sm line-clamp-2">
              Managing SSOT records and automated agent workflows for {section.toLowerCase()}.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">Integrity 99.9%</span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Card>
        ))}
      </div>

      {moduleId === "progress" || moduleId === "payment" ? (
        <Card className="overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              <span className="jarvis-text-10 font-bold uppercase text-gray-900">Live Site Perception: Jarvis Eagle Eye</span>
            </div>
            <div className="flex space-x-2">
              <button type="button" className="p-1 hover:bg-gray-200 rounded">
                <Scan className="w-4 h-4 text-gray-500" />
              </button>
              <button type="button" className="p-1 hover:bg-gray-200 rounded">
                <Eye className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-[400px] bg-black relative flex items-center justify-center">
            <div className="absolute top-4 left-4 z-20 space-y-2">
              <div className="jarvis-text-10 rounded border border-white/20 bg-white/10 px-2 py-1 text-white backdrop-blur">
                AI Progress Agent: ACTIVE
              </div>
              <div className="jarvis-text-10 rounded border border-blue-500/30 bg-blue-500/20 px-2 py-1 font-bold tracking-tight text-blue-400 backdrop-blur">
                MEP Installation: 64.2% Detected
              </div>
            </div>
            <div className="text-center text-gray-600 space-y-4">
              <Activity className="w-12 h-12 mx-auto opacity-20" />
              <p className="jarvis-copy-sm uppercase tracking-widest text-gray-500">Connecting to Site Camera Network...</p>
            </div>
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-blue-500/50" />
              <div className="absolute top-1/4 right-1/4 w-32 h-12 border border-emerald-500/50" />
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
