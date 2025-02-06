"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { addNewCategory, category } from "@/redux/features/category-slices";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
  const [ isAddingCategory, setIsAddingCategory ] = useState(false);

  const handleCategorySelect = (open: boolean) => {
    if (!open) setIsAddingCategory(false);
  }

  const dispatch = useDispatch<AppDispatch>();
  const [ category, setCategory ] = useState('')

  const onClickLogIn = () => {
    dispatch(addNewCategory(category))
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter task title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onOpenChange={handleCategorySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="skincare">Skincare</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                  {isAddingCategory ? <Input id="category" onChange={(e) => setCategory(e.target.value)} placeholder="Enter category name" />
                :
                  <Button
                    onClick={() => setIsAddingCategory(true)}
                    className="inline-flex items-center justify-center"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                }
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="alternate">Alternate Days</SelectItem>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onClickLogIn}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}