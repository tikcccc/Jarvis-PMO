import type { Metadata } from "next";

import "mapbox-gl/dist/mapbox-gl.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Jarvis PMO Prototype",
  description: "High-fidelity Jarvis PMO executive prototype built with Next.js."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
