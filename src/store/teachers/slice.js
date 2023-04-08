import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllTeachers: () => {},
  performGetSingleTeacher: () => {},
  performGetAvailableTeachers: () => {},
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    data: [],
    available: [
      {
        name: "",
      },
    ],
  },
  reducers: {
    setAllTeachers: (state, action) => {
      state.data = action.payload;
    },
    setSingleTeacher: (state, action) => {
      state.data = action.payload;
    },
    setAvailableTeachers: (state, action) => {
      state.available = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setAllTeachers,
  setSingleTeacher,
  setAvailableTeachers,
  performGetAllTeachers,
  performGetSingleTeacher,
  performGetAvailableTeachers,
} = teachersSlice.actions;

export default teachersSlice.reducer;
