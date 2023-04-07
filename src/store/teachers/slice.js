import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllTeachers: () => {},
  performGetSingleTeacher: () => {},
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    data: [],
  },
  reducers: {
    setAllTeachers: (state, action) => {
      state.data = action.payload;
    },
    setSingleTeacher: (state, action) => {
      state.data = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setAllTeachers,
  setSingleTeacher,
  performGetAllTeachers,
  performGetSingleTeacher,
} = teachersSlice.actions;

export default teachersSlice.reducer;
