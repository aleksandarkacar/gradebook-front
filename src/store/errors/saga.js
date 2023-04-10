import { put, takeLatest } from "redux-saga/effects";
import { performResetErrors, setErrors } from "./slice";

function* resetErrorsHandler() {
  try {
    yield put(setErrors(null));
  } catch (error) {
    console.log(error);
    yield put(setErrors(error));
  }
}

export function* resetErrors() {
  yield takeLatest(performResetErrors.type, resetErrorsHandler);
}
