import type { ModuleId, NavItem, NavSection } from "@/lib/types";

export const navigationSections: NavSection[] = [
  {
    items: [{ id: "dashboard", href: "/", label: "Strategic Overview", icon: "layoutDashboard" }]
  },
  {
    label: "Portfolio Management",
    items: [
      { id: "portfolio", href: "/portfolio", label: "Portfolio (SSOT)", icon: "layers" },
      { id: "requirements", href: "/requirements", label: "Requirements", icon: "target" },
      { id: "milestones", href: "/milestones", label: "Milestones", icon: "milestone" },
      { id: "approvals", href: "/approvals", label: "Gov Approvals", icon: "fileCheck" }
    ]
  },
  {
    label: "Execution",
    items: [
      {
        id: "procurement",
        href: "/procurement",
        label: "Procurement",
        icon: "shoppingCart",
        children: [
          { id: "procurement-workbench", href: "/procurement", label: "Workbench" },
          { id: "procurement-logs", href: "/procurement?view=logs", label: "Logs" }
        ]
      },
      { id: "design", href: "/design", label: "Design (BIM-Cost)", icon: "penTool" },
      { id: "finance", href: "/finance", label: "Finance", icon: "wallet" },
      { id: "payment", href: "/payment", label: "Jarvis PAY", icon: "creditCard" }
    ]
  },
  {
    label: "Site & Quality",
    items: [
      { id: "progress", href: "/progress", label: "Progress (Eagle Eye)", icon: "eye" },
      { id: "quality", href: "/quality", label: "Quality (DWSS)", icon: "shieldCheck" },
      { id: "safety", href: "/safety", label: "Safety (Smart Site)", icon: "hardHat" },
      { id: "handover", href: "/handover", label: "Handover", icon: "key" }
    ]
  }
];

export const navigationItems: NavItem[] = navigationSections.flatMap((section) => section.items);

export function getNavItemByPath(pathname: string): NavItem {
  return navigationItems.find((item) => item.href === pathname) ?? navigationItems[0];
}

export function getModulePath(moduleId: ModuleId): string {
  return navigationItems.find((item) => item.id === moduleId)?.href ?? "/";
}
