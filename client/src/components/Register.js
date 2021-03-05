import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
  });
  const { user_name, user_email, user_password } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_name, user_email, user_password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes) {
        localStorage.setItem("token", parseRes.token);
        toast.success("Registered successfully!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setAuth(true);
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
      <h1 className="my-5">Register</h1>
      <form onSubmit={onSubmitForm} className="container">
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
        <input
          type="text"
          name="user_name"
          value={user_name}
          onChange={onChange}
          placeholder="name"
          className="form-control my-3"
        />
        <button type="submit" className="btn btn-block btn-secondary">
          Register
        </button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Register;
