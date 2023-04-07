import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { GradebooksPage } from "./pages/GradebookPage";
import { useDispatch } from "react-redux";
import { performLogout } from "./store/auth/slice";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

export const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
    setIsAuthenticated(false);
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
            <LoginPage
              onLogin={() => {
                setIsAuthenticated(true);
              }}
            />
          </PublicRoute>
          <PublicRoute exact path="/register">
            <RegisterPage
              onRegister={() => {
                setIsAuthenticated(true);
              }}
            />
          </PublicRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
