
import React, { useState, useEffect } from "react";
import axios from "axios";
import TeSidebar from "./TeSidebar";
const TeacherAssignment = () => {
    const [newAssignment, setNewAssignment] = useState({ title: "", deadline: "" });
    const [file, setFile] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    useEffect(() => {
        fetchAssignments();
        fetchClasses();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/assignment/getall");
            setAssignments(response.data.assignments);
        } catch (error) {
            console.error("Error fetching assignments", error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/classes/getall");
            setClasses(response.data.classes);
        } catch (error) {
            console.error("Error fetching grades", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleAddAssignment = async (e) => {
        e.preventDefault();
        if (!newAssignment.title || !file || !selectedClass || !newAssignment.deadline) {
            alert("Please fill out all required fields.");
            return;
        }
        const formData = new FormData();
        formData.append("title", newAssignment.title);
        formData.append("grade", selectedClass);
        formData.append("deadline", newAssignment.deadline);
        formData.append("file", file);
        try {
            const response = await axios.post("http://localhost:8000/api/assignment", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("✅ Success:", response.data);
            setAssignments([...assignments, response.data.assignment]);
            setNewAssignment({ title: "", deadline: "" });
            setFile(null);
            alert("✅ Assignment uploaded successfully!");
        } catch (error) {
            console.error("❌ Error adding assignment", error);
            alert("❌ Failed to upload assignment. Please try again.");
        }
    };

    return (
        <> <TeSidebar/>
        <div className="main">
        <h1>Assignments</h1>
        <form onSubmit={handleAddAssignment} id="sign">
            <input
                type="text"
                placeholder="Assignment Title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                required
            />

            <input type="file" onChange={handleFileChange} required />

            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
                <option value="">-- Select Class --</option>
                {classes.map((ClassItem, index) => (
                    <option key={index} value={ClassItem.grade}>{ClassItem.grade}</option>
                ))}
            </select>

            <input
                type="date"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                required
            />

            <button type="submit">Add Assignment</button>
        </form>

        {assignments.length > 0 ? (
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Class</th>
                        <th>Deadline</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment._id}>
                            <td>{assignment.title}</td>
                            <td>{assignment.grade}</td>
                            <td>{new Date(assignment.deadline).toISOString().split("T")[0]}</td>
                            <td>
                                <a
                                    href={`http://localhost:8000/${assignment.description}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View File
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No assignments available.</p>
        )}
    </div></>
    );
};

export default TeacherAssignment;
