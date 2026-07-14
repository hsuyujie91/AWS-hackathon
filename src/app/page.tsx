"use client";

import { useState } from "react";
import type { DailyTask } from "@/types";
import { useStore } from "@/lib/store";
import { buildingLevelFromMinutes } from "@/lib/xp";
import { InteractiveCityV2 } from "@/components/city/InteractiveCityV2";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { DailyTasksList } from "@/components/learning/DailyTasksList";
import { SuccessModal, type SuccessInfo } from "@/components/common/SuccessModal";

export default function HomePage() {
  const { state, dispatch } = useStore();
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

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

      {/* 城市地圖 */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground px-2">
          你的學習城市
        </h2>
        <div className="h-96 rounded-2xl overflow-hidden border border-border shadow-lg">
          <InteractiveCityV2 buildings={state.buildings} />
        </div>
      </div>

      {/* 每日任務 */}
      <div className="space-y-3 px-2">
        <h2 className="text-sm font-semibold text-muted-foreground">每日任務</h2>
        <DailyTasksList tasks={state.tasks} onStart={completeTask} />
      </div>

      <SuccessModal
        info={success}
        onClose={() => setSuccess(null)}
      />
    </div>
  );
}
