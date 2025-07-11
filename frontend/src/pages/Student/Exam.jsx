
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./StSidebar";

const Exam = () => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExamResults = async () => {
      const registrationNumber = localStorage.getItem("registrationNumber");

      if (!registrationNumber) {
        setError("No registration number found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://student-management-system-pm1u.onrender.com/api/exam/student?registrationNumber=${registrationNumber}`);

        if (response.data.success) {
          setExamData(response.data.exam);
        } else {
          setError("No exam results found.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching exam data.");
      } finally {
        setLoading(false);
      }
    };

    fetchExamResults();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (<><Sidebar/>
    <div className="main">
      <h2>My Exam Results</h2>
      {examData && examData.subjects.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {examData.subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.name}</td>
                <td>{subject.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No exam data available.</p>
      )}
    </div></>
  );
};

export default Exam;
