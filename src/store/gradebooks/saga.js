import { call, put, takeLatest } from "redux-saga/effects";
import gradebookService from "../../services/GradebookService";
import {
  performGetAllGradebooks,
  performGetMoreGradebooks,
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
  performEditGradebook,
  performDeleteStudent,
  removeStudent,
  performDeleteGradebook,
  resetSingleGradebook,
  pushMoreGradebooks,
  performSearchGradebooks,
} from "./slice";
import { resetErrors, setErrors } from "../errors/slice";

function* getAllGradebooksHandler() {
  try {
    const gradebooks = yield call(gradebookService.getAll);
    yield put(setAllGradebooks(gradebooks));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* getMoreGradebooksHandler({ payload }) {
  try {
    const gradebooks = yield call(gradebookService.getMore, payload);
    yield put(pushMoreGradebooks(gradebooks.data));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* searchGradebooksHandler({ payload }) {
  try {
    const gradebooks = yield call(gradebookService.search, payload);
    yield put(setAllGradebooks(gradebooks));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* getSingleGradebookHandler({ payload }) {
  try {
    const gradebook = yield call(gradebookService.get, payload);
    yield put(setSingleGradebook(gradebook));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* getMyGradebookHandler() {
  try {
    const gradebook = yield call(gradebookService.myGradebook);
    yield put(setSingleGradebook(gradebook));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* addGradebookHandler({ payload }) {
  try {
    yield call(gradebookService.add, payload.data);
    payload.redirect();
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* editGradebookHandler({ payload }) {
  try {
    yield call(gradebookService.edit, payload.data.id, payload.data);
    payload.redirect();
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* addStudentHandler({ payload }) {
  try {
    yield call(gradebookService.addStudent, payload.data);
    payload.redirect();
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* addCommentHandler({ payload }) {
  try {
    const comment = yield call(gradebookService.addComment, payload);
    yield put(pushNewComment(comment));
    yield put(resetErrors());
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* deleteCommentHandeler({ payload }) {
  try {
    yield call(gradebookService.deleteComment, payload);
    yield put(removeComment(payload));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* deleteStudentHandeler({ payload }) {
  try {
    yield call(gradebookService.deleteStudent, payload);
    yield put(removeStudent(payload));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* deleteGradebookHandeler({ payload }) {
  try {
    yield call(gradebookService.delete, payload.data);
    yield put(resetSingleGradebook());
    payload.redirect();
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

export function* watchGetAllGradebooks() {
  yield takeLatest(performGetAllGradebooks.type, getAllGradebooksHandler);
}

export function* watchGetMoreGradebooks() {
  yield takeLatest(performGetMoreGradebooks.type, getMoreGradebooksHandler);
}

export function* watchSearchGradebooks() {
  yield takeLatest(performSearchGradebooks.type, searchGradebooksHandler);
}

export function* watchGetSingleGradebook() {
  yield takeLatest(performGetSingleGradebook.type, getSingleGradebookHandler);
}

export function* watchAddGradebook() {
  yield takeLatest(performAddGradebook.type, addGradebookHandler);
}

export function* watcheditGradebook() {
  yield takeLatest(performEditGradebook.type, editGradebookHandler);
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

export function* watchDeleteStudent() {
  yield takeLatest(performDeleteStudent.type, deleteStudentHandeler);
}

export function* watchDeleteGradebook() {
  yield takeLatest(performDeleteGradebook.type, deleteGradebookHandeler);
}
