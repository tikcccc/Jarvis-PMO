import { AppShell } from "@/components/shell/app-shell";

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
