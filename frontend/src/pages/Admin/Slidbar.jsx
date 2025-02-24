import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaBook, FaUserCheck, FaFileAlt, FaChalkboardTeacher } from "react-icons/fa"; // Icons
import Home from "../../components/Home"
const Sidebar = () => {
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
      <FaUserCheck />{isOpen && "Home"}</Link>
       <Link to="/Admin/Student">
       <FaUserCheck />{isOpen && "Students"}</Link>

        <Link to="/Admin/Exam">
          <FaBook /> {isOpen && "Exam"}
        </Link>
        <Link to="/Admin/Classes">
          <FaBook /> {isOpen && "Classes"}
        </Link>
        <Link to="/Admin/Teacher">
          <FaChalkboardTeacher /> {isOpen && "Teachers"}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
