"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Quiz, Flashcard, Course } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuizModal({
  quizzes,
  onClose,
}: {
  quizzes: Quiz[];
  onClose: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (quizzes.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>沒有測驗</CardTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground text-center py-6">
            這棟建築還沒有測驗題目。完成更多課程後會解鎖新測驗。
          </CardContent>
        </Card>
      </div>
    );
  }

  const quiz = quizzes[currentIdx];
  const isCorrect = selectedAnswer === quiz.answerIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>測驗檢查</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {currentIdx + 1} / {quizzes.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-base font-medium">{quiz.question}</p>
            <div className="space-y-2">
              {quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!answered) {
                      setSelectedAnswer(idx);
                      setAnswered(true);
                    }
                  }}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedAnswer === idx
                      ? isCorrect
                        ? "border-green-500 bg-green-500/10"
                        : "border-red-500 bg-red-500/10"
                      : "border-border hover:border-primary/50"
                  } ${answered ? "cursor-default" : "cursor-pointer"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {answered && (
            <div
              className={`rounded-lg p-4 ${
                isCorrect
                  ? "bg-green-500/10 text-green-600"
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              <p className="font-semibold mb-2">
                {isCorrect ? "✓ 正確！" : "✗ 不對"}
              </p>
              <p className="text-sm">{quiz.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                if (currentIdx > 0) {
                  setCurrentIdx(currentIdx - 1);
                  setSelectedAnswer(null);
                  setAnswered(false);
                }
              }}
              disabled={currentIdx === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一題
            </Button>
            <Button
              onClick={() => {
                if (currentIdx < quizzes.length - 1) {
                  setCurrentIdx(currentIdx + 1);
                  setSelectedAnswer(null);
                  setAnswered(false);
                }
              }}
              disabled={currentIdx === quizzes.length - 1}
              className="flex-1"
            >
              下一題
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FlashcardsModal({
  flashcards,
  onClose,
}: {
  flashcards: Flashcard[];
  onClose: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [familiarity, setFamiliarity] = useState<Record<string, string>>({});

  if (flashcards.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>沒有學習卡</CardTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground text-center py-6">
            這棟建築還沒有學習卡。完成課程後會自動生成。
          </CardContent>
        </Card>
      </div>
    );
  }

  const card = flashcards[currentIdx];
  const cardFamiliarity = familiarity[card.id] || card.familiarity || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>學習卡複習</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {currentIdx + 1} / {flashcards.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-48 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 text-center"
          >
            <div>
              <p className="text-xs text-muted-foreground mb-3">
                {isFlipped ? "背面" : "正面"}
              </p>
              <p className="text-lg font-medium leading-relaxed">
                {isFlipped ? card.back : card.front}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                點擊翻轉卡片
              </p>
            </div>
          </button>

          {isFlipped && (
            <div className="flex gap-2 justify-center">
              {["forgot", "fuzzy", "known"].map((level) => (
                <button
                  key={level}
                  onClick={() => setFamiliarity({ ...familiarity, [card.id]: level })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    cardFamiliarity === level
                      ? "border-primary bg-primary/10 font-medium"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {level === "forgot" && "🤔 忘記"}
                  {level === "fuzzy" && "🤨 模糊"}
                  {level === "known" && "✓ 記得"}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                if (currentIdx > 0) {
                  setCurrentIdx(currentIdx - 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentIdx === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一張
            </Button>
            <Button
              onClick={() => {
                if (currentIdx < flashcards.length - 1) {
                  setCurrentIdx(currentIdx + 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentIdx === flashcards.length - 1}
              className="flex-1"
            >
              下一張
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function NotesModal({
  buildingName,
  notes,
  onAddNote,
  onClose,
}: {
  buildingName: string;
  notes: string[];
  onAddNote: (note: string) => void;
  onClose: () => void;
}) {
  const [newNote, setNewNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-96 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-3 flex-shrink-0">
          <CardTitle>學習筆記 · {buildingName}</CardTitle>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 overflow-y-auto">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              還沒有筆記。寫下你的學習重點吧！
            </p>
          ) : (
            <div className="space-y-2">
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-muted/50 text-sm leading-relaxed"
                >
                  {note}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2 pt-4 border-t border-border">
            <label className="text-sm font-medium text-muted-foreground">
              新增筆記
            </label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="寫下你今天學到的重點..."
              className="w-full p-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <Button
              onClick={() => {
                if (newNote.trim()) {
                  onAddNote(newNote);
                  setNewNote("");
                }
              }}
              disabled={!newNote.trim()}
              className="w-full"
            >
              保存筆記
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function HighlightsModal({
  courses,
  onClose,
}: {
  courses: Course[];
  onClose: () => void;
}) {
  if (courses.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>課程精華</CardTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground text-center py-6">
            還沒有課程。開始第一堂課程吧！
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-96 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-3 flex-shrink-0">
          <CardTitle>課程精華</CardTitle>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-3 flex-1 overflow-y-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-1">{course.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    講師：{course.instructor}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        進度
                      </span>
                      <span className="text-xs font-medium">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {course.resumePoint && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  📍 暫停在：{course.resumePoint}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
