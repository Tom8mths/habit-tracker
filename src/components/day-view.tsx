import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Badge } from "@/src/components/ui/badge";
import { AppDispatch, useAppSelector, RootState } from '@/src/redux/store/store';
import { useEffect } from "react";
import { fetchTasks } from "../redux/features/task-slice";
import { useDispatch, useSelector } from "react-redux";
import { MagicCard } from "./magicui/magic-card";
import { useTheme } from "next-themes";

interface DayViewProps {
  date: Date;
}

const CATEGORY_COLORS = {
  health: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  skincare: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  fitness: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
};

export function DayView({ date }: DayViewProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { theme } = useTheme();
  
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useAppSelector((state: RootState) => state.task);

  useEffect(() => {
      dispatch(fetchTasks());
  }, [dispatch, isAuthenticated])

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-6">
        { loading.fetch ? (
          <p>Loading...</p>
        ) : error.fetch ? (
          <p>{`${error.fetch}`}</p>
        ) : (
            tasks.map((item) => (
              <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} key={item._id}>
                <div className="w-16 text-sm text-muted-foreground">{item.time}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 border p-4">
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
              </MagicCard>
            ))
        )}
      </div>
    </ScrollArea>
  );
}