
import React, { useState, useEffect } from "react";
import axios from "axios";
import TeSidebar from "./TeSidebar";
const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]); // List of classes
  const [selectedClass, setSelectedClass] = useState(""); // Selected class
  const [students, setStudents] = useState([]); // Students of selected class
  const [attendanceData, setAttendanceData] = useState([]); // Attendance details
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  // const [subjects, setSubjects] = useState([]); // List of subjects for the selected class
  // const [selectedSubject, setSelectedSubject] = useState("");
  // Fetch available classes on mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/classes/getall");
      setClasses(response.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  // Fetch students based on selected class
  const fetchStudents = async (selectedGrade) => {
    try {
      console.log("Fetching students for grade:", selectedGrade);
      const response = await axios.get(`http://localhost:8000/api/students/grade/${selectedGrade}`);
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
      status: "Absent", // Initialize with empty status
    }));
    setAttendanceData(attendanceArray);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) => (entry.id === studentId ? { ...entry, status } : entry))
    );
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting Attendance Data:", attendanceData);

      const formattedData = attendanceData
        .filter(({ status }) => status?.trim()) // Remove entries with empty status
        .map(({ id, status }) => ({
          studentId: id,
          status,
          date: attendanceDate,
        }));

      // if (formattedData.length === 0) {
      //   alert("Please mark attendance for at least one student.");
      //   return;
      // }

      console.log("Formatted Data Sent:", formattedData);

      await axios.post("http://localhost:8000/api/attendance", {
        classId: selectedClass,
        attendanceData: formattedData,
      });

      alert("✅ Attendance successfully submitted!");
    } catch (error) {
      console.error("❌ Error submitting attendance", error);
      alert("❌ Failed to submit attendance.");
    }
  };

  return (
    <><TeSidebar/>
    <div className="main">
    <h1>Mark Attendance</h1>

     <label>Select Class:</label>
    <select
      value={selectedClass}
      onChange={(e) => {
        setSelectedClass(e.target.value);
        fetchStudents(e.target.options[e.target.selectedIndex].text); // Pass grade instead of ID
      }}
    >
      <option value="">-- Select Class --</option>
      {classes.map((ClassItem) => (
        <option key={ClassItem._id} value={ClassItem._id}>
          {ClassItem.grade}
        </option>
      ))}
    </select>
    
    {/* <label>Date: </label> */}
    {/* <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} /> */}

    {students.length > 0 ? (
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const studentAttendance = attendanceData.find((entry) => entry.id === student._id) || {
              status: "Absent",
            };

            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={studentAttendance.status === "Present"}
                    onChange={() => handleStatusChange(student._id, "Present")}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={studentAttendance.status === "Absent"}
                    onChange={() => handleStatusChange(student._id, "Absent")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <p>No students found for this class</p>
    )}
    <button onClick={handleSubmit}>Submit Attendance</button>
  </div></>
  );
};

export default TeacherAttendance;
