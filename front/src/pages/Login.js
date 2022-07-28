import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    console.log("user in login", user);

    if (isSuccess || user) {
      navigate("/consultForm");
    }

    if (isError) {
      console.log("message: ", message);
      alert(message);
      setFormData({ email: "", password: "" });
    }
    if (!user) {
      navigate("/");
    }
  }, [user, isSuccess, isError, navigate, message]);

  const onFinish = (values) => {
    console.log("e", values);
    console.log("values.email", values.email);

    setFormData({ email: values.email, password: values.password });
    // console.log("email: ", email);
    // console.log("formData: ", formData);

    // setFormData((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value,
    // }));

    const loginData = { email: values.email, password: values.password };
    console.log("loginData", loginData);
    dispatch(login(loginData));
  };

  const onFinishFailed = (e) => {
    // e.preventDefault();
    console.log(email, password);
    const loginData = { email, password };
    dispatch(login(loginData));
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}>
          <Input
            style={{ width: 300 }}
            placeholder="Enter your email"
            type="text"
            id="email"
            value={email}
            name="email"
            onFinish={onFinish}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password
            style={{ width: 300 }}
            placeholder="Enter your password"
            type="password"
            id="password"
            value={password}
            name="password"
            onFinish={onFinish}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <section className="heading">
        <h1>Login</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Sign in
            </button>
          </div>
        </form>
      </section> */}
    </>
  );
};

export default Login;
