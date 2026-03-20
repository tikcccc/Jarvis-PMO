import type { ApprovalCondition, ApprovalRecord, MetricCard } from "@/lib/types";

export const approvalStats: MetricCard[] = [
  {
    id: "compliance-health",
    label: "Compliance Health",
    value: "Secure",
    tone: "success",
    icon: "shieldCheck"
  },
  {
    id: "total-conditions",
    label: "Total Conditions",
    value: "39",
    tone: "info",
    icon: "fileText"
  },
  {
    id: "fulfilled-rate",
    label: "Fulfilled Rate",
    value: "72%",
    tone: "info",
    icon: "activity"
  },
  {
    id: "imminent-deadlines",
    label: "Imminent Deadlines",
    value: "3 Tasks",
    tone: "danger",
    icon: "clock"
  }
];

export const approvals: ApprovalRecord[] = [
  { id: 1, title: "General Building Plan (GBP)", department: "Buildings Department", reference: "BD/GP/2026/042", status: "Approved", tone: "success", conditionCount: 12, closedCount: 10, lastUpdateLabel: "2h ago" },
  { id: 2, title: "Environmental Permit", department: "EPD", reference: "EPD/A/882-01", status: "Under Review", tone: "warning", conditionCount: 8, closedCount: 3, lastUpdateLabel: "1d ago" },
  { id: 3, title: "Tree Preservation Order", department: "LCSD", reference: "LCSD/TPO/77", status: "Pending", tone: "danger", conditionCount: 4, closedCount: 0, lastUpdateLabel: "3d ago" },
  { id: 4, title: "Fire Safety Approval", department: "FSD", reference: "FSD/FS/992", status: "Approved", tone: "success", conditionCount: 15, closedCount: 15, lastUpdateLabel: "1w ago" }
];

export const approvalConditionsByApprovalId: Record<number, ApprovalCondition[]> = {
  1: [
    { id: 101, type: "Precedent", content: "Submit revised Traffic Impact Assessment (TIA) reflecting Metro Hub Phase 2.", status: "Fulfilled", tone: "success", deadline: "2026-03-01", evidenceLabel: "TIA_Final_v2.pdf" },
    { id: 102, type: "Subsequent", content: "Provide on-site air quality monitoring data every 14 days during excavation.", status: "Active", tone: "info", deadline: "2026-04-15", progressPercent: 65 },
    { id: 103, type: "Precedent", content: "Endorsement of Heritage Protection Plan for East Perimeter Wall.", status: "Pending", tone: "danger", deadline: "2026-03-25" },
    { id: 104, type: "Subsequent", content: "Submission of 'As-Built' drainage records within 30 days of Phase 1 completion.", status: "Pending", tone: "default", deadline: "2027-10-10" }
  ]
};
