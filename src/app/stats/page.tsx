"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { FloatingNav } from "@/components/layout/FloatingNav";

export default function StatsPage() {
  const { state } = useStore();

  const completedCourses = state.courses.filter(
    (c) => c.status === "completed"
  ).length;

  const totalCourses = state.courses.length;

  // Calculate quiz accuracy from user stats
  const correctRate = state.user.accuracy || 0;

  return (
    <div className="space-y-6 pb-8">
      <FloatingNav currentPage="stats" />

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-full p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">學習統計</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Total minutes */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">全網站累積學習</p>
            <div className="text-3xl font-bold">{state.user.totalMinutes}</div>
            <p className="text-xs text-muted-foreground">分鐘</p>
          </div>
        </div>

        {/* Week minutes */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">本週學習</p>
            <div className="text-3xl font-bold">{state.user.weekMinutes}</div>
            <p className="text-xs text-muted-foreground">分鐘</p>
          </div>
        </div>

        {/* Completed courses */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">完成課程</p>
            <div className="text-3xl font-bold">
              {completedCourses} / {totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">門課程</p>
          </div>
        </div>

        {/* Quiz accuracy */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">答題正確率</p>
            <div className="text-3xl font-bold">{correctRate}%</div>
            <p className="text-xs text-muted-foreground">
              {state.user.quizzesDone} 題已作答
            </p>
          </div>
        </div>
      </div>

      {/* Buildings by level */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold">建築進度</h2>
        <div className="space-y-3">
          {state.buildings.map((building) => (
            <div key={building.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{building.name}</p>
                <p className="text-xs text-muted-foreground">
                  {building.minutes} 分鐘
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Lv.{building.level}</p>
                <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${Math.min((building.level / 5) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
