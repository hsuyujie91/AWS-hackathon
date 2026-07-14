"use client";

import { useMemo, useState } from "react";
import type { DailyTask } from "@/types";
import { useStore } from "@/lib/store";
import { buildingLevelFromMinutes } from "@/lib/xp";
import { InteractiveCity } from "@/components/city/InteractiveCity";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { DailyTasksList } from "@/components/learning/DailyTasksList";
import { SuccessModal, type SuccessInfo } from "@/components/common/SuccessModal";

export default function HomePage() {
  const { state, dispatch } = useStore();
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

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

  return (
    <div className="space-y-6 pb-8">
      <FloatingNav />

      {/* City overview */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground px-2">
          你的學習城市
        </h2>
        <InteractiveCity buildings={state.buildings} pending={pending} />
      </div>

      {/* Daily tasks */}
      <DailyTasksList tasks={state.tasks} onStart={completeTask} />

      <SuccessModal
        info={success}
        onClose={() => setSuccess(null)}
      />
    </div>
  );
}
