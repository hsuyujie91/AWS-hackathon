"use client";

import { BookOpenCheck, BrainCircuit, Check, ChevronRight, Clock3, FilePenLine, Play } from "lucide-react";
import type { DailyTask } from "@/types";
import { cn } from "@/lib/utils";

const ICONS = { review: BrainCircuit, watch: Play, quiz: BookOpenCheck, note: FilePenLine };
const COLORS = { review: "bg-violet-100 text-violet-600", watch: "bg-blue-100 text-blue-600", quiz: "bg-amber-100 text-amber-600", note: "bg-emerald-100 text-emerald-600" };

export function DailyTasksList({ tasks, onStart }: { tasks: DailyTask[]; onStart?: (task: DailyTask) => void }) {
  const completed = tasks.filter((task) => task.done).length;
  return (
    <section className="px-4 pb-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-indigo-500">Personal plan</p>
          <h2 className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-900">今日任務</h2>
        </div>
        <p className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">{completed}/{tasks.length} 完成</p>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => {
          const Icon = ICONS[task.kind];
          return (
            <button key={task.id} disabled={task.done} onClick={() => onStart?.(task)} className={cn("flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-[0_8px_25px_-18px_rgba(15,23,42,.45)] transition active:scale-[.98]", task.done && "bg-slate-50 opacity-65")}>
              <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-[14px]", COLORS[task.kind])}>
                {task.done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate text-[13px] font-bold text-slate-800", task.done && "line-through")}>{task.title}</span>
                <span className="mt-1 flex flex-wrap items-center gap-2 text-[10px] font-medium text-slate-400"><Clock3 className="h-3 w-3" /> 約 {task.estMinutes} 分鐘 <span className="text-amber-500">+{task.xp} XP</span><span className="text-yellow-600">+{task.coins} 金幣</span></span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
