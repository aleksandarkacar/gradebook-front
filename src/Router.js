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
      // Redirect the user to the dashboard page
      history.push("/gradebook");
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
        <nav>
          <ul>
            {!isAuthenticated && (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to={"/"}>Gradebooks</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to={"/teachers"}>All Professors</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to={"/my-gradebook"}>My Gradebook</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to={"/gradebooks/create"}>Add Gradebook</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
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
          <PrivateRoute path={"/"}>
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
        </Switch>
      </BrowserRouter>
    </div>
  );
};
