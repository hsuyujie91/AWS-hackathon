"use client";

import type { Building, CategoryId } from "@/types";
import { BuildingTile } from "./BuildingTile";

/**
 * The interactive city. On desktop it's a soft isometric "ground" grid with a
 * strolling citizen; on mobile it collapses to a horizontal, swipeable strip so
 * buildings never shrink below a tappable size.
 */
export function CityScene({
  buildings,
  pending = [],
}: {
  buildings: Building[];
  /** Categories that currently have something to review/continue. */
  pending?: CategoryId[];
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-sky-50 to-emerald-50/60 shadow-card">
      {/* Sky details */}
      <div className="pointer-events-none absolute left-6 top-4 text-2xl opacity-80 animate-float">
        ☁️
      </div>
      <div className="pointer-events-none absolute right-10 top-8 text-xl opacity-70 animate-float [animation-delay:1.5s]">
        ☁️
      </div>
      <div className="pointer-events-none absolute right-6 top-3 text-2xl">
        ☀️
      </div>

      {/* Desktop: grid ground */}
      <div className="city-ground hidden p-8 md:block">
        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {buildings.map((b) => (
            <BuildingTile
              key={b.id}
              building={b}
              hasPending={pending.includes(b.id)}
            />
          ))}
        </div>
        {/* Strolling citizen */}
        <div className="relative mt-2 h-6">
          <span className="absolute bottom-0 left-0 text-lg animate-walk">
            🚶
          </span>
        </div>
      </div>

      {/* Mobile: horizontal strip */}
      <div className="md:hidden">
        <div className="city-ground no-scrollbar flex snap-x gap-4 overflow-x-auto px-5 py-6">
          {buildings.map((b) => (
            <div key={b.id} className="snap-center shrink-0">
              <BuildingTile building={b} hasPending={pending.includes(b.id)} />
            </div>
          ))}
        </div>
        <p className="pb-3 text-center text-[11px] text-muted-foreground">
          ← 左右滑動逛你的城市 →
        </p>
      </div>
    </div>
  );
}
