"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, TrendingUp, Play } from "lucide-react";
import type { CategoryId, Course } from "@/types";
import { useStore } from "@/lib/store";
import {
  buildingLevelFromMinutes,
  minutesToNextLevel,
  nextLevelThreshold,
} from "@/lib/xp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/common/LevelBadge";
import { CourseCard } from "@/components/courses/CourseCard";
import { SuccessModal, type SuccessInfo } from "@/components/common/SuccessModal";
import { formatMinutes } from "@/lib/utils";

export default function BuildingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { state, dispatch } = useStore();
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

  const building = state.buildings.find((b) => b.id === params.id);

  const courses = useMemo(
    () => state.courses.filter((c) => c.category === (params.id as CategoryId)),
    [state.courses, params.id],
  );
  const activity = useMemo(
    () => state.activity.filter((a) => a.category === (params.id as CategoryId)),
    [state.activity, params.id],
  );

  if (!building) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">找不到這棟建築。</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          回到城市
        </Button>
      </div>
    );
  }

  const toNext = minutesToNextLevel(building.minutes);
  const nextThreshold = nextLevelThreshold(building.minutes);
  const levelProgress =
    nextThreshold !== null
      ? (building.minutes / nextThreshold) * 100
      : 100;

  function watch(course: Course) {
    const mins = Math.min(course.minutesLeft || 5, 5);
    const leveledUp =
      buildingLevelFromMinutes(building!.minutes + mins) > building!.level;
    dispatch({ type: "WATCH_COURSE", courseId: course.id, minutes: mins });
    setSuccess({ xp: mins, buildingName: building!.name, leveledUp });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        回到城市
      </button>

      {/* Hero */}
      <Card
        className="overflow-hidden"
        style={{ borderColor: `${building.color}55` }}
      >
        <div
          className="flex items-center gap-4 p-6"
          style={{ background: `linear-gradient(135deg, ${building.color}18, transparent)` }}
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-card text-4xl shadow-card">
            {building.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{building.name}</h1>
              <LevelBadge level={building.level} />
            </div>
            <Badge variant="secondary" className="mt-1">
              {building.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          {toNext !== null ? (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  距離 Lv.{building.level + 1} 還差
                </span>
                <span className="font-semibold">{formatMinutes(toNext)}</span>
              </div>
              <Progress
                value={levelProgress}
                className="mt-2"
                indicatorClassName="bg-brand-mint"
              />
            </>
          ) : (
            <div className="rounded-xl bg-brand-sun/15 p-3 text-center text-sm font-semibold text-amber-700">
              🏆 已達最高等級 Lv.5！
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Clock, label: "學習時間", value: formatMinutes(building.minutes) },
          { icon: BookOpen, label: "完成章節", value: `${building.chaptersDone} 章` },
          { icon: TrendingUp, label: "目前等級", value: `Lv.${building.level}` },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <Icon className="mx-auto h-4 w-4 text-muted-foreground" />
              <div className="mt-1 text-base font-bold">{value}</div>
              <div className="text-[11px] text-muted-foreground">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Courses in this category */}
      {courses.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
            可以執行的學習任務
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {courses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                building={building}
                onWatch={watch}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent activity in this category */}
      {activity.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">最近活動</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {activity.slice(0, 5).map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Play className="h-3.5 w-3.5" />
                {a.title}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <SuccessModal info={success} onClose={() => setSuccess(null)} />
    </div>
  );
}
