import React from "react";
import { Link } from "react-router-dom";
import TeSidebar from "./TeSidebar";

const TeacherDashboard = () => {
  return (<> <TeSidebar/>
  <div className="main"><h1>Teacher Dashboard</h1>
    <div className="Home">
     
      
      {/* Add link to Exam Page */}
      <Link to="/teacher/exam">
        <button> Exam Results</button>
      </Link>

      {/* Add link to Attendance Page */}
      <Link to="/teacher/attendance">
        <button>Attendance</button>
      </Link>
      <Link to="/teacher/assignment">
        <button>Assignment</button>
      </Link>
    </div></div></>
  );
};

export default TeacherDashboard;
