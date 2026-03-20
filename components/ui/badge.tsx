import type { HTMLAttributes } from "react";

import type { Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const badgeToneMap: Record<Tone, string> = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border border-amber-100",
  danger: "bg-rose-50 text-rose-700 border border-rose-100",
  info: "bg-blue-50 text-blue-700 border border-blue-100"
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "jarvis-text-10 inline-flex px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
        badgeToneMap[tone],
        className
      )}
      {...props}
    />
  );
}
