import type { FeedItem, MetricCard } from "@/lib/types";

export const dashboardMetrics: MetricCard[] = [
  {
    id: "integrity",
    label: "Portfolio SSOT Integrity",
    value: "99.8%",
    tone: "success",
    icon: "layers"
  },
  {
    id: "approval-conditions",
    label: "Gov. Approval Conditions",
    value: "1,242",
    tone: "warning",
    icon: "alertCircle"
  },
  {
    id: "efc",
    label: "Estimated Final Cost (EFC)",
    value: "$428M",
    tone: "success",
    icon: "trendingUp"
  },
  {
    id: "delay-impact",
    label: "Milestone Delay Impact",
    value: "-4 Days",
    tone: "danger",
    icon: "clock"
  }
];

export const dashboardFeed: FeedItem[] = [
  {
    id: "recording-agent",
    agent: "Recording Agent",
    message: "Extracted 42 conditions from Lands Dept Approval.",
    timeLabel: "2m ago",
    tone: "info"
  },
  {
    id: "tender-agent",
    agent: "Tender Agent",
    message: "Warning: Unbalanced bid in Façade Tender Package.",
    timeLabel: "1h ago",
    tone: "warning"
  },
  {
    id: "eagle-eye",
    agent: "Eagle Eye",
    message: "85% Rebar Completion verified on Block 3-L12.",
    timeLabel: "3h ago",
    tone: "success"
  },
  {
    id: "finance-agent",
    agent: "Finance Agent",
    message: "VO Sum threshold exceeded for Interior Fitout.",
    timeLabel: "5h ago",
    tone: "danger"
  },
  {
    id: "safety-agent",
    agent: "Safety Agent",
    message: "Unauthorized entry detected in Deep Excavation Zone B.",
    timeLabel: "6h ago",
    tone: "danger"
  }
];
