import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllTeachers: () => {},
  performGetSingleTeacher: () => {},
  performGetAvailableTeachers: () => {},
  performSearchTeachers: () => {},
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
    singleTeacher: [],
  },
  reducers: {
    setAllTeachers: (state, action) => {
      state.data = action.payload;
    },
    setSingleTeacher: (state, action) => {
      state.singleTeacher = action.payload;
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
  performSearchTeachers,
} = teachersSlice.actions;

export default teachersSlice.reducer;
