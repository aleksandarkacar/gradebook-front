import { call, put, takeLatest } from "redux-saga/effects";
import teacherService from "../../services/TeacherService";
import {
  performGetAllTeachers,
  performGetSingleTeacher,
  performGetAvailableTeachers,
  setAllTeachers,
  setSingleTeacher,
  setAvailableTeachers,
  performSearchTeachers,
} from "./slice";
import { setErrors } from "../errors/slice";

function* getAllTeachersHandler() {
  try {
    const teachers = yield call(teacherService.getAll);
    yield put(setAllTeachers(teachers));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* filterTeachersHandler({ payload }) {
  try {
    const teachers = yield call(
      teacherService.search,
      payload.filterFirstName,
      payload.filterLastName
    );
    yield put(setAllTeachers(teachers));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* getSingleTeacherHandler({ payload }) {
  try {
    const teacher = yield call(teacherService.get, payload);
    yield put(setSingleTeacher(teacher));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

function* getAvailableTeachersHandler() {
  try {
    const availableTeachers = yield call(teacherService.getAvailable);
    yield put(setAvailableTeachers(availableTeachers));
  } catch (err) {
    console.log(err);
    yield put(setErrors(err));
  }
}

export function* watchGetAllTeachers() {
  yield takeLatest(performGetAllTeachers.type, getAllTeachersHandler);
}

export function* watchfilterTeachers() {
  yield takeLatest(performSearchTeachers.type, filterTeachersHandler);
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
