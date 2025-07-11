import React, { useEffect, useState } from "react";
import axios from "axios";
import StSidebar from "./StSidebar"; // ✅ Your student sidebar

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "https://student-management-system-pm1u.onrender.com/api/assignment/getall"
      );
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  return (
    <>
      <StSidebar />
      <div className="main p-8">
        <h1 className="text-3xl font-bold mb-6">📚 My Assignments</h1>

        {assignments.length === 0 ? (
          <p>No assignments available.</p>
        ) : (
          <table className="border border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">File</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="border p-2">{assignment.title}</td>
                  <td className="border p-2">{assignment.grade}</td>
                  <td className="border p-2">
                    {new Date(assignment.deadline)
                      .toISOString()
                      .split("T")[0]}
                  </td>
                  <td className="border p-2">
                    <a
                      href={`http://localhost:8000/${assignment.description}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View / Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default StudentAssignments;
