// import React,{useState, useEffect} from "react";
// import Attendance from "../../../../backend/models/attendanceSchema";
// import axios from "axios";
// const AdminAttendance=()=>{
//     const[students, setStudents]= useState([])
// const[attendanceData,setAttendanceData]=useState([])
// useEffect(()=>{
//     fetchStudents();
//   },[])
//   const fetchStudents=async()=>{
//       try{
//          const response=await axios.get('http://localhost:8000/api/students/getall');
//           setStudents(response.data.students)
//           initializeAttendanceData(response.data.students)
//       }
//       catch(error){
//          console.error("error in  fetching students",error)
//       }
//     };
//     const initializeAttendanceData = (students) => {
//         const attendanceArray = students.map((student) => ({
//             id: student._id,  // Use `_id` instead of `id`
//             name: student.name,
//             status: ''
//         }));
//         setAttendanceData(attendanceArray);
//     };
    
//     const handleStatusChange = (id, status) => {
//         const updatedData = attendanceData.map((student) => { // ✅ Declare updatedData properly
//             if (student.id === id) {
//                 return { ...student, status };
//             }
//             return student;
//         });
//         setAttendanceData(updatedData); // ✅ Now correctly updates state
//     };
    
        
//  const handleSubmit=async()=>{
//     try{
// const formattedData=attendanceData.map(({id,name,status})=>({studentId: id,name,status}));
// const response=await axios.post('http://localhost:8000/api/attendance',{attendanceData:formattedData});}
//     catch(error){
// console.error('error submitting attendance',error)
//     }
//  }
//     return<>
//     <h1>Attendance</h1>
//     {students.map((student,index)=>(<li key={student._id}>{student.name}
//     present:<input type="radio" name="" id="" checked={attendanceData[index]?.status==='Present'} onChange={()=>handleStatusChange(student._id,'Present')} />
//     absent:<input type="radio" name="" id="" checked={attendanceData[index]?.status==='Absent'} onChange={()=>handleStatusChange(student._id,'Absent')}/>
//     Absent with apology:<input type="radio" name="" id="" checked={attendanceData[index]?.status==='Absent with Apology'} onChange={()=>handleStatusChange(student._id,'Absent with Apology')}/>
//     {/* {index!==students.length -1 &&} */}
//     </li>))}
//     <button onClick={handleSubmit}>submit</button>
//     </>
// }
// export default AdminAttendance

import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/students/getall");
      setStudents(response.data.students);
      initializeAttendanceData(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const initializeAttendanceData = (students) => {
    const attendanceArray = students.map((student) => ({
      id: student._id,
      name: student.name,
      status: "" // Initialize with an empty string
    }));
    setAttendanceData(attendanceArray);
  };

  const handleStatusChange = (id, status) => {
    const updatedData = attendanceData.map((student) => 
      student.id === id ? { ...student, status } : student
    );
    setAttendanceData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      const formattedData = attendanceData
        .filter(({ status }) => status?.trim()) // Remove entries with empty status
        .map(({ id, status }) => ({
          studentId: id,
          status
        }));

      if (formattedData.length === 0) {
        alert("Please mark attendance for at least one student.");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/attendance", {
        attendanceData: formattedData
      });

      console.log("Attendance submitted:", response.data);
      alert("Attendance successfully submitted!");
    } catch (error) {
      console.error("Error submitting attendance", error);
    }
  };

  return (
    <div>
      <h1>Attendance</h1>
      <ul>
        {students.map((student, index) => (
          <li key={student._id}>
            {student.name}
            <label>
              <input
                type="radio"
                name={`attendance-${student._id}`}
                checked={attendanceData[index]?.status === "Present"}
                onChange={() => handleStatusChange(student._id, "Present")}
              />
              Present
            </label>
            <label>
              <input
                type="radio"
                name={`attendance-${student._id}`}
                checked={attendanceData[index]?.status === "Absent"}
                onChange={() => handleStatusChange(student._id, "Absent")}
              />
              Absent
            </label>
            <label>
              <input
                type="radio"
                name={`attendance-${student._id}`}
                checked={attendanceData[index]?.status === "Absent with Apology"}
                onChange={() => handleStatusChange(student._id, "Absent with Apology")}
              />
              Absent with Apology
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AdminAttendance;
