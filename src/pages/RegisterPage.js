import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performRegistration } from "../store/auth/slice";
import { errorsSelector } from "../store/errors/selectors";
import { useEffect } from "react";
import { performResetErrors } from "../store/errors/slice";

export const RegisterPage = () => {
  const [credentials, setCredentials] = useState(
    {
      first_name: "",
      last_name: "",
      img_url: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms_and_conditions: false,
    },
    []
  );

  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(performResetErrors());
  }, []);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(performRegistration(credentials));
  };

  return (
    <div>
      <h1></h1>
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

        {errors?.response?.data?.errors?.first_name && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.first_name[0]}*
          </li>
        )}

        <input
          required
          value={credentials.last_name}
          placeholder="Last Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, last_name: target.value })
          }
        />

        {errors?.response?.data?.errors?.last_name && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.last_name[0]}*
          </li>
        )}

        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <input
            required
            value={credentials.img_url}
            style={
              {
                // maxWidth: `${credentials.img_url.length}ch`,
              }
            }
            placeholder="img url"
            onChange={({ target }) =>
              setCredentials({ ...credentials, img_url: target.value })
            }
          />
        </div>

        {errors?.response?.data?.errors?.img_url && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.img_url[0]}*
          </li>
        )}

        <input
          required
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
          required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />

        <input
          required
          value={credentials.password_confirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              password_confirmation: target.value,
            })
          }
        />

        {errors?.response?.data?.errors?.password && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.password[0]}*
          </li>
        )}

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
              }}
            />
            <label>{credentials.terms_and_conditions}</label>
          </div>
        </fieldset>

        {errors?.response?.data?.errors?.terms_and_conditions && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.terms_and_conditions[0]}*
          </li>
        )}

        <button className="button-link" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
