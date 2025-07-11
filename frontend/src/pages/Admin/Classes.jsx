import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Slidbar";

const AdminClasses = () => {
  const [newDeptName, setNewDeptName] = useState("");
  const [newSemName, setNewSemName] = useState("");
  const [subjects, setSubjects] = useState([""]);

  const handleAddDept = async (e) => {
    e.preventDefault();

    const formattedSubjects = subjects
      .filter((subject) => subject.trim() !== "")
      .map((subject) => ({ name: subject }));

    if (
      newDeptName.trim() === "" ||
      newSemName.trim() === "" ||
      formattedSubjects.length === 0
    ) {
      alert("Please enter a Dept name, Semester, and at least one subject.");
      return;
    }

    console.log("📢 Sending Data:", {
      grade: newDeptName,
      Sem: newSemName,
      subjects: formattedSubjects,
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/class",
        {
          grade: newDeptName,
          Sem: newSemName,
          subjects: formattedSubjects,
        }
      );

      console.log("Response data:", response.data);
      if (response.data.success) {
        alert(
          `Dept "${newDeptName}" added successfully with subjects!`
        );
        setNewDeptName("");
        setNewSemName("");
        setSubjects([""]);
      } else {
        console.error("Error adding Dept:", response.data);
      }
    } catch (error) {
      console.error(
        "🔥 Error adding Dept:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error adding Dept: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const addSubjectField = () => {
    setSubjects([...subjects, ""]);
  };

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  return (
    <>
      <Sidebar />
      <div className="main p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Departments & Semesters</h1>

        <form onSubmit={handleAddDept} className="space-y-4 max-w-xl">
          <div>
            <label className="block mb-1 font-semibold">Department Name</label>
            <input
              type="text"
              placeholder="Enter Dept name"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Semester</label>
            <input
              type="text"
              placeholder="Enter Sem name"
              value={newSemName}
              onChange={(e) => setNewSemName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Subjects</h3>
            {subjects.map((subject, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Subject ${index + 1}`}
                value={subject}
                onChange={(e) =>
                  handleSubjectChange(index, e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={addSubjectField}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              ➕ Add Another Subject
            </button>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ✅ Add Department
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminClasses;
