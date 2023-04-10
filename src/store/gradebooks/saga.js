import { call, put, takeLatest } from "redux-saga/effects";
import gradebookService from "../../services/GradebookService";
import {
  performGetAllGradebooks,
  performGetSingleGradebook,
  performAddGradebook,
  performGetMyGradebook,
  setAllGradebooks,
  setSingleGradebook,
  performAddStudent,
  performAddComment,
  pushNewComment,
  performDeleteComment,
  removeComment,
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
    yield put(setSingleGradebook(gradebook));
  } catch (err) {
    console.log(err);
  }
}

function* getMyGradebookHandler() {
  try {
    const gradebook = yield call(gradebookService.myGradebook);
    yield put(setSingleGradebook(gradebook));
  } catch (err) {
    console.log(err);
  }
}

function* addGradebookHandler({ payload }) {
  try {
    yield call(gradebookService.add, payload);
  } catch (err) {
    console.log(err);
  }
}

function* addStudentHandler({ payload }) {
  try {
    yield call(gradebookService.addStudent, payload);
  } catch (err) {
    console.log(err);
  }
}

function* addCommentHandler({ payload }) {
  try {
    const comment = yield call(gradebookService.addComment, payload);
    yield put(pushNewComment(comment));
  } catch (err) {
    console.log(err);
  }
}

function* deleteCommentHandeler({ payload }) {
  try {
    yield call(gradebookService.deleteComment, payload);
    yield put(removeComment(payload));
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

export function* watchGetMyGradebook() {
  yield takeLatest(performGetMyGradebook.type, getMyGradebookHandler);
}

export function* watchAddStudent() {
  yield takeLatest(performAddStudent.type, addStudentHandler);
}

export function* watchAddComment() {
  yield takeLatest(performAddComment.type, addCommentHandler);
}

export function* watchDeleteComment() {
  yield takeLatest(performDeleteComment.type, deleteCommentHandeler);
}
