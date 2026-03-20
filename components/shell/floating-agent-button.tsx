"use client";

import { Activity } from "lucide-react";

export function FloatingAgentButton() {
  return (
    <button
      type="button"
      className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-gray-900 text-white shadow-2xl transition-all duration-200 hover:scale-[1.03] motion-safe:hover:-translate-y-0.5"
      aria-label="Open Jarvis Intelligence"
    >
      <Activity className="w-6 h-6 transition-transform group-hover:rotate-12" />
      <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
      </div>
    </button>
  );
}
