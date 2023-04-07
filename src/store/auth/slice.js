import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performLogin: () => {},
  performLogout: () => {},
  performRegistration: () => {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    ...middlewareActions,
  },
});

export const { setUser, performLogin, performLogout, performRegistration } =
  authSlice.actions;

export default authSlice.reducer;
