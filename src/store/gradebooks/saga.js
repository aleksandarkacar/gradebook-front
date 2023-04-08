import { call, put, takeLatest } from "redux-saga/effects";
import gradebookService from "../../services/GradebookService";
import {
  performGetAllGradebooks,
  performGetSingleGradebook,
  performAddGradebook,
  setAllGradebooks,
  setSingleGradebook,
  pushNewGradebook,
} from "./slice";

function* getAllGradebooksHandler() {
  try {
    const gradebooks = yield call(gradebookService.getAll);
    console.log(gradebooks);
    yield put(setAllGradebooks(gradebooks));
  } catch (error) {
    console.log(error);
  }
}

function* getSingleGradebookHandler({ payload }) {
  try {
    const gradebook = yield call(gradebookService.get, payload);
    console.log(gradebook);
    yield put(setSingleGradebook(gradebook));
  } catch (err) {
    console.log(err);
  }
}

function* addGradebookHandler({ payload }) {
  try {
    console.log("arrived in AddGradebookHandler");
    const gradebook = yield call(gradebookService.add, payload);
    console.log(gradebook);
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetAllGradebooks() {
  yield takeLatest(performGetAllGradebooks.type, getAllGradebooksHandler);
}

export function* watchGetSingleGradebook() {
  yield takeLatest(performGetSingleGradebook.type, getSingleGradebookHandler);
}

export function* watchAddGradebook() {
  yield takeLatest(performAddGradebook.type, addGradebookHandler);
}
