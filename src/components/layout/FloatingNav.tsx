"use client";

import Link from "next/link";
import { Home, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingNav({ currentPage }: { currentPage?: "stats" | "calendar" }) {
  return (
    <div className="fixed right-6 top-24 z-20 flex flex-col gap-3">
      <Link
        href="/stats"
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full shadow-lg transition-all hover:scale-110",
          currentPage === "stats"
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border hover:bg-muted"
        )}
        aria-label="统计"
        title="累积学习统计"
      >
        <Home className="h-6 w-6" />
      </Link>

      <Link
        href="/calendar"
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full shadow-lg transition-all hover:scale-110",
          currentPage === "calendar"
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border hover:bg-muted"
        )}
        aria-label="日历"
        title="学习日历回顾"
      >
        <Calendar className="h-6 w-6" />
      </Link>
    </div>
  );
}
