"use client";

import { useMemo, useState } from "react";
import type { Course, DailyTask } from "@/types";
import { useStore } from "@/lib/store";
import { buildingLevelFromMinutes } from "@/lib/xp";
import { StatsHeader } from "@/components/learning/StatsHeader";
import { TodayTask } from "@/components/learning/TodayTask";
import { CityScene } from "@/components/city/CityScene";
import { ContinueLearning } from "@/components/learning/ContinueLearning";
import { ReviewQueue } from "@/components/learning/ReviewQueue";
import { RecentActivity } from "@/components/learning/RecentActivity";
import { SuccessModal, type SuccessInfo } from "@/components/common/SuccessModal";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const { state, dispatch } = useStore();
  const [taskIndex, setTaskIndex] = useState(0);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

  const openTasks = state.tasks.filter((t) => !t.done);
  const currentTask =
    openTasks.length > 0 ? openTasks[taskIndex % openTasks.length] : state.tasks[0];

  // Buildings that have something pending (in-progress course or reviews due).
  const pending = useMemo(() => {
    const cats = new Set(
      state.courses
        .filter((c) => c.status === "in-progress")
        .map((c) => c.category),
    );
    return Array.from(cats);
  }, [state.courses]);

  function completeTask(task: DailyTask) {
    const building = state.buildings.find((b) => b.id === task.buildingId)!;
    const before = building.level;
    const after = buildingLevelFromMinutes(building.minutes + task.estMinutes);
    dispatch({ type: "COMPLETE_TASK", taskId: task.id });
    setSuccess({
      xp: task.xp,
      buildingName: building.name,
      leveledUp: after > before,
      message: "今天的一小步，讓城市又長高了。",
    });
  }

  function watch(course: Course) {
    const building = state.buildings.find((b) => b.id === course.category)!;
    const mins = Math.min(course.minutesLeft || 5, 5);
    const before = building.level;
    const after = buildingLevelFromMinutes(building.minutes + mins);
    dispatch({ type: "WATCH_COURSE", courseId: course.id, minutes: mins });
    setSuccess({
      xp: mins,
      buildingName: building.name,
      leveledUp: after > before,
      message: `模擬觀看《${course.title}》${mins} 分鐘，進度已更新。`,
    });
  }

  return (
    <div className="space-y-5">
      <StatsHeader user={state.user} />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {currentTask && (
            <TodayTask
              task={currentTask}
              onStart={completeTask}
              onShuffle={
                openTasks.length > 1
                  ? () => setTaskIndex((i) => i + 1)
                  : undefined
              }
            />
          )}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground">
                你的學習城市
              </h2>
              <span className="text-xs text-muted-foreground">
                {state.buildings.filter((b) => b.unlocked).length} / 8 棟已建立
              </span>
            </div>
            <CityScene buildings={state.buildings} pending={pending} />
          </div>
        </div>

        <div className="space-y-5">
          <ContinueLearning courses={state.courses} onWatch={watch} />
          <ReviewQueue due={state.user.flashcardsDue} />
          <RecentActivity activity={state.activity} />
        </div>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-4 text-center text-xs text-muted-foreground">
          🌱 學習城市不採連續簽到制 —— 今天沒登入不會失去任何進度，你累積的一切都會被城市好好保存。
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
