import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number | string;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({ value, className, barClassName }: ProgressBarProps) {
  const width = typeof value === "number" ? `${value}%` : value;

  return (
    <div className={cn("h-1.5 w-full bg-gray-100 rounded-full overflow-hidden", className)}>
      <div className={cn("h-full rounded-full", barClassName)} style={{ width }} />
    </div>
  );
}
