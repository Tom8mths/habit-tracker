"use client";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Badge } from "@/src/components/ui/badge";
import { Checkbox } from "@/src/components/ui/checkbox";

interface DayViewProps {
  date: Date;
}

const DEMO_SCHEDULE = [
  {
    id: 1,
    time: "08:00",
    title: "Morning Vitamins",
    category: "health",
    completed: false,
  },
  {
    id: 2,
    time: "09:00",
    title: "Skincare Routine",
    category: "skincare",
    completed: true,
  },
  {
    id: 3,
    time: "10:00",
    title: "Protein Shake",
    category: "fitness",
    completed: false,
  },
];

const CATEGORY_COLORS = {
  health: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  skincare: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  fitness: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
};

export function DayView({ date }: DayViewProps) {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-6">
        {DEMO_SCHEDULE.map((item) => (
          <div key={item.id} className="flex items-start space-x-4">
            <div className="w-16 text-sm text-muted-foreground">{item.time}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <Checkbox checked={item.completed} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.title}</span>
                    <Badge
                      variant="secondary"
                      className={CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS]}
                    >
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}