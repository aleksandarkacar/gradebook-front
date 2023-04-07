import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { isAuthenticatedSelector } from "../store/auth/selectors";

export default function PublicRoute({ children, ...props }) {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <Route {...props}>{isAuthenticated ? <Redirect to="/" /> : children}</Route>
  );
}
