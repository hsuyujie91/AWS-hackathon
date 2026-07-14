"use client";

import Link from "next/link";
import { useState } from "react";
import type { Building, CategoryId } from "@/types";
import { BuildingTile } from "./BuildingTile";

export function InteractiveCity({
  buildings,
  pending = [],
}: {
  buildings: Building[];
  pending?: CategoryId[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedBuilding = buildings.find((b) => b.id === selectedId);

  return (
    <div className="space-y-4">
      {/* City grid */}
      <div className="rounded-3xl border border-border bg-gradient-to-b from-sky-50 to-emerald-50/60 shadow-card dark:from-slate-800 dark:to-slate-700/60 p-8">
        <div className="grid grid-cols-4 gap-6">
          {buildings.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className="text-left hover:opacity-80 transition-opacity"
            >
              <BuildingTile
                building={b}
                hasPending={pending.includes(b.id)}
              />
            </button>
          ))}
        </div>

        {/* City info text */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          {selectedBuilding ? (
            <p>選中：<span className="font-semibold">{selectedBuilding.name}</span></p>
          ) : (
            <p>點擊建築查看詳情</p>
          )}
        </div>
      </div>

      {/* Selected building detail */}
      {selectedBuilding && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedBuilding.name}</h3>
              <p className="text-sm text-muted-foreground">
                等級 {selectedBuilding.level} · {selectedBuilding.minutes} 分鐘
              </p>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            {selectedBuilding.category} 分類
          </p>

          {selectedBuilding.unlocked && (
            <Link
              href={`/building/${selectedBuilding.id}`}
              className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              查看詳情
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
