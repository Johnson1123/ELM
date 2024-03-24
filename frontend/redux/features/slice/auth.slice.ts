import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registrationUser: (state, action) => {
      state.token = action.payload.token;
    },
    loadUser: (state, action) => {
      (state.token = action.payload.accessToken),
        (state.user = action.payload.user);
    },
    logoutUser: (state, action) => {
      (state.user = ""), (state.token = "");
    },
  },
});

export const { registrationUser, loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
