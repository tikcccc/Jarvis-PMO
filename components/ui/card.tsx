import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "jarvis-card bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
