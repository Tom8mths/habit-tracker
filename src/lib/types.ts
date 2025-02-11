export type Category = 'health' | 'skincare' | 'fitness';

export type Schedule = 'daily' | 'alternate' | 'weekdays' | 'weekends';

export interface Task {
  id: number;
  title: string;
  category: Category;
  time: string;
  schedule: Schedule;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  completionRate: number;
  currentStreak: number;
  totalTasks: number;
  activeTasks: number;
  monthlyProgress: number;
  weeklyChange: number;
}