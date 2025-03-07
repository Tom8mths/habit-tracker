"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/src/redux/store/store";
import { createTask } from "@/src/redux/features/task-slice";
import { Task } from "@/src/lib/types";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
  const [localTask, setLocalTask] = useState<Task>({
    title: "",
    occurrence: "daily",
    category: "",
    date: "",
  });
  const { error } = useAppSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalTask((prev: Task) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: "category" | "occurrence") => (value: string) => {
    setLocalTask((prev: Task) => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fullDate = new Date(`${localTask.date}T${time}`);
      const taskData = { ...localTask, date: fullDate.toISOString() };

      await dispatch(createTask(taskData)).unwrap();
      onOpenChange(false);
      setLocalTask({ title: "", occurrence: "daily", category: "", date: "" });
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogDescription>Add a task</DialogDescription>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Task Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Enter task title" 
                value={localTask.title} 
                onChange={handleChange} 
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={localTask.category} onValueChange={handleSelectChange("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="skincare">Skincare</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                name="date" 
                type="date" 
                value={localTask.date.toString().split("T")[0]} 
                onChange={handleChange} 
              />
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time" 
                type="time" 
                value={time} 
                onChange={handleTimeChange} 
              />
            </div>

            {/* Occurrence Selection */}
            <div className="space-y-2">
              <Label htmlFor="schedule">Occurrence</Label>
              <Select value={localTask.occurrence} onValueChange={handleSelectChange("occurrence")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Occurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="alternate">Alternate Days</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button loading={loading} color="black" spinnerColor="black" type="submit">
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
