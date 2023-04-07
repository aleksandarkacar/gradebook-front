import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { performLogin } from "../store/auth/slice";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      dispatch(performLogin(credentials));
    } catch {
      setInvalidCredentials(true);
      alert("invalid credentials");
    }
    console.log("logged in successfully");
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
          required
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />
        <input
          required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        {invalidCredentials && (
          <p style={{ color: "red" }}>Invalid credentials</p>
        )}
        <button>Login</button>
      </form>
    </div>
  );
};
