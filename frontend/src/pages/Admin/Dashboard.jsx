import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="main flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-12 text-gray-800">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-3xl">
          <Link to="/admin/exam">
            <button className="w-full py-6 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transform hover:-translate-y-1 transition">
              📄 Add Exam Results
            </button>
          </Link>

          <Link to="/admin/classes">
            <button className="w-full py-6 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transform hover:-translate-y-1 transition">
              🏫 Add Class
            </button>
          </Link>

          <Link to="/admin/student">
            <button className="w-full py-6 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transform hover:-translate-y-1 transition">
              👨‍🎓 Add Student
            </button>
          </Link>

          <Link to="/admin/teacher">
            <button className="w-full py-6 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700 transform hover:-translate-y-1 transition">
              👩‍🏫 Add Teacher
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-3xl">
  {/* Existing buttons */}
  ...
  {/* New Announcements Button */}
  <Link to="/admin/announcements">
    <button className="w-full py-6 bg-yellow-500 text-white rounded-xl shadow-md hover:bg-yellow-600 transform hover:-translate-y-1 transition">
      📢 Add Announcement
    </button>
  </Link>
</div>

      </div>
    </>
  );
};

export default AdminDashboard;
