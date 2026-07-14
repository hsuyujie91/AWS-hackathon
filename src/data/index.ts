import type { AppState, User } from "@/types";
import { seedBuildings } from "./buildings";
import { seedCourses } from "./courses";
import { seedFlashcards, seedQuizzes } from "./review";
import { seedTasks } from "./tasks";
import { seedActivity } from "./activity";
import { generateDailyTasks } from "@/lib/ai-coach";

export const seedUser: User = {
  name: "小魚",
  level: 7,
  xp: 1280,
  totalMinutes: 1280,
  weekMinutes: 95,
  coursesCompleted: 3,
  coursesInProgress: 4,
  flashcardsDue: 12,
  quizzesDone: 38,
  accuracy: 78,
};

/** A fresh, complete AppState. Cloned on every reset so seeds stay immutable. */
export function createInitialState(): AppState {
  const baseState = structuredClone({
    user: seedUser,
    buildings: seedBuildings,
    courses: seedCourses,
    flashcards: seedFlashcards,
    quizzes: seedQuizzes,
    tasks: seedTasks,
    activity: seedActivity,
    notes: [] as string[],
  });

  // Generate personalized daily tasks based on user profile
  const personalizedTasks = generateDailyTasks({
    user: baseState.user,
    buildings: baseState.buildings,
    completedTasks: baseState.tasks.filter((t) => t.done).map((t) => t.id),
  });

  // Replace seed tasks with AI-generated personalized tasks
  baseState.tasks = personalizedTasks.length > 0 ? personalizedTasks : baseState.tasks;

  return baseState;
}

export {
  seedBuildings,
  seedCourses,
  seedFlashcards,
  seedQuizzes,
  seedTasks,
  seedActivity,
};
