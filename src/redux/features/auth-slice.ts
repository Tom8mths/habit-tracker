import { registerUser, signIn } from "@/src/utils/api/auth";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
  profilePic?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: null,
};

// Thunk actions for signing in and signing up
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const userData = await registerUser(name, email, password);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userData = await signIn(email, password);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Action to load user from localStorage
export const loadUserFromStorage = () => {
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  if (storedUser) {
    return JSON.parse(storedUser) as User;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem("user");
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    resetAuthState(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.successMessage = "User signed up successfully.";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.successMessage = "User signed in successfully.";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut, setUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
