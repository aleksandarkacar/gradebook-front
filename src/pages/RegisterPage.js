import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { performRegistration } from "../store/auth/slice";

export const RegisterPage = ({ onRegister }) => {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    img_url: "",
    email: "",
    password: "",
    terms_and_conditions: false,
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      dispatch(performRegistration(credentials));
    } catch {
      alert("registration error");
    }
    onRegister();
  };

  return (
    <div>
      <h2>Register</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 500,
          margin: "auto",
        }}
        onSubmit={handleRegisterSubmit}
      >
        <input
          required
          value={credentials.first_name}
          placeholder="First Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, first_name: target.value })
          }
        />
        <input
          required
          value={credentials.last_name}
          placeholder="Last Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, last_name: target.value })
          }
        />
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <input
            required
            value={credentials.img_url}
            style={
              {
                //   minWidth: `${credentials.img_url.length}ch`,
              }
            }
            placeholder="img url"
            onChange={({ target }) =>
              setCredentials({ ...credentials, img_url: target.value })
            }
          />
        </div>
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
        <fieldset>
          <legend>
            Check this box to confirm that you accept the terms and conditions
          </legend>
          <div>
            <input
              type="checkbox"
              onClick={() => {
                setCredentials({
                  ...credentials,
                  terms_and_conditions: !credentials.terms_and_conditions,
                });
                console.log(credentials);
              }}
            />
            <label>{credentials.terms_and_conditions}</label>
          </div>
        </fieldset>
        {invalidCredentials && (
          <p style={{ color: "red" }}>Invalid credentials</p>
        )}
        <button>Register</button>
      </form>
    </div>
  );
};
