"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";
import { Plus, Moon, Sun, CalendarIcon, BarChart3 } from "lucide-react";
import { AddTaskDialog } from "@/src/components/modals/add-task-dialog";
import { RootState, AppDispatch } from '@/src/redux/store/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
// import { Calendar } from "@/src/components/ui/calendar";
import { DayView } from "@/src/components/day-view";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { TaskList } from "@/src/components/task-list";
import { DashboardStats } from "@/src/components/dashboard-stats";
import { SignInModal } from '../components/modals/sign-in-modal';
import { useDispatch, useSelector } from 'react-redux';
import UserMenu from '../components/user-menu';
import { loadUserFromStorage, setUser } from '../redux/features/auth-slice';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [date, setDate] = useState<Date>(new Date());
  const { setTheme, theme } = useTheme();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    const user = loadUserFromStorage();
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Habt</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              onClick={() => setIsAddTaskOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Task
            </Button>
            { isAuthenticated ?
            <UserMenu /> :
              <Button
                onClick={() => setIsSignInModalOpen(true)}
                className="gap-2"
                variant="outline"
              >
                Sign in / Sign up
              </Button>
            }
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
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
                <CardContent className="p-3">
                  {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md"
                  /> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
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

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <TaskList />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <DashboardStats />
          </TabsContent>
        </Tabs>
      </main>
      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
      <SignInModal open={isSignInModalOpen} onOpenChange={setIsSignInModalOpen} />
    </div>
  )
}
