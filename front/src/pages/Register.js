import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const { email, name, password, passwordCheck } = formData;

  const onChangeInput = useCallback(
    (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      setErrorFlag(false);
    },

    [email, name, password, passwordCheck, errorFlag],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !name || !password || !passwordCheck) {
        setErrorMessage("Please fill in the form");
        setErrorFlag(true);
        return;
      }

      if (!(password === passwordCheck)) {
        setErrorMessage("Passwords are not matched");
        setErrorFlag(true);
        return;
      }

      const registerInfo = { email, name, password };

      dispatch(register(registerInfo));
    },
    [email, name, password, passwordCheck, errorFlag],
  );

  return (
    <>
      <section className="heading">
        <h1>Register</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={onChangeInput}
              placeholder="Enter your email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChangeInput}
              placeholder="Enter your name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChangeInput}
              placeholder="Enter your password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordCheck">Password Confirm: </label>
            <input
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              value={passwordCheck}
              onChange={onChangeInput}
              placeholder="Enter your password"
              className="form-control"
            />
          </div>
          {errorFlag && (
            <div>
              <h2 style={{ color: "red" }}>{errorMessage}</h2>
            </div>
          )}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Sign up
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
