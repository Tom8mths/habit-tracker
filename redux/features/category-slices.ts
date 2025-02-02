import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: CategoryState;
}

type CategoryState = {
  name: string,
  color: string,
}

const initialState = {
  value: {
    name: "",
    color: "",
  }
} as InitialState;

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    addNewCategory: (state, action: PayloadAction<string>) => {
      return {
        value: {
          name: action.payload,
          color: "default"
        }
      }
    }
  }
}); 

export const { addNewCategory } = category.actions;
export default category.reducer;