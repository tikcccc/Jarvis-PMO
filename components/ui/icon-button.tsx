import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const iconButtonVariantClassMap = {
  ghost: "border-transparent bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-600",
  surface: "border-gray-100 bg-white text-gray-500 shadow-sm hover:border-gray-200 hover:text-gray-900",
  blue: "border-transparent bg-transparent text-gray-400 hover:bg-blue-50 hover:text-blue-600"
} as const;

const iconButtonSizeClassMap = {
  sm: "h-8 w-8",
  md: "h-9 w-9"
} as const;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof iconButtonVariantClassMap;
  size?: keyof typeof iconButtonSizeClassMap;
}

export function IconButton({
  className,
  type = "button",
  variant = "ghost",
  size = "sm",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg border transition-[background-color,border-color,color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
        iconButtonSizeClassMap[size],
        iconButtonVariantClassMap[variant],
        className
      )}
      {...props}
    />
  );
}
