
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import AdminSignup from "./components/AdminSignin";
import StudentLogin from "./components/StudentLogin";
import TeacherSignin from "./components/TeacherSignin";
import ForgetPassword from "./components/ForgetPassword";
import AdminSignin from "./components/AdminLogin";

import AdminDashboard from "./pages/Admin/Dashboard";

import AdminExam from "./pages/Admin/Exam";
import AdminClasses from "./pages/Admin/Classes";
import AdminStudent from "./pages/Admin/Student";
import AdminTeacher from "./pages/Admin/Teacher";
import AdminAnnouncements from "./pages/Admin/Announcement";
// Student Pages
import StudentDashboard from "./pages/Student/Dashboard";
import StudentAssignments from "./pages/Student/Assignment";
import Announcements from "./pages/Student/Announcements";
import StudentExam from "./pages/Student/Exam";
import StSidebar from "./pages/Student/StSidebar";
// import StudentProfile from "./pages/Student/Profile";

// Teacher Pages
import TeacherDashboard from "./pages/Teachers/Dashboard";
import TeacherAssignment from "./pages/Teachers/Assignment";

import TeacherExam from "./pages/Teachers/Exam";
import TeSidebar from "./pages/Teachers/TeSidebar";


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
       
        <Route path="/AdminSignin" element={<AdminSignup />} />
        <Route path="/studentsLogin" element={<StudentLogin />} />
        <Route path="/TeacherSignin" element={<TeacherSignin />} />
        <Route path="/AdminLogin" element={<AdminSignin />}/>
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
       
        <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
      
        <Route path="/Admin/Exam" element={<AdminExam />} />
        <Route path="/Admin/Classes" element={<AdminClasses />} />
        <Route path="/Admin/Student" element={<AdminStudent />} />
        <Route path="/Admin/Teacher" element={<AdminTeacher />} />
 <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        {/* Student Routes */}
        <Route path="/Student/Dashboard" element={<StudentDashboard />} />
       
        <Route path="/Student/Assignments" element={<StudentAssignments />} />
        <Route path="/student/announcements" element={<Announcements />} />

        <Route path="/Student/Exam" element={<StudentExam />} />
       
        <Route path="/Teacher/Dashboard" element={<TeacherDashboard />} />
       
        <Route path="/Teacher/Assignment" element={<TeacherAssignment />} />
        <Route path="/Teacher/Exam" element={<TeacherExam />} />
  
      </Routes>
    </Router>
  );
}

export default App;
