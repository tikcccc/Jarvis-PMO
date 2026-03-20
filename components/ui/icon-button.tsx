import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function IconButton({ className, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn("p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors", className)}
      {...props}
    />
  );
}
