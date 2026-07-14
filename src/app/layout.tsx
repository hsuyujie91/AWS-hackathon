import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LearningCityProvider } from "@/lib/store";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "學習城市 Learning City",
  description:
    "把每一次學習，累積成一座屬於你的城市。整合學習歷程、課後複習與遊戲化養成。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <LearningCityProvider>
          <AppShell>{children}</AppShell>
        </LearningCityProvider>
      </body>
    </html>
  );
}
