import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaBook, FaUserCheck, FaFileAlt, FaChalkboardTeacher } from "react-icons/fa"; // Icons
import "../../styles/sign.css"
import "../../components/Home"
const StSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="sidebar-container">
      {/* Sidebar Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      {/* Sidebar Links */}
      
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <Link to="/">
                 {isOpen && "Home"}
              </Link>
        <Link to="/Student/Exam">
           {isOpen && "Exam"}
        </Link>
        <Link to="/student/assignments">
           {isOpen && "Assignment"}
        </Link>
    
          <Link to="/student/announcements">
           {isOpen && "Announcement"}
        </Link>
      </div>
    </div>
  );
};

export default StSidebar;
