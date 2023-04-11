import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performLogin } from "../store/auth/slice";
import { errorsSelector } from "../store/errors/selectors";
import { performResetErrors } from "../store/errors/slice";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(performResetErrors());
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(performLogin(credentials));
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 500,
          margin: "auto",
        }}
        onSubmit={handleLoginSubmit}
      >
        <input
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />

        {errors?.response?.data?.errors?.email && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.email[0]}*
          </li>
        )}

        <input
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />

        {errors?.response?.data?.errors?.password && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.password[0]}*
          </li>
        )}

        {errors ? (
          <p style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.message}*
          </p>
        ) : null}

        <button className="button-link">Login</button>
      </form>
    </div>
  );
};
