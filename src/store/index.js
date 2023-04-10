import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";
import sagas from "./sagas";
import authReducer from "./auth/slice";
import teacherReducer from "./teachers/slice";
import gradebookReducer from "./gradebooks/slice";
import errorReducer from "./errors/slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    gradebook: gradebookReducer,
    teacher: teacherReducer,
    errors: errorReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({ serializableCheck: false }),
      sagaMiddleware,
    ];
  },
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
