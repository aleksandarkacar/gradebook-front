import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";
import sagas from "./sagas";
import authReducer from "./auth/slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), sagaMiddleware];
  },
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
