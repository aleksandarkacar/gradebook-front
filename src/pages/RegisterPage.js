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
      {errors ? <p>{JSON.stringify(errors.response.data.message)}</p> : null}
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
        {errors?.first_name && <p>{errors.first_name}</p>}
        <input
          required
          value={credentials.last_name}
          placeholder="Last Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, last_name: target.value })
          }
        />
        {errors?.last_name && <p>{errors.last_name}</p>}
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
        {errors?.img_url && <p>{errors.img_url}</p>}
        <input
          required
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />
        {errors?.email && <p>{errors.email}</p>}
        <input
          required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        {errors?.password && <p>{errors.password}</p>}
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
        {errors?.terms_and_conditions && <p>{errors.terms_and_conditions}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
