import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getName();
  }, []);
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  return (
    <>
      <h1 className="my-5">Welcome {name}!</h1>
      <button
        type="submit"
        onClick={logOut}
        className="btn btn-block btn-secondary"
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
