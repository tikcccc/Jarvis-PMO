import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function TabButton({ active = false, className, type = "button", ...props }: TabButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "jarvis-control-label-compact inline-flex h-8 items-center justify-center gap-1.5 border-b-2 px-3 text-center transition-[border-color,color,background-color] duration-200",
        active ? "border-blue-500 bg-white text-blue-600" : "border-transparent bg-transparent text-gray-400 hover:text-gray-700",
        className
      )}
      {...props}
    />
  );
}
