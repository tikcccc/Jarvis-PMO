"use client";

import { Bell, ChevronRight, MoreVertical, Search } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

interface TopbarProps {
  activeLabel: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Topbar({ activeLabel, isSidebarOpen, onToggleSidebar }: TopbarProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-8 shrink-0 z-30">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-180" : ""}`} />
        </button>
        <div className="h-4 w-px bg-gray-100 mx-2" />
        <div className="jarvis-text-11 flex items-center font-bold text-gray-400 uppercase tracking-widest">
          Portfolios <ChevronRight className="w-3 h-3 mx-1" /> <span className="text-gray-900">{activeLabel}</span>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 w-3.5 h-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="SSOT DATA SEARCH..."
            className="jarvis-text-10 w-60 rounded-xl bg-gray-50 py-2 pr-4 pl-9 font-bold outline-none transition-all focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex items-center space-x-2">
          <IconButton className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full border border-white bg-rose-500" />
          </IconButton>
          <IconButton>
            <MoreVertical className="w-4 h-4" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
