"use client";

import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store/store";
import { createTask } from "@/src/utils/api/tasks";
import { setTask } from "@/src/redux/features/category-slices";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector((state: RootState) => state.category.task);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  // Handle input changes for title and date
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setTask({ ...task, [name]: value }));
  };

  // Handle category and occurrence selection
  const handleSelectChange = (field: "category" | "occurrence") => (value: string) => {
    dispatch(setTask({ ...task, [field]: value }));
  };

  // Handle time separately
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  // Handle task submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true);

    try {
      const fullDate = new Date(`${task.date}T${time}`);
      const taskData = { ...task, date: fullDate.toISOString() };

      await createTask(taskData); // Send to API
      onOpenChange(false); // Close modal
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
                value={task.title} 
                onChange={handleChange} 
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={task.category} onValueChange={handleSelectChange("category")}>
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
                value={task.date.toString().split("T")[0]} 
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
              <Select value={task.occurrence} onValueChange={handleSelectChange("occurrence")}>
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
            <Button loading={loading} type="submit">
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
