import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const cardVariantClassMap = {
  surface: "bg-white border border-gray-100 shadow-sm hover:shadow-md",
  muted: "bg-gray-50/70 border border-gray-100 shadow-sm hover:shadow-md",
  emphasis: "bg-slate-950 border border-slate-900 text-white shadow-[0_28px_64px_rgba(15,23,42,0.24)]"
} as const;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariantClassMap;
}

export function Card({ className, variant = "surface", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "jarvis-card rounded-xl transition-[background-color,border-color,box-shadow,transform] duration-200",
        cardVariantClassMap[variant],
        className
      )}
      {...props}
    />
  );
}
