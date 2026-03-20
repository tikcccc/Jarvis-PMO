export const financeSummaryCards = [
  { id: "funding", label: "Total Funding", value: "$500M", color: "var(--jarvis-blue-500)", icon: "dollarSign" as const },
  { id: "budget", label: "Total Budget", value: "$450M", color: "var(--jarvis-slate-500)", icon: "target" as const },
  { id: "planned-contracts", label: "Planned Contracts", value: "$400M", color: "var(--jarvis-indigo-500)", icon: "fileText" as const },
  { id: "awarded-contracts", label: "Awarded Contracts", value: "$320M", color: "var(--jarvis-emerald-500)", icon: "checkCircle2" as const },
  { id: "invoiced", label: "Invoiced Sum", value: "$180M", color: "var(--jarvis-amber-500)", icon: "barChart3" as const },
  { id: "paid", label: "Paid Sum", value: "$165M", color: "var(--jarvis-blue-500)", icon: "creditCard" as const },
  { id: "vo-sum", label: "VO Sum (confirmed)", value: "$12.4M", color: "var(--jarvis-rose-500)", icon: "alertTriangle" as const }
];

export const cashFlowBars = [
  { id: "mar", shortLabel: "M", height: 40, actualHeight: 32 },
  { id: "apr", shortLabel: "A", height: 55, actualHeight: 44 },
  { id: "may", shortLabel: "M", height: 60, actualHeight: 48 },
  { id: "jun", shortLabel: "J", height: 45, actualHeight: 36 },
  { id: "jul", shortLabel: "J", height: 80, actualHeight: 64 },
  { id: "aug", shortLabel: "A", height: 70, actualHeight: 56 },
  { id: "sep", shortLabel: "S", height: 90, actualHeight: 0 },
  { id: "oct", shortLabel: "O", height: 85, actualHeight: 0 },
  { id: "nov", shortLabel: "N", height: 65, actualHeight: 0 },
  { id: "dec", shortLabel: "D", height: 50, actualHeight: 0 },
  { id: "jan", shortLabel: "J", height: 45, actualHeight: 0 },
  { id: "feb", shortLabel: "F", height: 30, actualHeight: 0 }
];

export const highRiskVariationOrders = [
  { id: "vo-042", label: "VO-042: Ground Cond. Change", value: "$2.1M" },
  { id: "vo-056", label: "VO-056: Facade Mat. Upgrade", value: "$0.8M" }
];

export const financeAuditRows = [
  { id: "main-contractor", name: "Main Contractor - Site A", totalValue: "$142M", physicalProgress: "42%", paidRatio: "38%" },
  { id: "mep-specialist", name: "MEP Specialist - Tower B", totalValue: "$48M", physicalProgress: "15%", paidRatio: "12%" },
  { id: "interior-consultant", name: "Interior Consultant", totalValue: "$12M", physicalProgress: "85%", paidRatio: "82%" }
];
