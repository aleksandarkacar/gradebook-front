import { call, put, takeLatest } from "redux-saga/effects";
import teacherService from "../../services/TeacherService";
import {
  performGetAllTeachers,
  performGetSingleTeacher,
  setAllTeachers,
  setSingleTeacher,
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
    const teacher = yield call(teacherService.get(payload));
    console.log(teacher);
    yield put(setSingleTeacher(teacher));
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
