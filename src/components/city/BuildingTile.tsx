"use client";

import Link from "next/link";
import { Lock, Bell } from "lucide-react";
import type { Building } from "@/types";
import { cn } from "@/lib/utils";

/**
 * A single stylized building. Its height and decorations scale with `level`,
 * so the same component renders Lv.1 → Lv.5 without any image assets.
 * Locked categories render as an empty, inviting plot.
 */
export function BuildingTile({
  building,
  hasPending = false,
}: {
  building: Building;
  hasPending?: boolean;
}) {
  if (!building.unlocked) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="grid h-24 w-24 place-items-center rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <span className="text-center text-[11px] leading-tight text-muted-foreground">
          {building.category}
          <br />
          （看課後解鎖）
        </span>
      </div>
    );
  }

  // Height grows with level; windows/decoration count too.
  const bodyHeight = 34 + building.level * 12;
  const windows = Array.from({ length: building.level });

  return (
    <Link
      href={`/building/${building.id}`}
      className="group flex flex-col items-center gap-2"
      aria-label={`${building.name}，等級 ${building.level}`}
    >
      <div className="relative flex h-28 w-24 items-end justify-center">
        {hasPending && (
          <span className="absolute -top-1 right-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-brand-coral text-white shadow-card animate-float">
            <Bell className="h-3.5 w-3.5" />
          </span>
        )}

        {/* Emoji sign floats above */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-lg drop-shadow-sm">
          {building.emoji}
        </span>

        <div className="flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:animate-glow">
          {/* Roof */}
          <div
            className="h-3 w-16 rounded-t-lg"
            style={{ backgroundColor: building.color, filter: "brightness(0.85)" }}
          />
          {/* Body */}
          <div
            className="relative w-20 rounded-b-md"
            style={{ height: bodyHeight, backgroundColor: building.color }}
          >
            <div className="absolute inset-0 grid grid-cols-3 content-start gap-1.5 p-2">
              {windows.slice(0, 6).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2.5 w-2.5 rounded-[3px]",
                    building.level >= 3 ? "bg-brand-sun/90" : "bg-white/70",
                  )}
                />
              ))}
            </div>
            {/* Door */}
            <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-t-md bg-white/80" />
          </div>
          {/* Plot / plants appear from Lv.2 */}
          {building.level >= 2 && (
            <div className="mt-0.5 flex gap-1">
              <span className="text-[10px]">🌳</span>
              {building.level >= 4 && <span className="text-[10px]">🌷</span>}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="text-xs font-semibold leading-tight">
          {building.name}
        </div>
        <div className="text-[10px] text-muted-foreground">
          Lv.{building.level} · {building.minutes} 分
        </div>
      </div>
    </Link>
  );
}
