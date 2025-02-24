
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Slidbar";

const AdminClasses = () => {
  const [newClassName, setNewClassName] = useState("");
  const [subjects, setSubjects] = useState([""]);
  // const handleAddClass = async (e) => {
  //   e.preventDefault();
  //   if (newClassName.trim() !== "") {
  //     try {
  //       const response = await axios.post("http://localhost:8000/api/classes", { grade: newClassName });

  //       console.log("Response data:", response.data);

  //       if (response.data.success && response.data.class) {
  //         alert(`Class "${newClassName}" added successfully!`); // ✅ Show alert
  //         setNewClassName(""); // ✅ Reset input field
  //       } else {
  //         console.error("Error adding class:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error adding class:", error.response ? error.response.data : error.message);
  //       alert("Error adding class. Please try again."); // ✅ Show error alert
  //     }
  //   }
  // };
  // const handleAddClass = async (e) => {
  //   e.preventDefault();

  //   if (newClassName.trim() === "" || subjects.some(subject => subject.trim() === "")) {
  //     alert("Please enter a class name and at least one subject.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:8000/api/classes", {
  //       grade: newClassName,
  //       subjects: subjects.filter(subject => subject.trim() !== "") // Remove empty subjects
  //     });

  //     console.log("Response data:", response.data);

  //     if (response.data.success) {
  //       alert(`Class "${newClassName}" added successfully with subjects!`);
  //       setNewClassName(""); // Reset input
  //       setSubjects([""]); // Reset subjects
  //     } else {
  //       console.error("Error adding class:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error adding class:", error.response ? error.response.data : error.message);
  //     alert("Error adding class. Please try again.");
  //   }
  // };
  const handleAddClass = async (e) => {
    e.preventDefault();

    // Ensure subjects are formatted as objects
    const formattedSubjects = subjects
        .filter(subject => subject.trim() !== "")
        .map(subject => ({ name: subject })); // Convert string subjects to objects

    if (newClassName.trim() === "" || formattedSubjects.length === 0) {
        alert("Please enter a class name and at least one subject.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8000/api/classes", {
            grade: newClassName,
            subjects: formattedSubjects  // ✅ Send as array of objects
        });

        console.log("Response data:", response.data);

        if (response.data.success) {
            alert(`Class "${newClassName}" added successfully with subjects!`);
            setNewClassName(""); // Reset input
            setSubjects([""]); // Reset subjects
        } else {
            console.error("Error adding class:", response.data);
        }
    } catch (error) {
        console.error("🔥 Error adding class:", error.response ? error.response.data : error.message);
        alert(`Error adding class: ${error.response?.data?.message || error.message}`);
    }
};

  // Function to handle adding a new subject input field
  const addSubjectField = () => {
    setSubjects([...subjects, ""]);
  };

  // Function to update subject value
  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  return (
    <> <Sidebar/>
      <div className="main"><h1>Classes</h1>
      <form onSubmit={handleAddClass} id="sign">
        <input
          type="text"
          placeholder="Enter Class name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
          <h3>Subjects</h3>
          {subjects.map((subject, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Subject ${index + 1}`}
                value={subject}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          <button type="button" onClick={addSubjectField}>➕ Add Another Subject</button> 
        <button type="submit">Add Class</button>
      </form></div>
    </>
  );
};

export default AdminClasses;
