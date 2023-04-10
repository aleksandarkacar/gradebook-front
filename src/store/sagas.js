import * as authSagas from "./auth/saga";
import * as teacherSagas from "./teachers/saga";
import * as gradebookSagas from "./gradebooks/saga";
import * as errorSagas from "./errors/saga";

const sagas = {
  ...authSagas,
  ...teacherSagas,
  ...gradebookSagas,
  ...errorSagas,
};

export default sagas;
