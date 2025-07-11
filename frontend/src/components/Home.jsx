import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import logo from "./logo.png";

const Home = () => {
  return (
    <div className="home-container" >
      <div className="home-content">
        <img src={logo} alt="University Logo" className="logo-img" />
        <h1 className="title">Hemwati Nandan Bahuguna University</h1>

        <div className="home-buttons">
          <Link to="/adminLogin">
            <button className="home-btn">Admin Login</button>
          </Link>

          <Link to="/studentsLogin">
            <button className="home-btn">Student Login</button>
          </Link>

          <Link to="/teacherSignin">
            <button className="home-btn">Teacher Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
