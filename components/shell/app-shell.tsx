"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { FloatingAgentButton } from "@/components/shell/floating-agent-button";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { getNavItemByPath } from "@/lib/navigation";

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const activeItem = getNavItemByPath(pathname);

  return (
    <div className="jarvis-shell min-h-screen bg-[#FDFDFE] flex font-sans text-gray-900 antialiased overflow-hidden">
      <Sidebar pathname={pathname} isOpen={isSidebarOpen} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar
          activeLabel={activeItem.label}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setSidebarOpen((current) => !current)}
        />
        <div className="jarvis-content flex-1 overflow-y-auto p-8 no-scrollbar bg-[#FDFDFE] relative">
          <div className="max-w-6xl mx-auto pb-20">{children}</div>
        </div>
      </main>
      <FloatingAgentButton />
    </div>
  );
}
