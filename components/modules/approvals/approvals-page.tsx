"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Clock, ExternalLink, FileText, Filter, MoreVertical, Search, ShieldAlert, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { approvalConditionsByApprovalId, approvals, approvalStats } from "@/lib/mock-data/approvals";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState(approvals[0]);

  const selectedConditions = useMemo(
    () => approvalConditionsByApprovalId[selectedApproval.id] ?? approvalConditionsByApprovalId[1] ?? [],
    [selectedApproval.id]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {approvalStats.map((stat) => {
          const Icon = getIcon(stat.icon);
          return (
            <Card
              key={stat.id}
              className={cn(
                "p-4",
                stat.tone === "success" ? "bg-emerald-50/30 border-emerald-100" : "",
                stat.tone === "danger" ? "bg-rose-50/30 border-rose-100" : ""
              )}
            >
              <p className="jarvis-text-10 font-bold text-gray-400 uppercase">{stat.label}</p>
              <div className="flex items-center justify-between mt-1">
                <p className={cn("text-xl font-bold", stat.tone === "success" ? "text-emerald-600" : stat.tone === "danger" ? "text-rose-600" : "text-gray-900")}>
                  {stat.value}
                </p>
                <Icon className={cn("w-5 h-5", stat.tone === "success" ? "text-emerald-500" : stat.tone === "danger" ? "text-rose-500" : "text-blue-500")} />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Active Approval Workflows</h3>
          {approvals.map((approval) => (
            <Card
              key={approval.id}
              className={cn(
                "p-4 cursor-pointer transition-all",
                selectedApproval.id === approval.id ? "ring-2 ring-blue-500 bg-blue-50/10" : "hover:bg-gray-50"
              )}
              onClick={() => setSelectedApproval(approval)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge tone={approval.tone}>{approval.status}</Badge>
                <span className="jarvis-text-10 font-bold text-gray-400">{approval.lastUpdateLabel}</span>
              </div>
              <h4 className="jarvis-title-sm">{approval.title}</h4>
              <p className="jarvis-copy-xs mt-1">
                {approval.department} | {approval.reference}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-1">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={`${approval.id}-${index}`}
                      className="jarvis-text-10-tight flex w-5 h-5 items-center justify-center rounded-full border border-white bg-gray-100 font-bold text-gray-500"
                    >
                      JD
                    </div>
                  ))}
                </div>
                <span className="jarvis-text-10 font-bold text-gray-900">
                  {approval.closedCount}/{approval.conditionCount} Conditions
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={(approval.closedCount / approval.conditionCount) * 100} barClassName="bg-blue-500" />
              </div>
            </Card>
          ))}
          <button
            type="button"
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 py-3.5 text-gray-400 transition-[border-color,color,transform] duration-200 hover:border-blue-200 hover:text-blue-500 motion-safe:hover:-translate-y-px"
          >
            <UploadCloud className="w-5 h-5 mb-1" />
            <span className="jarvis-control-label text-current">Upload New Approval Letter</span>
          </button>
        </div>

        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div>
              <h3 className="jarvis-title-md">{selectedApproval.title}</h3>
              <p className="jarvis-copy-xs tracking-tight">
                Condition Management (Zero-Forgotten-Conditions Engine)
              </p>
            </div>
            <div className="flex space-x-2">
              <IconButton variant="surface">
                <Filter className="w-4 h-4 text-gray-400" />
              </IconButton>
              <IconButton variant="surface">
                <Search className="w-4 h-4 text-gray-400" />
              </IconButton>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {selectedConditions.map((condition) => (
              <div key={condition.id} className="p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        condition.tone === "danger"
                          ? "bg-rose-500 animate-pulse"
                          : condition.status === "Fulfilled"
                            ? "bg-emerald-500"
                        : "bg-blue-500"
                      )}
                    />
                    <span className="jarvis-text-10 font-black uppercase tracking-widest text-gray-400">{condition.type} Condition</span>
                  </div>
                  <span className={cn("jarvis-text-10 font-bold", condition.tone === "danger" ? "text-rose-600" : "text-gray-400")}>
                    {condition.status === "Fulfilled" ? "FULFILLED" : `DEADLINE: ${condition.deadline}`}
                  </span>
                </div>

                <p className="text-xs font-medium text-gray-800 leading-relaxed mb-4">{condition.content}</p>

                {condition.progressPercent ? (
                  <div className="mb-4">
                    <div className="jarvis-text-10 mb-1 flex justify-between font-bold">
                      <span className="text-gray-400">Agent Verification Progress</span>
                      <span className="text-blue-600">{condition.progressPercent}%</span>
                    </div>
                    <ProgressBar value={condition.progressPercent} barClassName="bg-blue-500" />
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {condition.evidenceLabel ? (
                      <div className="jarvis-text-10 flex items-center rounded border border-emerald-100 bg-emerald-50 px-2 py-1 font-bold text-emerald-700">
                        <FileText className="w-3 h-3 mr-1.5" /> {condition.evidenceLabel}
                      </div>
                    ) : (
                      <div className="jarvis-text-10 flex items-center rounded border border-gray-100 bg-gray-50 px-2 py-1 font-bold italic text-gray-400">
                        No Evidence Linked
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton size="sm" variant="blue">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </IconButton>
                    <IconButton size="sm">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-rose-50/50 border-t border-rose-100">
            <div className="flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <h4 className="jarvis-title-sm text-rose-900">Delay Impact Alert: Heritage Endorsement</h4>
                <p className="jarvis-text-11-relaxed mt-1 text-rose-800/80">
                  Condition 103 (Heritage Wall) is currently 3 days from deadline with no evidence linked. Delaying this
                  will block &quot;Site Clearance Zone C&quot;, impacting master completion by <span className="font-bold">+5 Days</span>.
                </p>
                <div className="mt-3 flex space-x-4">
                  <Button variant="dangerText" size="inline">
                    <ArrowRightLeft className="w-3 h-3" /> Simulation Report
                  </Button>
                  <Button variant="dangerText" size="inline">
                    <Clock className="w-3 h-3" /> Request Extension
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
