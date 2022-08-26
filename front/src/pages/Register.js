import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("user in login", user);

    if (isSuccess || user) {
      navigate("/consultForm");
    }

    if (isError) {
      console.log("message: ", message);
      alert(message);
    }
    // if (!user) {
    //   navigate("/");
    // }
  }, [user, isSuccess, isError, navigate, message]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(
      register({
        email: values.email,
        name: values.name,
        password: values.password,
      }),
    );
  };

  // const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   name: "",
  //   password: "",
  //   passwordCheck: "",
  // });
  // const [errorMessage, setErrorMessage] = useState("");
  // const [errorFlag, setErrorFlag] = useState(false);

  // const { email, name, password, passwordCheck } = formData;

  // const onChangeInput = useCallback(
  //   (e) => {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     }));
  //     setErrorFlag(false);
  //   },

  //   [email, name, password, passwordCheck, errorFlag],
  // );

  // const onSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     if (!email || !name || !password || !passwordCheck) {
  //       setErrorMessage("Please fill in the form");
  //       setErrorFlag(true);
  //       return;
  //     }

  //     if (!(password === passwordCheck)) {
  //       setErrorMessage("Passwords are not matched");
  //       setErrorFlag(true);
  //       return;
  //     }

  //     const registerInfo = { email, name, password };

  //     dispatch(register(registerInfo));
  //   },
  //   [email, name, password, passwordCheck, errorFlag],
  // );

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}>
          <Input style={{ width: 300 }} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}>
          <Input
            style={{ width: 300 }}
            placeholder="Enter your Name"
            id="password"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback>
          <Input.Password
            style={{ width: 300 }}
            placeholder="Enter your Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!"),
                );
              },
            }),
          ]}>
          <Input.Password
            style={{ width: 300 }}
            placeholder="Enter your Password"
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      {/* <section className="heading">
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
      </section> */}
    </>
  );
};

export default Register;
