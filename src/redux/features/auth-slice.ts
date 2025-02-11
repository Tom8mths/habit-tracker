import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
}

type AuthState = {
  isAuth: boolean,
  username: string,
  uid: string,
}

const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
  }
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: "aseeae1qewea",
        }
      }
    }
  }
}); 

export const {logIn, logOut} = auth.actions;
export default auth.reducer;