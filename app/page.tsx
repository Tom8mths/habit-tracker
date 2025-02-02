"use client"

import React, { useState } from 'react'
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Plus, Moon, Sun } from "lucide-react";
import { AddTaskDialog } from "@/components/add-task-dialog";
import { useAppSelector } from '@/redux/store/store';

export default function page() {
  const { setTheme, theme } = useTheme();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const username = useAppSelector((state) => state.categoryReducer.value.name);

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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1>category: {username}</h1>
      </main>
      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  )
}
