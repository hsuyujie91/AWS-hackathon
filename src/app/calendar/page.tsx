"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { FloatingNav } from "@/components/layout/FloatingNav";

export default function CalendarPage() {
  const { state } = useStore();
  const [weekOffset, setWeekOffset] = useState(0);

  // Mock weekly data based on activity
  const getWeekDays = () => {
    const today = new Date();
    today.setDate(today.getDate() - weekOffset * 7);
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();
  const weekStart = weekDays[0];

  // Sample: distribute activities across the week
  const activitiesByDay = weekDays.map((date, dayIdx) => {
    const dayActivities = state.activity
      .slice(0, 3)
      .map((activity) => ({
        id: activity.id,
        title: activity.title,
        type: activity.type,
      }))
      .slice(0, Math.max(1, (dayIdx + 1) % 3));

    return { date, activities: dayActivities };
  });

  return (
    <div className="space-y-6 pb-8">
      <FloatingNav currentPage="calendar" />

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-full p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">學習日曆</h1>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="text-sm font-semibold">
          {weekStart.toLocaleDateString("zh-TW", {
            month: "short",
            day: "numeric",
          })}{" "}
          -{" "}
          {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "zh-TW",
            { month: "short", day: "numeric" }
          )}
        </div>

        <button
          onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
          disabled={weekOffset === 0}
          className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-3">
        {activitiesByDay.map(({ date, activities }) => {
          const isToday =
            date.toDateString() === new Date().toDateString();
          const dayName = date.toLocaleDateString("zh-TW", {
            weekday: "short",
          });

          return (
            <div
              key={date.toISOString()}
              className={`rounded-2xl border p-3 transition-colors ${
                isToday
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              <div className="text-center mb-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  {dayName}
                </p>
                <p className="text-lg font-bold">
                  {date.getDate()}
                </p>
              </div>

              <div className="space-y-2">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="text-[11px] p-2 bg-muted/60 rounded-lg text-muted-foreground line-clamp-2"
                    >
                      {activity.title}
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] text-muted-foreground/50 text-center py-2">
                    无
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity highlights */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold">本週學習精華</h2>
        {state.activity.slice(0, 5).length > 0 ? (
          <div className="space-y-3">
            {state.activity.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/40"
              >
                <div className="text-2xl flex-shrink-0">
                  {activity.type === "watch" && "📹"}
                  {activity.type === "review" && "🔄"}
                  {activity.type === "quiz" && "❓"}
                  {activity.type === "note" && "📝"}
                  {activity.type === "task" && "✓"}
                  {activity.type === "upgrade" && "🏢"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium break-words">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.date).toLocaleDateString("zh-TW")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">暫無學習記錄</p>
        )}
      </div>
    </div>
  );
}
