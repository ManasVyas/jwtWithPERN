import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1 className="my-5">Home Page</h1>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
