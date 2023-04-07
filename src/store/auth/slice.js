import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performLogin: () => {},
  performLogout: () => {},
  performRegistration: () => {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    unSetUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    ...middlewareActions,
  },
});

export const {
  setUser,
  unSetUser,
  performLogin,
  performLogout,
  performRegistration,
} = authSlice.actions;

export default authSlice.reducer;
