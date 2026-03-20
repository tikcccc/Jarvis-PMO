import { DashboardStrategicMapCard } from "@/components/modules/dashboard/dashboard-strategic-map-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import { dashboardFeed, dashboardMetrics } from "@/lib/mock-data/dashboard";
import { cn } from "@/lib/utils";

const metricDecor = {
  integrity: {
    badge: "+12%",
    iconClass: "bg-blue-50 text-blue-600"
  },
  "approval-conditions": {
    badge: "Active",
    iconClass: "bg-amber-50 text-amber-600"
  },
  efc: {
    badge: "Safe",
    iconClass: "bg-emerald-50 text-emerald-600"
  },
  "delay-impact": {
    badge: "Critical",
    iconClass: "bg-rose-50 text-rose-600"
  }
} as const;

export function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => {
          const Icon = getIcon(metric.icon);
          const decor = metricDecor[metric.id as keyof typeof metricDecor];

          return (
            <Card key={metric.id} className="p-5">
              <div className="flex justify-between items-start">
                <div className={cn("p-2 rounded-lg", decor.iconClass)}>
                  <Icon className="w-5 h-5" />
                </div>
                <Badge tone={metric.tone}>{decor.badge}</Badge>
              </div>
              <div className="mt-4">
                <p className="jarvis-copy-sm">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                  {metric.id === "approval-conditions" ? (
                    <span className="text-xs font-normal text-gray-400"> Total</span>
                  ) : null}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2.15fr)_minmax(340px,0.85fr)] gap-6 items-stretch">
        <DashboardStrategicMapCard />

        <Card className="p-6 xl:min-h-[660px] flex flex-col">
          <h3 className="jarvis-title-md mb-6">Compliance & Intelligence Feed</h3>
          <div className="flex-1 space-y-6">
            {dashboardFeed.map((item) => (
              <div key={item.id} className="flex space-x-3">
                <div
                  className={cn(
                    "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                    item.tone === "danger"
                      ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                      : item.tone === "warning"
                        ? "bg-amber-500"
                        : item.tone === "success"
                          ? "bg-emerald-500"
                          : "bg-blue-500"
                  )}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="jarvis-text-10 font-bold text-gray-400 uppercase tracking-tighter">{item.agent}</span>
                    <span className="jarvis-text-10 text-gray-400">{item.timeLabel}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-tight font-medium">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="subtle" size="md" className="mt-6 w-full">
            Open Command Logs
          </Button>
        </Card>
      </div>
    </div>
  );
}
