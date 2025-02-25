import { getTasks } from "@/src/utils/api/tasks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskItem {
  _id: number;
  time: string;
  title: string;
  category: string;
  completed: boolean;
}

interface TaskState {
  tasks: TaskItem[],
  loading: boolean,
  error: string | null
}

const initialState: TaskState = {
 tasks: [],
 loading: false,
 error: null
}

export const loadTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getTasks();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTasks.fulfilled, (state, action: PayloadAction<TaskItem[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;