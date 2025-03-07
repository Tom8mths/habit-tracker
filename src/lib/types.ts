export type Occurrence =  "daily" | "weekly" | "monthly" | "alternate";

export interface Task {
  id?: number;
  title: string;
  category: string;
  time?: string;
  date: string | Date,
  occurrence: Occurrence;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Stats {
  completionRate: number;
  currentStreak: number;
  totalTasks: number;
  activeTasks: number;
  monthlyProgress: number;
  weeklyChange: number;
}