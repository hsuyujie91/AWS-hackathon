"use client";

import { useState } from "react";
import type { DailyTask } from "@/types";
import { useStore } from "@/lib/store";
import { buildingLevelFromMinutes } from "@/lib/xp";
import { TodayTask } from "@/components/learning/TodayTask";
import { SuccessModal, type SuccessInfo } from "@/components/common/SuccessModal";
import { Card, CardContent } from "@/components/ui/card";

export default function TasksPage() {
  const { state, dispatch } = useStore();
  const [taskIndex, setTaskIndex] = useState(0);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

  const openTasks = state.tasks.filter((t) => !t.done);
  const doneCount = state.tasks.length - openTasks.length;
  const current =
    openTasks.length > 0 ? openTasks[taskIndex % openTasks.length] : null;

  function complete(task: DailyTask) {
    const b = state.buildings.find((x) => x.id === task.buildingId)!;
    const leveledUp =
      buildingLevelFromMinutes(b.minutes + task.estMinutes) > b.level;
    dispatch({ type: "COMPLETE_TASK", taskId: task.id });
    setSuccess({ xp: task.xp, buildingName: b.name, leveledUp });
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold">今日任務</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          一次只專注一件事。完成後城市就會成長，不用擔心任務堆積。
        </p>
      </div>

      {current ? (
        <TodayTask
          task={current}
          onStart={complete}
          onShuffle={
            openTasks.length > 1 ? () => setTaskIndex((i) => i + 1) : undefined
          }
        />
      ) : (
        <Card className="border-brand-mint/50 bg-brand-mint/10">
          <CardContent className="p-8 text-center">
            <div className="text-3xl">🎉</div>
            <h2 className="mt-2 font-bold">今天的任務都完成了！</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              城市已經記錄你的成長。休息一下，明天再回來也不會失去任何進度。
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="flex items-center justify-between p-4 text-sm">
          <span className="text-muted-foreground">今日進度</span>
          <span className="font-semibold">
            已完成 {doneCount} / {state.tasks.length} 個任務
          </span>
        </CardContent>
      </Card>

      <SuccessModal
        info={success}
        onClose={() => setSuccess(null)}
        onAnother={
          openTasks.length > 1
            ? () => {
                setSuccess(null);
                setTaskIndex((i) => i + 1);
              }
            : undefined
        }
      />
    </div>
  );
}
