"use client";

import type { DailyTask } from "@/types";
import { cn } from "@/lib/utils";

export function DailyTasksList({
  tasks,
  onStart,
}: {
  tasks: DailyTask[];
  onStart?: (task: DailyTask) => void;
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-muted-foreground">暫無任務</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground px-2">
        每日任務
      </h2>
      {tasks.map((task, idx) => (
        <div
          key={task.id}
          className={cn(
            "rounded-2xl p-4 flex items-center justify-between transition-all hover:shadow-md",
            task.done
              ? "bg-muted/50 border border-dashed border-border"
              : "bg-card border border-border"
          )}
        >
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <div className="text-2xl">
              {task.kind === "review" && "🔄"}
              {task.kind === "watch" && "📹"}
              {task.kind === "quiz" && "❓"}
              {task.kind === "note" && "📝"}
            </div>
              <div>
                <h3 className={cn(
                  "font-semibold text-sm",
                  task.done && "line-through text-muted-foreground"
                )}>
                  Day {idx + 1} 任務
                </h3>
                <p className={cn(
                  "text-xs",
                  task.done ? "text-muted-foreground" : "text-muted-foreground"
                )}>
                  {task.title}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={cn(
              "font-bold text-sm",
              task.done ? "text-muted-foreground" : "text-brand-coral"
            )}>
              +{task.xp}P
            </div>

            {!task.done ? (
              <button
                onClick={() => onStart?.(task)}
                className="rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-foreground/90 transition-colors"
              >
                去觀看
              </button>
            ) : (
              <span className="text-xs text-muted-foreground">已完成</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
