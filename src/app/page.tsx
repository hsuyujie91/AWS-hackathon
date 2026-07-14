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
  const [showTasks, setShowTasks] = useState(false);

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
    <div className="relative w-full min-h-screen">
      {/* 全屏地图 */}
      <InteractiveCityV2 buildings={state.buildings} />

      {/* 浮动导航 */}
      <FloatingNav />

      {/* 任务面板 - 可展开/收起 */}
      <div
        className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ${
          showTasks ? "translate-y-0" : "translate-y-full"
        } max-h-96 bg-card border-t border-border shadow-lg overflow-y-auto z-10`}
      >
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">每日任務</h2>
            <button
              onClick={() => setShowTasks(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <DailyTasksList tasks={state.tasks} onStart={completeTask} />
        </div>
      </div>

      {/* 任务开关按钮 */}
      <button
        onClick={() => setShowTasks(!showTasks)}
        className="fixed bottom-4 right-20 z-20 bg-brand-coral hover:bg-brand-coral/90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg font-bold text-xl transition-transform hover:scale-110"
      >
        📋
      </button>

      <SuccessModal
        info={success}
        onClose={() => setSuccess(null)}
      />
    </div>
  );
}
