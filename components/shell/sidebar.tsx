"use client";

import Link from "next/link";

import { getIcon } from "@/lib/icons";
import { navigationSections } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  pathname: string;
  isOpen: boolean;
}

export function Sidebar({ pathname, isOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-100 transition-all duration-300 flex flex-col shrink-0",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-6 flex items-center space-x-3 h-16 shrink-0">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-xl">
          <span className="text-white font-black text-sm italic">J</span>
        </div>
        {isOpen ? (
          <span className="font-bold text-lg tracking-tight">
            JARVIS<span className="text-blue-600">PMO</span>
          </span>
        ) : null}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto no-scrollbar scroll-smooth">
        {navigationSections.map((section, index) => (
          <div key={section.label ?? `section-${index}`}>
            {section.label ? (
              isOpen ? (
                <div className="jarvis-text-10 px-3 pt-6 pb-2 font-black text-gray-300 uppercase tracking-widest">
                  {section.label}
                </div>
              ) : (
                <div className="h-4" />
              )
            ) : null}
            {section.items.map((item) => {
              const Icon = getIcon(item.icon);
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all group",
                    isActive ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"
                    )}
                  />
                  {isOpen ? <span className="text-xs truncate">{item.label}</span> : null}
                  {isActive && isOpen ? <div className="ml-auto w-1 h-1 bg-blue-600 rounded-full" /> : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <div className={cn("p-2 bg-gray-50 rounded-xl flex items-center", isOpen ? "space-x-3" : "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-gray-200 border border-white flex items-center justify-center font-bold text-gray-500 text-xs">
            JD
          </div>
          {isOpen ? (
            <div className="flex-1 overflow-hidden">
              <p className="jarvis-text-10 font-black uppercase">John Doe</p>
              <p className="jarvis-text-10 text-gray-400">PMO Lead</p>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
