import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
  performGetSingleGradebook: () => {},
  performGetMyGradebook: () => {},
  performAddGradebook: () => {},
  performAddStudent: () => {},
  performAddComment: () => {},
  performEditGradebook: () => {},
  performDeleteStudent: () => {},
  performDeleteComment: () => {},
};

const gradebooksSlice = createSlice({
  name: "gradebooks",
  initialState: {
    data: [],
    singleGradebook: [],
  },
  reducers: {
    setAllGradebooks: (state, action) => {
      state.data = action.payload;
    },
    setSingleGradebook: (state, action) => {
      state.singleGradebook = action.payload;
    },
    pushNewGradebook: (state, action) => {
      state.data.push(action.payload);
    },
    pushNewComment: (state, action) => {
      state.singleGradebook.comments.push({
        ...action.payload,
        user: {
          first_name: localStorage.getItem("first_name"),
          last_name: localStorage.getItem("last_name"),
        },
      });
    },
    removeComment: (state, action) => {
      const commentId = action.payload;
      const index = state.singleGradebook.comments.findIndex(
        (comment) => comment.id === commentId
      );
      if (index !== -1) {
        state.singleGradebook.comments.splice(index, 1);
      }
    },
    removeStudent: (state, action) => {
      const studentId = action.payload;
      const index = state.singleGradebook.students.findIndex(
        (student) => student.id === studentId
      );
      if (index !== -1) {
        state.singleGradebook.students.splice(index, 1);
      }
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
  performGetMyGradebook,
  pushNewGradebook,
  performAddStudent,
  performAddComment,
  pushNewComment,
  performDeleteComment,
  removeComment,
  performEditGradebook,
  performDeleteStudent,
  removeStudent,
} = gradebooksSlice.actions;

export default gradebooksSlice.reducer;
