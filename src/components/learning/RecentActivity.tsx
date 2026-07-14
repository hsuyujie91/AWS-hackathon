"use client";

import {
  Play,
  CheckCircle2,
  PencilLine,
  HelpCircle,
  Layers,
  TrendingUp,
} from "lucide-react";
import type { ActivityEntry, ActivityType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const ICON: Record<ActivityType, typeof Play> = {
  watch: Play,
  task: CheckCircle2,
  note: PencilLine,
  quiz: HelpCircle,
  review: Layers,
  upgrade: TrendingUp,
};

export function RecentActivity({
  activity,
  limit = 6,
}: {
  activity: ActivityEntry[];
  limit?: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">最近學習紀錄</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {activity.slice(0, limit).map((a) => {
          const Icon = ICON[a.type];
          return (
            <div key={a.id} className="flex items-center gap-3 py-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">{a.title}</div>
                <div className="text-[11px] text-muted-foreground">
                  {formatDate(a.date)}
                  {a.minutes ? ` · ${a.minutes} 分鐘` : ""}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
