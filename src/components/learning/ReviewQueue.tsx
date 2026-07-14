"use client";

import Link from "next/link";
import { Layers, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReviewQueue({ due }: { due: number }) {
  return (
    <Link href="/review">
      <Card className="transition-transform hover:-translate-y-0.5">
        <CardContent className="flex items-center gap-3 p-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-coral/15 text-brand-coral">
            <Layers className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="text-sm font-semibold">待複習項目</div>
            <div className="text-xs text-muted-foreground">
              {due} 張學習卡等你喚醒記憶
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
