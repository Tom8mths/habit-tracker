"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Badge } from "@/src/components/ui/badge";
import { ScrollArea } from "@/src/components/ui/scroll-area";

const DEMO_TASKS = [
  {
    id: 1,
    title: "Take Vitamins",
    category: "health",
    time: "08:00",
    completed: false,
  },
  {
    id: 2,
    title: "Skincare Routine",
    category: "skincare",
    time: "09:00",
    completed: true,
  },
  {
    id: 3,
    title: "Protein Shake",
    category: "fitness",
    time: "10:00",
    completed: false,
  },
];

const CATEGORY_COLORS = {
  health: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  skincare: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  fitness: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
};

export function TaskList() {
  return (
    <div className="space-y-4">
      {DEMO_TASKS.map((task) => (
        <div
          key={task.id}
          className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <Checkbox checked={task.completed} />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{task.title}</span>
              <Badge
                variant="secondary"
                className={CATEGORY_COLORS[task.category as keyof typeof CATEGORY_COLORS]}
              >
                {task.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{task.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}