import { call, put, takeLatest } from "redux-saga/effects";
import teacherService from "../../services/TeacherService";
import {
  performGetAllTeachers,
  performGetSingleTeacher,
  performGetAvailableTeachers,
  setAllTeachers,
  setSingleTeacher,
  setAvailableTeachers,
} from "./slice";

function* getAllTeachersHandler() {
  try {
    const teachers = yield call(teacherService.getAll);
    console.log(teachers);
    yield put(setAllTeachers(teachers));
  } catch (error) {
    console.log(error);
  }
}

function* getSingleTeacherHandler({ payload }) {
  try {
    const teacher = yield call(teacherService.get, payload);
    console.log(teacher);
    yield put(setSingleTeacher(teacher));
  } catch (err) {
    console.log(err);
  }
}

function* getAvailableTeachersHandler() {
  try {
    const availableTeachers = yield call(teacherService.getAvailable);
    console.log(availableTeachers);
    yield put(setAvailableTeachers(availableTeachers));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetAllTeachers() {
  yield takeLatest(performGetAllTeachers.type, getAllTeachersHandler);
}

export function* watchGetSingleTeacher() {
  yield takeLatest(performGetSingleTeacher.type, getSingleTeacherHandler);
}

export function* watchGetAvailableTeachers() {
  yield takeLatest(
    performGetAvailableTeachers.type,
    getAvailableTeachersHandler
  );
}
