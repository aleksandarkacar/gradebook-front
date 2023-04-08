import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
  performGetSingleGradebook: () => {},
  performAddGradebook: () => {},
};

const gradebooksSlice = createSlice({
  name: "gradebooks",
  initialState: {
    data: [],
  },
  reducers: {
    setAllGradebooks: (state, action) => {
      state.data = action.payload;
    },
    setSingleGradebook: (state, action) => {
      state.data = action.payload;
    },
    pushNewGradebook: (state, action) => {
      state.data.push(action.payload);
    },
    ...middlewareActions,
  },
});

export const {
  setAllGradebooks,
  setSingleGradebook,
  performGetAllGradebooks,
  performGetSingleGradebook,
  performAddGradebook,
  pushNewGradebook,
} = gradebooksSlice.actions;

export default gradebooksSlice.reducer;
