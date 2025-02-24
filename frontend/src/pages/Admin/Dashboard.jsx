import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
const AdminDashboard = () => {
  return (<> 
  <Sidebar/>
  <div className="main"><h1>Admin Dashboard</h1>
    <div className="Home">
      
      
      {/* Add link to Exam Page */}
      <Link to="/admin/exam">
        <button>Add Exam Results</button>
      </Link>

      {/* Add link to Attendance Page */}
      <Link to="/admin/classes">
        <button>Add class</button>
      </Link>
      <Link to="/admin/student">
        <button>Add Student</button>
      </Link>
      <Link to="/admin/teacher">
        <button>Add Teacher</button>
      </Link>
    </div></div></>
  );
};

export default AdminDashboard;
