import * as authSagas from "./auth/saga";
import * as teacherSagas from "./teachers/saga";
import * as gradebookSagas from "./gradebooks/saga";

const sagas = {
  ...authSagas,
  ...teacherSagas,
  ...gradebookSagas,
};

export default sagas;
