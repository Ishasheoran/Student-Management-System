import React from "react";
import { Link } from "react-router-dom";
import StSidebar from "./StSidebar";

const StudentDashboard = () => {
  return (<> <StSidebar/> <div className="main"> <h1>Student Dashboard</h1>
    <div className="Home">
    
      
      {/* Add link to Exam Page */}
      <Link to="/student/exam">
        <button> Exam Results</button>
      </Link>

      {/* Add link to Attendance Page */}
      <Link to="/student/attendance">
        <button> Attendance</button>
      </Link>
    </div></div>
    </>
  );
};

export default StudentDashboard;
