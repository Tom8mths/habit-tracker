import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { DayView } from "@/src/components/day-view";
import { DashboardStats } from "@/src/components/dashboard-stats";
import { BarChart3, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { ChatUI } from "./ai-assistant/chat-ui";


export function MainTabs() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Tabs defaultValue="calendar" className="space-y-4">
      <TabsList>
        <TabsTrigger value="calendar" className="gap-2">
          <CalendarIcon className="h-4 w-4" /> Calendar
        </TabsTrigger>
        <TabsTrigger value="dashboard" className="gap-2">
          <BarChart3 className="h-4 w-4" /> Dashboard
        </TabsTrigger>
      </TabsList>
      <TabsContent value="calendar" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <Card>
            <CardContent className="p-3 h-full">
              <ChatUI />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DayView date={date} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="dashboard">
        <DashboardStats />
      </TabsContent>
    </Tabs>
  );
}