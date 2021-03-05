import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
  });
  const { user_email, user_password } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_email, user_password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in successfully!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        setAuth(false);
        toast.error(parseRes, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1 className="my-5">Login</h1>
      <form className="container">
        <input
          type="email"
          name="user_email"
          value={user_email}
          onChange={onChange}
          placeholder="email"
          className="form-control my-3"
        />
        <input
          type="password"
          name="user_password"
          value={user_password}
          onChange={onChange}
          placeholder="password"
          className="form-control my-3"
        />
        <button
          type="submit"
          onClick={onSubmitForm}
          className="btn btn-block btn-secondary"
        >
          Login
        </button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
