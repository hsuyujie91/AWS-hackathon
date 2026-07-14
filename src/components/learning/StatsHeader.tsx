"use client";

import { Clock, CalendarClock, GraduationCap, Target } from "lucide-react";
import type { User } from "@/types";
import { Card } from "@/components/ui/card";
import { LevelBadge } from "@/components/common/LevelBadge";
import { XpBar } from "@/components/common/XpBar";
import { formatMinutes } from "@/lib/utils";

export function StatsHeader({ user }: { user: User }) {
  const stats = [
    { icon: Clock, label: "累積學習", value: formatMinutes(user.totalMinutes) },
    { icon: CalendarClock, label: "本週學習", value: formatMinutes(user.weekMinutes) },
    { icon: GraduationCap, label: "完成課程", value: `${user.coursesCompleted} 門` },
    { icon: Target, label: "答題正確率", value: `${user.accuracy}%` },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">哈囉，{user.name} 👋</h1>
            <LevelBadge level={user.level} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            歡迎回到你的學習城市，今天也一起讓它長大吧。
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <XpBar xp={user.xp} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
            <div className="mt-1 text-lg font-bold">{value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
