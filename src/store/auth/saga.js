import { call, put, takeLatest } from "redux-saga/effects";
import {
  performLogin,
  performLogout,
  performRegistration,
  setUser,
  unSetUser,
} from "./slice";
import authService from "../../services/AuthService";
import { setErrors } from "../errors/slice";

function* loginUserHandler({ payload }) {
  try {
    const user = yield call(authService.login, payload);
    yield put(setUser(user));
  } catch (error) {
    console.log(error);
    yield put(setErrors(error));
  }
}

function* logoutUserHandler() {
  try {
    yield call(authService.logout);
    yield put(unSetUser());
  } catch (error) {
    console.log(error);
    yield put(setErrors(error));
  }
}

function* registerUserHandler({ payload }) {
  try {
    const user = yield call(authService.register, payload);
    yield put(setUser(user));
  } catch (error) {
    console.log(error);
    yield put(setErrors(error));
  }
}

export function* watchLogin() {
  yield takeLatest(performLogin.type, loginUserHandler);
}

export function* watchLogout() {
  yield takeLatest(performLogout.type, logoutUserHandler);
}

export function* watchRegistration() {
  yield takeLatest(performRegistration.type, registerUserHandler);
}
