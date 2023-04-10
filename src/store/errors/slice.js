import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performSetErrors: () => {},
  performResetErrors: () => {},
};

const errorsSlice = createSlice({
  name: "errors",
  initialState: {
    data: null,
  },
  reducers: {
    setErrors: (state, action) => {
      state.data = action.payload;
    },
    ...middlewareActions,
  },
});

export const { performSetErrors, setErrors, performResetErrors, resetErrors } =
  errorsSlice.actions;

export default errorsSlice.reducer;
