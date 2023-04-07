import * as authSagas from "./auth/saga";
import * as teacherSagas from "./teachers/saga";

const sagas = {
  ...authSagas,
  ...teacherSagas,
};

export default sagas;
