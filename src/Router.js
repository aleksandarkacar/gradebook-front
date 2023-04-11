import {
  BrowserRouter,
  Switch,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { performLogout } from "./store/auth/slice";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { isAuthenticatedSelector } from "./store/auth/selectors";
import { MyGradebookPage } from "./pages/MyGradebookPage";
import { AllProfessorsPage } from "./pages/AllProfessorsPage";
import { AddGradebookPage } from "./pages/AddGradebookPage";
import { SingleProfessorPage } from "./pages/SingleProfessorPage";
import { SingleGradebookPage } from "./pages/SingleGradebookPage";
import { AddStudentPage } from "./pages/AddStudentsPage";
import { EditGradebookPage } from "./pages/EditGradebookPage";

export const Router = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const authenticationChange = useSelector(isAuthenticatedSelector);
  const history = useHistory();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    console.log(isAuthenticated);
    if (isAuthenticated) {
      // history.push("/");
    } else {
      history.push("/login");
    }
  }, [isAuthenticated, authenticationChange]);

  const handleLogout = () => {
    dispatch(performLogout());
    setIsAuthenticated(false);
    history.push("/");
  };

  return (
    <div>
      <BrowserRouter>
        <nav className="navbar">
          {!isAuthenticated && (
            <Link to={"/login"}>
              <button class="button-link">Login Page</button>
            </Link>
          )}
          {!isAuthenticated && (
            <Link to={"/register"}>
              <button class="button-link">Register Page</button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={"/"}>
              <button class="button-link">Gradebooks </button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={"/teachers"}>
              <button class="button-link">All Professors</button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={"/my-gradebook"}>
              <button class="button-link">My Gradebook</button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={"/gradebooks/create"}>
              <button class="button-link">Add Gradebook</button>
            </Link>
          )}
          {isAuthenticated && (
            <button class="button-link" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
        <Switch>
          <PublicRoute exact path={"/login"}>
            <LoginPage />
          </PublicRoute>
          <PublicRoute exact path={"/register"}>
            <RegisterPage />
          </PublicRoute>
          <PrivateRoute exact path={"/my-gradebook"}>
            <MyGradebookPage />
          </PrivateRoute>
          <PrivateRoute exact path={"/"}>
            <HomePage />
          </PrivateRoute>
          <PrivateRoute exact path={"/gradebooks"}>
            <Redirect to={"/"} />
          </PrivateRoute>
          <PrivateRoute exact path={"/gradebooks/create"}>
            <AddGradebookPage />
          </PrivateRoute>
          <PrivateRoute exact path={"/gradebooks/:id"}>
            <SingleGradebookPage />
          </PrivateRoute>
          <PrivateRoute exact path={"/teachers"}>
            <AllProfessorsPage />
          </PrivateRoute>
          <PrivateRoute exact path={"/teachers/:id"}>
            <SingleProfessorPage />
          </PrivateRoute>
          <PrivateRoute exact path={"/gradebooks/:id/students/create"}>
            <AddStudentPage />
          </PrivateRoute>
          <PrivateRoute exact path={"/gradebooks/:id/edit"}>
            <EditGradebookPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
