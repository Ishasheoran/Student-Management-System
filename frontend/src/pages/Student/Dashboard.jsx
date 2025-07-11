import React from "react";
import { Link } from "react-router-dom";
import StSidebar from "./StSidebar";

const StudentDashboard = () => {
  return (<> <StSidebar/> <div className="main"> <h1>Student Dashboard</h1>
    <div className="Home">
    
      
      {/* Add link to Exam Page */}
      <Link to="/Student/Exam">
        <button> Exam Results</button>
      </Link>
      <Link to="/student/announcements">
        <button> Announcements</button>
      </Link>
       <Link to="/student/assignments">
        <button> Assignments</button>
      </Link>
    </div></div>
    </>
  );
};

export default StudentDashboard;
