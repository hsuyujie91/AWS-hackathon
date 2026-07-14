"use client";

import { useMemo, useState } from "react";
import type { Familiarity } from "@/types";
import { useStore } from "@/lib/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Flashcard } from "@/components/review/Flashcard";
import { QuizCard } from "@/components/review/QuizCard";
import { CourseHighlight } from "@/components/review/CourseHighlight";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const { state, dispatch } = useStore();

  // --- Flashcards ---
  const [cardIdx, setCardIdx] = useState(0);
  const cards = state.flashcards;
  const card = cards[cardIdx % cards.length];
  const [aiHint, setAiHint] = useState<string | null>(null);

  function rate(f: Familiarity) {
    dispatch({ type: "RATE_FLASHCARD", cardId: card.id, familiarity: f });
    setAiHint(null);
    setCardIdx((i) => i + 1);
  }

  // --- Quiz ---
  const [quizIdx, setQuizIdx] = useState(0);
  const quiz = state.quizzes[quizIdx % state.quizzes.length];

  // --- Highlights ---
  const reviewableCourses = useMemo(
    () => state.courses.filter((c) => c.progress > 20),
    [state.courses],
  );
  const [courseId, setCourseId] = useState(reviewableCourses[0]?.id);
  const selectedCourse =
    reviewableCourses.find((c) => c.id === courseId) ?? reviewableCourses[0];

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold">複習中心</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          記憶卡、測驗與課程精華，幫你把學過的內容留下來。
        </p>
      </div>

      <Tabs defaultValue="flashcards">
        <TabsList className="w-full">
          <TabsTrigger value="flashcards" className="flex-1">
            記憶卡
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex-1">
            問題測驗
          </TabsTrigger>
          <TabsTrigger value="highlight" className="flex-1">
            課程精華
          </TabsTrigger>
        </TabsList>

        {/* Flashcards */}
        <TabsContent value="flashcards">
          <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
            <span>第 {(cardIdx % cards.length) + 1} / {cards.length} 張</span>
            <span>依你的熟悉度安排下次複習</span>
          </div>
          <Flashcard
            key={card.id}
            card={card}
            onRate={rate}
            onExplain={() =>
              setAiHint(
                "AI 助教：把它想成『一次買下一整個菜籃』——你不用自己挑每一樣菜，籃子裡已經幫你配好多種標的，風險自然分散。",
              )
            }
          />
          {aiHint && (
            <Card className="mt-3 border-brand-sky/40 bg-brand-sky/5 animate-rise">
              <CardContent className="p-4 text-sm">{aiHint}</CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Quiz */}
        <TabsContent value="quiz">
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onAnswered={(correct) =>
              dispatch({ type: "ANSWER_QUIZ", quizId: quiz.id, correct })
            }
          />
          <div className="mt-3 flex justify-end">
            <Button variant="outline" onClick={() => setQuizIdx((i) => i + 1)}>
              下一題
            </Button>
          </div>
        </TabsContent>

        {/* Highlights */}
        <TabsContent value="highlight">
          <div className="mb-3 flex flex-wrap gap-2">
            {reviewableCourses.map((c) => (
              <button
                key={c.id}
                onClick={() => setCourseId(c.id)}
                className={
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                  (selectedCourse?.id === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground")
                }
              >
                {c.title}
              </button>
            ))}
          </div>
          {selectedCourse && <CourseHighlight course={selectedCourse} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
