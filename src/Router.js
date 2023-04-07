import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { GradebooksPage } from "./pages/GradebookPage";
import { useDispatch, useSelector } from "react-redux";
import { performLogout } from "./store/auth/slice";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { isAuthenticatedSelector } from "./store/auth/selectors";

export const Router = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   !!localStorage.getItem("token")
  // );
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const history = useHistory();
  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect the user to the dashboard page
      history.push("/gradebook");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(performLogout());
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
                <Link to="/">Gradebooks</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/teachers">All Professors</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/my-gradebook">My Gradebook</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/gradebooks/create">My Gradebook</Link>
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
          <PublicRoute exact path="/login">
            <LoginPage />
          </PublicRoute>
          <PublicRoute exact path="/register">
            <RegisterPage />
          </PublicRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
