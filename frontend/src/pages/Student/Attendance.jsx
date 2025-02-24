

import { useState, useEffect } from "react";
import axios from "axios";
import StSidebar from "./StSidebar";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      const registrationNumber = localStorage.getItem("registrationNumber");

      if (!registrationNumber) {
        setError("No registration number found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/attendance/student?registrationNumber=${registrationNumber}`);

        if (response.data.success) {
          setAttendanceData(response.data.attendance);
        } else {
          setError("No attendance records found.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (<>
    <StSidebar/>
    <div className="main">
      <h2>My Attendance</h2>
      {attendanceData && attendanceData.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td>{new Date(record.createdAt).toLocaleDateString()}</td> {/* Format Date */}
                <td 
                  style={{ 
                    color: record.status === "Present" ? "green" : "red", 
                    fontWeight: "bold" 
                  }}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance data available.</p>
      )}
    </div></>
  );
};

export default Attendance;
