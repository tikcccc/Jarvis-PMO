import { ArrowRightLeft, ArrowUpRight, CheckCircle2, ExternalLink, Maximize2, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getIcon } from "@/lib/icons";
import { cashFlowBars, financeAuditRows, financeSummaryCards, highRiskVariationOrders } from "@/lib/mock-data/finance";

const financeIconClassMap = {
  funding: "bg-blue-50 text-blue-600",
  budget: "bg-slate-50 text-slate-600",
  "planned-contracts": "bg-indigo-50 text-indigo-600",
  "awarded-contracts": "bg-emerald-50 text-emerald-600",
  invoiced: "bg-amber-50 text-amber-600",
  paid: "bg-blue-50 text-blue-600",
  "vo-sum": "bg-rose-50 text-rose-600"
} as const;

export function FinancePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {financeSummaryCards.map((item) => {
          const Icon = getIcon(item.icon);

          return (
            <Card key={item.id} className="p-3 border-t-2" style={{ borderTopColor: item.color }}>
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1.5 rounded ${financeIconClassMap[item.id as keyof typeof financeIconClassMap]}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <Badge tone="info">SSOT</Badge>
              </div>
              <p className="jarvis-text-10 font-black uppercase tracking-tighter leading-none text-gray-400">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{item.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="jarvis-title-md uppercase tracking-tight">12-Month Cash Flow Forecast</h3>
              <p className="jarvis-copy-xs">Synced with Procurement &amp; Milestone Engine (T+0)</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="jarvis-text-10 font-bold text-gray-400">PLANNED</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="jarvis-text-10 font-bold text-gray-400">ACTUAL</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[250px] relative flex items-end justify-between px-2 pb-6 border-b border-gray-100">
            {cashFlowBars.map((bar) => (
              <div key={bar.id} className="w-12 group relative flex flex-col items-center">
                <div className="w-full bg-blue-100/50 rounded-t-sm transition-all group-hover:bg-blue-200" style={{ height: `${bar.height * 2}px` }} />
                <div
                  className={`absolute bottom-0 w-3 bg-blue-500 rounded-t-sm ${bar.actualHeight === 0 ? "opacity-0" : "opacity-100"}`}
                  style={{ height: `${bar.actualHeight * 2}px` }}
                />
                <span className="jarvis-text-10 absolute -bottom-6 font-bold uppercase tracking-tighter text-gray-400">
                  {bar.shortLabel}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="jarvis-text-10 font-bold uppercase text-gray-400">Projected ROI</p>
              <div className="flex items-center text-emerald-600">
                <span className="text-xl font-black">14.2%</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="jarvis-text-10 font-bold uppercase text-gray-400">Uncommitted Budget</p>
              <div className="flex items-center text-gray-900">
                <span className="text-xl font-black">$130M</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="jarvis-text-10 font-bold uppercase text-gray-400">Burn Rate (Avg)</p>
              <div className="flex items-center text-gray-900">
                <span className="text-xl font-black">
                  $18.5M<span className="text-xs font-medium text-gray-400">/mo</span>
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="jarvis-title-md uppercase">VO Tracking (Black Box)</h3>
              <button type="button" className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="jarvis-text-10 mb-1.5 flex justify-between font-bold uppercase">
                  <span className="text-gray-400">Confirmed VOs</span>
                  <span className="text-gray-900">$12.4M</span>
                </div>
                <ProgressBar value={45} barClassName="bg-rose-500" />
              </div>
              <div>
                <div className="jarvis-text-10 mb-1.5 flex justify-between font-bold uppercase">
                  <span className="text-gray-400">Potential/Pending VOs</span>
                  <span className="text-gray-900">$4.2M</span>
                </div>
                <ProgressBar value={15} barClassName="bg-amber-400" />
              </div>

              <div className="pt-4 border-t border-gray-50 space-y-3">
                <p className="jarvis-text-10 font-bold uppercase tracking-widest text-gray-400">High-Risk VOs</p>
                {highRiskVariationOrders.map((variationOrder) => (
                  <div key={variationOrder.id} className="flex justify-between items-center text-xs group cursor-pointer">
                    <span className="text-gray-600 font-medium group-hover:text-blue-600 transition-colors">{variationOrder.label}</span>
                    <span className="text-gray-900 font-bold">{variationOrder.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900 text-white shadow-2xl shadow-blue-200/20">
            <div className="flex items-center space-x-2 mb-4">
              <ArrowRightLeft className="w-4 h-4 text-blue-400" />
              <h3 className="jarvis-title-md uppercase tracking-widest text-white">Scenario Stress Test</h3>
            </div>
            <p className="jarvis-copy-sm mb-6 text-gray-300">
              Simulate financial impact by adjusting core variables. Syncs with Forecast Engine.
            </p>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="jarvis-text-10 flex justify-between font-bold uppercase">
                  <span>VO Sum Escalation</span>
                  <span className="text-blue-400">+20%</span>
                </div>
                <input type="range" className="w-full accent-blue-500 h-1 rounded-full cursor-pointer" defaultValue={60} />
              </div>
              <div className="space-y-3">
                <div className="jarvis-text-10 flex justify-between font-bold uppercase">
                  <span>Revenue Delay</span>
                  <span className="text-amber-400">3 Months</span>
                </div>
                <input type="range" className="w-full accent-amber-500 h-1 rounded-full cursor-pointer" defaultValue={45} />
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="jarvis-text-10 mb-2 font-bold uppercase tracking-widest text-white/40">Simulated Impact</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-rose-400 font-bold italic">Cash Deficit Risk</p>
                    <p className="text-2xl font-black">HIGH</p>
                  </div>
                  <button
                    type="button"
                    className="jarvis-text-10 rounded-lg bg-blue-600 px-4 py-2 font-black uppercase tracking-widest transition-all hover:bg-blue-500"
                  >
                    Apply Strategy
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="jarvis-title-md">Intelligent Auditing &amp; Payment Guardrails</h3>
          </div>
          <Badge tone="success">All Safe</Badge>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="jarvis-text-10 bg-gray-50/20 border-b border-gray-100 font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">Contract / Vendor</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Phys. Progress</th>
                <th className="px-6 py-4">Paid Ratio</th>
                <th className="px-6 py-4">Anomaly Detection</th>
                <th className="px-6 py-4 text-right">SSOT Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {financeAuditRows.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 text-xs font-bold text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">{row.totalValue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="jarvis-text-10 font-bold">{row.physicalProgress}</span>
                      <div className="w-12">
                        <ProgressBar value={row.physicalProgress} barClassName="bg-blue-500" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="jarvis-text-10 font-bold">{row.paidRatio}</span>
                      <div className="w-12">
                        <ProgressBar value={row.paidRatio} barClassName="bg-emerald-500" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="jarvis-text-10 flex w-fit items-center rounded bg-emerald-50 px-2 py-1 font-bold text-emerald-600">
                      <CheckCircle2 className="w-3 h-3 mr-1.5" /> NO OVERPAYMENT
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className="p-1.5 text-gray-300 group-hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-4 h-4" />
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
