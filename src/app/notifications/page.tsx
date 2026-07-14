"use client";

import { useRouter } from "next/navigation";
import { HeartHandshake } from "lucide-react";
import type { NotificationTier, ReturnNotification } from "@/types";
import { seedNotifications } from "@/data/notifications";
import { useStore } from "@/lib/store";
import { NotificationPreview } from "@/components/notifications/NotificationPreview";
import { Card, CardContent } from "@/components/ui/card";

const TIER_TITLE: Record<NotificationTier, string> = {
  short: "短期中斷（30 分鐘 ~ 1 天）",
  mid: "中期未回來（3 ~ 5 天）",
  long: "長期未回來（7 天以上）",
};

const TARGET_ROUTE: Record<ReturnNotification["target"], string> = {
  resume: "/courses",
  flashcards: "/review",
  highlight: "/review",
  task: "/tasks",
};

export default function NotificationsPage() {
  const router = useRouter();
  const { dispatch } = useStore();

  function handleClick(n: ReturnNotification) {
    // Returning to learn earns a positive comeback bonus — never a penalty.
    dispatch({ type: "COMEBACK_BONUS" });
    router.push(TARGET_ROUTE[n.target]);
  }

  const tiers: NotificationTier[] = ["short", "mid", "long"];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">召回通知預覽</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          依離開時間長短，用不同語氣把你溫柔地喚回。點任一則 CTA 即可體驗深連結。
        </p>
      </div>

      <Card className="border-brand-mint/50 bg-brand-mint/10">
        <CardContent className="flex items-start gap-3 p-4">
          <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <div className="text-sm">
            <div className="font-semibold">設計原則：獎勵回歸，而非懲罰中斷</div>
            <p className="mt-0.5 text-muted-foreground">
              所有通知都不製造罪惡感、不會歸零進度。點擊回來還會獲得 +20 XP 的回歸獎勵。
            </p>
          </div>
        </CardContent>
      </Card>

      {tiers.map((tier) => (
        <section key={tier}>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            {TIER_TITLE[tier]}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {seedNotifications
              .filter((n) => n.tier === tier)
              .map((n) => (
                <NotificationPreview key={n.id} n={n} onClick={handleClick} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
