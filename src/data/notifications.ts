import type { ReturnNotification } from "@/types";

/**
 * Catch-up notifications. Note the deliberate design: no guilt, no streak loss.
 * Copy always answers: where you stopped, why it's low-effort, what to do now.
 */
export const seedNotifications: ReturnNotification[] = [
  {
    id: "n1",
    tier: "short",
    timeframe: "離開 30 分鐘",
    body: "你上次停在『ETF 的風險分散』，剩下 4 分鐘就能完成這一章。圖書館正在等你放進下一本書。",
    cta: "從剛才的地方繼續",
    target: "resume",
  },
  {
    id: "n2",
    tier: "short",
    timeframe: "離開 1 天",
    body: "你的城市昨天長高了一點點！回來看 3 分鐘，投資銀行就能再升一級。",
    cta: "3 分鐘完成本章",
    target: "resume",
  },
  {
    id: "n3",
    tier: "mid",
    timeframe: "3 天未回來",
    body: "學習城市幫你整理了上次的三個重點，花 60 秒就能快速想起來。",
    cta: "先看摘要再繼續",
    target: "highlight",
  },
  {
    id: "n4",
    tier: "mid",
    timeframe: "5 天未回來",
    body: "有 12 張記憶卡在複習中心等你，挑一張最有印象的，60 秒喚醒記憶。",
    cta: "抽一張記憶卡",
    target: "flashcards",
  },
  {
    id: "n5",
    tier: "long",
    timeframe: "7 天未回來",
    body: "好久不見！城市沒有荒廢，你之前累積的學習都還在。今天要不要從一張記憶卡重新開始？",
    cta: "從一張記憶卡開始",
    target: "flashcards",
  },
  {
    id: "n6",
    tier: "long",
    timeframe: "14 天未回來",
    body: "歡迎回來！你的城市一直幫你保存著之前的學習成果。今天從三分鐘的小任務重新開始吧。",
    cta: "做一個 3 分鐘小任務",
    target: "task",
  },
];
