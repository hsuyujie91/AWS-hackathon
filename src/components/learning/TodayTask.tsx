"use client";

import { Clock, Play, Shuffle, Sparkles, CheckCircle2 } from "lucide-react";
import type { DailyTask } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const KIND_LABEL: Record<DailyTask["kind"], string> = {
  review: "複習",
  watch: "觀看",
  quiz: "測驗",
  note: "筆記",
};

/**
 * The single, focused "one task at a time" card.
 * Shows only ONE task; a shuffle button swaps to another to avoid overload.
 */
export function TodayTask({
  task,
  onStart,
  onShuffle,
  compact = false,
}: {
  task: DailyTask;
  onStart: (task: DailyTask) => void;
  onShuffle?: () => void;
  compact?: boolean;
}) {
  if (task.done) {
    return (
      <Card className="border-brand-mint/50 bg-brand-mint/10">
        <CardContent className="flex items-center gap-3 p-5">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          <div>
            <div className="font-semibold">今日主要任務已完成 🎉</div>
            <div className="text-sm text-muted-foreground">
              城市已記錄你的成長，明天見！
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-brand-sky/40">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand-sky/10 blur-2xl" />
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <Badge variant="default">
            <Sparkles className="h-3 w-3" />
            今日任務
          </Badge>
          <Badge variant="secondary">{KIND_LABEL[task.kind]}</Badge>
          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />約 {task.estMinutes} 分鐘
          </span>
        </div>

        <h3 className={compact ? "mt-3 font-semibold" : "mt-3 text-lg font-bold"}>
          {task.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{task.purpose}</p>

        <div className="mt-3 rounded-xl bg-brand-sun/15 px-3 py-2 text-xs font-medium text-amber-700">
          🏗️ 完成後：{task.reward}（+{task.xp} XP）
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="flex-1" onClick={() => onStart(task)}>
            <Play className="h-4 w-4" />
            立即開始
          </Button>
          {onShuffle && (
            <Button variant="outline" size="icon" onClick={onShuffle} aria-label="更換任務">
              <Shuffle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
