"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { getIcon } from "@/lib/icons";
import { navigationSections } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  pathname: string;
  isOpen: boolean;
}

interface SidebarContentProps extends SidebarProps {
  expandedGroups: Record<string, boolean>;
  setExpandedGroups: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export function Sidebar(props: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  return <SidebarContent {...props} expandedGroups={expandedGroups} setExpandedGroups={setExpandedGroups} />;
}

function SidebarContent({ pathname, isOpen, expandedGroups, setExpandedGroups }: SidebarContentProps) {
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
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = expandedGroups[item.id] ?? isActive;

              return (
                <div key={item.id} className="space-y-1">
                  <div
                    className={cn(
                      "group flex items-center rounded-xl transition-all",
                      isActive ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    <Link href={item.href} className="flex min-w-0 flex-1 items-center space-x-3 px-3 py-2">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"
                        )}
                      />
                      {isOpen ? <span className="truncate text-xs">{item.label}</span> : null}
                      {isActive && isOpen && !hasChildren ? <div className="ml-auto h-1 w-1 rounded-full bg-blue-600" /> : null}
                    </Link>

                    {hasChildren && isOpen ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedGroups((current) => ({
                            ...current,
                            [item.id]: !current[item.id]
                          }))
                        }
                        className="mr-2 rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/70 hover:text-gray-700"
                        aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                      >
                        <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", isExpanded ? "rotate-90" : "")} />
                      </button>
                    ) : null}
                  </div>

                  {hasChildren && isOpen && isExpanded ? (
                    <div className="ml-7 space-y-1 border-l border-gray-100 pl-3">
                      {item.children?.map((child) => {
                        const isChildActive = pathname === child.href;

                        return (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={cn(
                              "flex items-center rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
                              isChildActive ? "bg-blue-50/80 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            )}
                          >
                            <span className="truncate">{child.label}</span>
                            {isChildActive ? <span className="ml-auto h-1 w-1 rounded-full bg-blue-600" /> : null}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
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
