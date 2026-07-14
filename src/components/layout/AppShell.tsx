"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarCheck,
  RotateCcw,
  BookOpen,
  ListTodo,
  Bell,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import type { ReactNode } from "react";

const NAV = [
  { href: "/", label: "城市", icon: Building2 },
  { href: "/tasks", label: "今日任務", icon: ListTodo },
  { href: "/review", label: "複習中心", icon: RotateCcw },
  { href: "/courses", label: "課程", icon: BookOpen },
  { href: "/timeline", label: "學習紀錄", icon: CalendarCheck },
  { href: "/notifications", label: "召回通知", icon: Bell },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { dispatch } = useStore();

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-brand-cream/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="font-bold">學習城市</div>
              <div className="text-[11px] text-muted-foreground">
                Learning City
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => {
              if (confirm("重設 Demo 資料？將回到初始的示範進度。")) {
                dispatch({ type: "RESET" });
              }
            }}
            className="hidden md:flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            重設 Demo
          </button>
        </div>
      </header>

      <main className="container py-6">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-6">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
