"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import type { NotificationTier, ReturnNotification } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TIER_STYLE: Record<
  NotificationTier,
  { label: string; badge: "default" | "sun" | "coral"; ring: string }
> = {
  short: { label: "短期中斷", badge: "default", ring: "border-brand-sky/40" },
  mid: { label: "中期未回來", badge: "sun", ring: "border-brand-sun/50" },
  long: { label: "長期未回來", badge: "coral", ring: "border-brand-coral/40" },
};

/** A phone-style push notification preview card. */
export function NotificationPreview({
  n,
  onClick,
}: {
  n: ReturnNotification;
  onClick?: (n: ReturnNotification) => void;
}) {
  const style = TIER_STYLE[n.tier];
  return (
    <Card className={cn("border-2", style.ring)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant={style.badge}>{style.label}</Badge>
          <span className="text-[11px] text-muted-foreground">{n.timeframe}</span>
        </div>

        {/* Mock push bubble */}
        <div className="mt-3 flex gap-3 rounded-2xl bg-muted/50 p-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold">學習城市</div>
            <p className="mt-0.5 text-sm leading-snug">{n.body}</p>
          </div>
        </div>

        <button
          onClick={() => onClick?.(n)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          {n.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </CardContent>
    </Card>
  );
}
