import { ProcurementPage } from "@/components/modules/procurement/procurement-page";

interface ProcurementRouteProps {
  searchParams: Promise<{
    view?: string;
  }>;
}

export default async function ProcurementRoute({ searchParams }: ProcurementRouteProps) {
  const { view } = await searchParams;

  return <ProcurementPage initialView={view === "logs" ? "logs" : "workbench"} />;
}
