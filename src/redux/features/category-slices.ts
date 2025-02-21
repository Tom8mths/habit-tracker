import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task = {
  title: string;
  occurrence: "daily" | "weekly" | "monthly" | "alternate";
  category: string;
  date: string | Date;
};

type InitialState = {
  task: Task;
};

const initialState: InitialState = {
  task: {
    title: "",
    occurrence: "daily",
    category: "",
    date: "",
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
  },
});

export const { setTask } = categorySlice.actions;
export default categorySlice.reducer;
