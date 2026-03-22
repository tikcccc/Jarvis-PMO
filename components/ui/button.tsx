import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariantClassMap = {
  primary:
    "border-gray-900 bg-gray-900 text-white shadow-[0_12px_28px_rgba(15,23,42,0.12)] hover:border-black hover:bg-black",
  secondary: "border-gray-200 bg-white text-gray-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-gray-300 hover:bg-gray-50",
  subtle: "border-transparent bg-blue-50/70 text-blue-600 hover:bg-blue-50",
  accent: "border-blue-500 bg-blue-600 text-white shadow-[0_10px_24px_rgba(59,130,246,0.18)] hover:border-blue-500 hover:bg-blue-500",
  dangerText: "border-0 bg-transparent text-rose-600 shadow-none hover:text-rose-700 hover:underline hover:underline-offset-4",
  ghost: "border-transparent bg-transparent text-gray-500 shadow-none hover:bg-gray-50 hover:text-gray-700"
} as const;

const buttonSizeClassMap = {
  xs: "h-7 px-3",
  sm: "h-8 px-3.5",
  md: "h-9 px-4",
  inline: "h-auto px-0 py-0"
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariantClassMap;
  size?: keyof typeof buttonSizeClassMap;
}

export function Button({ className, type = "button", variant = "secondary", size = "sm", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-3.5",
        size === "inline" || size === "xs" ? "jarvis-control-label-compact" : "jarvis-control-label",
        buttonSizeClassMap[size],
        buttonVariantClassMap[variant],
        className
      )}
      {...props}
    />
  );
}
