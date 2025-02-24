// import React from "react";
import  '../styles/home.css'

import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png"
const Home = () => {
  return (<> <h1>Hemwati Nandan Bahuguna University</h1>
  <img src={logo} alt="" srcset="" />
    <div className='Home'>
     
      
      {/* Add link to Exam Page */}
      <Link to="/adminLogin">
        <button>Admin Login</button>
      </Link>

      {/* Add link to Attendance Page */}
      <Link to="/studentsLogin">
        <button>Student Login</button>

      </Link>
      <Link to="/teacherSignin">
        <button>Teacher Login</button>
        
      </Link>
    </div></>
  );
};

export default Home;
