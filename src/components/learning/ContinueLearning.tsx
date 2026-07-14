"use client";

import { Play } from "lucide-react";
import type { Course } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function ContinueLearning({
  courses,
  onWatch,
}: {
  courses: Course[];
  onWatch: (course: Course) => void;
}) {
  const inProgress = courses
    .filter((c) => c.status === "in-progress")
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  if (inProgress.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">繼續觀看</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {inProgress.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 rounded-xl border border-border p-3"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{c.title}</div>
              <div className="truncate text-xs text-muted-foreground">
                {c.resumePoint ?? c.instructor}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Progress value={c.progress} className="h-1.5" />
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {c.progress}%
                </span>
              </div>
            </div>
            <Button size="sm" onClick={() => onWatch(c)}>
              <Play className="h-3.5 w-3.5" />
              繼續
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
