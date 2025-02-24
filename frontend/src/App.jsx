// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Home from './components/Home'
// import ChooseUser  from './components/ChooseUser'
// import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
// import TeacherSignin from './components/TeacherSignin'
// import StudentSignin from './components/StudentSignin'
// import AdminSignin from './components/AdminSignin'
// // import AdminAnnouncement from './pages/Admin/Announcement'
// import AdminAttendance from './pages/Admin/Attendance'
// import AdminAssignment from './pages/Admin/Assignment'
// import AdminDashboard from './pages/Admin/Dashboard'
// import AdminExam from './pages/Admin/Exam'
// import AdminTeacher from './pages/Admin/Teacher'
// import AdminStudent from './pages/Admin/Student'
// import StudentDashboard from './pages/Student/Dashboard'
// import StudentAssignment from './pages/Student/Assignment'
// import StudentAttendance from './pages/Student/Attendance'
// import StudentExam from './pages/Student/Exam'
// import StudentProfile from './pages/Student/Profile'
// import TeacherAssignment from './pages/Teachers/Assignment'
// import TeacherAttendance from './pages/Teachers/Attendance'
// import TeacherClasses from './pages/Teachers/Classes'
// import TeacherDashboard from './pages/Teachers/Dashboard'
// import TeacherExam from './pages/Teachers/Exam'
// import TeacherProfile from './pages/Teachers/Profile'
// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route path='/' element ={<Home/>} />
//       <Route path='/ChooseUser' element ={<ChooseUser/>} />
//       <Route exact path='/AdminSignin' element ={<AdminSignin/>} />
//       <Route exact  path='/StudentSignin' element ={<StudentSignin/>} />
  
//       <Route exact path='/TeacherSignin' element ={<TeacherSignin/>} />
//       {/* Admin Section */}
//       <Route exact path='/Admin/Dashboard' element ={<AdminDashboard/>} />
//       <Route exact path='/Student/Dashboard' element ={<StudentDashboard/>} />
//       {/* <Route exact path='/Admin/Announcement' element ={<AdminAnnouncement/>} /> */}
//       <Route exact path='/Admin/Attendance' element ={<AdminAttendance/>} />
//       <Route exact path='/Admin/Assignment' element ={<AdminAssignment/>} />
//       <Route exact path='/Admin/Exam' element ={<AdminExam/>} />
//        <Route exact path='/Admin/Classes' element ={<AdminClasses/>} /> 
//        <Route exact path='/Admin/Student' element ={<AdminStudent/>} /> 
//        <Route exact path='/Admin/Teacher' element ={<AdminTeacher/>} />
//        {/* Student section */}
//        {/* <Route exact path='/Student/Announcement' element ={<StudentAnnouncement/>} /> */}
//       <Route exact path='/Student/Attendance' element ={<StudentAttendance/>} />
//       <Route exact path='/Student/Assignment' element ={<StudentAssignment/>} />
//       <Route exact path='/Student/Exam' element ={<StudentExam/>} />
//       <Route exact path='/Student/Profile' element ={<StudentProfile/>} />
// {/* Teacher section */}
// <Route exact path='/Teacher/Attendance' element ={<TeacherAttendance/>} />
//       <Route exact path='/Teacher/Assignment' element ={<TeacherAssignment/>} />
//       <Route exact path='/Teacher/Exam' element ={<TeacherExam/>} />
//       <Route exact path='/Teacher/Profile' element ={<TeacherProfile/>} />
//       <Route exact path='/Teacher/Classes' element ={<TeacherClasses/>} />
//       <Route exact path='/Teacher/Dashboard' element ={<TeacherDashboard/>} />
//     </Routes>
//     </Router>
//   )
// }
// import AdminClasses from './pages/Admin/Classes'
// export default App
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import AdminSignup from "./components/AdminSignin";
import StudentLogin from "./components/StudentLogin";
import TeacherSignin from "./components/TeacherSignin";
import ForgetPassword from "./components/ForgetPassword";
import AdminSignin from "./components/AdminLogin";
// import Home from "./components/Home";
// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
// import Sidebar from "./pages/Admin/Slidbar";
// import AdminAssignment from "./pages/Admin/Assignment";
import AdminExam from "./pages/Admin/Exam";
import AdminClasses from "./pages/Admin/Classes";
import AdminStudent from "./pages/Admin/Student";
import AdminTeacher from "./pages/Admin/Teacher";


// Student Pages
import StudentDashboard from "./pages/Student/Dashboard";
import StudentAssignment from "./pages/Student/Assignment";
import StudentAttendance from "./pages/Student/Attendance";
import StudentExam from "./pages/Student/Exam";
import StSidebar from "./pages/Student/StSidebar";
// import StudentProfile from "./pages/Student/Profile";

// Teacher Pages
import TeacherDashboard from "./pages/Teachers/Dashboard";
import TeacherAssignment from "./pages/Teachers/Assignment";
import TeacherAttendance from "./pages/Teachers/Attendance";
import TeacherExam from "./pages/Teachers/Exam";
import TeSidebar from "./pages/Teachers/TeSidebar";
// import TeacherProfile from "./pages/Teachers/Profile";
// import TeacherClasses from "./pages/Teachers/Classes";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/Ad" */}
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/Sidebar" element={<Sidebar />} /> */}
        <Route path="/AdminSignin" element={<AdminSignup />} />
        <Route path="/studentsLogin" element={<StudentLogin />} />
        <Route path="/TeacherSignin" element={<TeacherSignin />} />
        <Route path="/AdminLogin" element={<AdminSignin />}/>
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        {/* Admin Routes */}
        <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
        {/* <Route path="/Admin/Attendance" element={<AdminAttendance />} /> */}
        {/* <Route path="/Admin/Assignment" element={<AdminAssignment />} /> */}
        <Route path="/Admin/Exam" element={<AdminExam />} />
        <Route path="/Admin/Classes" element={<AdminClasses />} />
        <Route path="/Admin/Student" element={<AdminStudent />} />
        <Route path="/Admin/Teacher" element={<AdminTeacher />} />

        {/* Student Routes */}
        <Route path="/Student/Dashboard" element={<StudentDashboard />} />
        <Route path="/Student/Attendance" element={<StudentAttendance />} />
        <Route path="/Student/Assignment" element={<StudentAssignment />} />
        <Route path="/Student/Exam" element={<StudentExam />} />
        {/* <Route path="/Student/Profile" element={<StudentProfile />} /> */}

        {/* Teacher Routes */}
        <Route path="/Teacher/Dashboard" element={<TeacherDashboard />} />
        <Route path="/Teacher/Attendance" element={<TeacherAttendance />} />
        <Route path="/Teacher/Assignment" element={<TeacherAssignment />} />
        <Route path="/Teacher/Exam" element={<TeacherExam />} />
        {/* <Route path="/Teacher/Profile" element={<TeacherProfile />} /> */}
        {/* <Route path="/Teacher/Classes" element={<TeacherClasses />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
