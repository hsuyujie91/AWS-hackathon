"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Top bar - simplified for pressplay integration */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-slate-900/95 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-purple-600 text-white shadow-card">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="font-bold text-white">學習城市</div>
              <div className="text-[11px] text-gray-400">
                Learning City
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl py-6">{children}</main>
    </div>
  );
}
