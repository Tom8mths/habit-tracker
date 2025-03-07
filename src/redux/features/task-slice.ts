import { Task } from "@/src/lib/types";
import { addNewTask, getTasks } from "@/src/utils/api/tasks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Task[];
  loading: {
    fetch: boolean;
    create: boolean;
  };
  error: {
    fetch: string | null;
    create: string | null;
  };
}

const initialState: TaskState = {
  tasks: [],
  loading: {
    fetch: false,
    create: false,
  },
  error: {
    fetch: null,
    create: null,
  },
};

// Thunk to load all tasks
export const fetchTasks = createAsyncThunk<Task[], void>(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getTasks();
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to add a new task
export const createTask = createAsyncThunk<Task, Task>(
  "tasks/create",
  async (data, { rejectWithValue }) => {
    try {
      
      return await addNewTask(data);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling Load Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading.fetch = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload as string;
      })

      // Handling Add New Task
      .addCase(createTask.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading.create = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload as string;
      });
  },
});

export const { addTask } = taskSlice.actions; 

export default taskSlice.reducer;
