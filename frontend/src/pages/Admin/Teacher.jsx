

import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./Slidbar";

const AdminTeacher = () => {
    const [newTeacher, setNewTeacher] = useState({
        name: '',
        email: '',
        subject: '',
        password: ''  // Added password field
    });

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('https://student-management-system-pm1u.onrender.com/api/teacher/getall');
            setTeachers(response.data.teachers);
        } catch (error) {
            console.error("Error fetching teachers", error);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        if (newTeacher.password.length > 6) {
            alert("Password must not exceed 6 characters.");
            return;
        }

        // Name validation to allow only characters and spaces
        const nameValidation = /^[A-Za-z\s]+$/;
        if (!nameValidation.test(newTeacher.name)) {
            alert("Name must only contain letters and spaces.");
            return;
        }
        if (
            newTeacher.name.trim() !== '' &&
            newTeacher.email.trim() !== '' &&
            newTeacher.subject.trim() !== '' &&
            newTeacher.password.trim() !== '' // Ensure password is provided
        ) {
            try {
                const response = await axios.post('https://student-management-system-pm1u.onrender.com/api/teacher/', newTeacher);
                console.log('Response data:', response.data);
                alert(`✅ Teacher "${newTeacher.name}" added successfully!`);
                setTeachers([...teachers, response.data.teacher]);
                setNewTeacher({ name: '', email: '', subject: '', password: '' }); // Reset form

            } catch (error) {
                console.error("Error adding teacher", error);
                alert("Failed to add teacher. Please try again.");
            }
        } else {
            alert("Please fill all fields.");
        }
    };

    return (
        <> <Sidebar/>
            <div className="main"><div className="main">
            <h1>Teacher</h1>
            <form onSubmit={handleAddTeacher} id="sign">
                <input type="text" placeholder="Enter Teacher Name" 
                    value={newTeacher.name} 
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, name: e.target.value }))} 
                />
                <input type="email" placeholder="Enter Teacher Email" 
                    value={newTeacher.email} 
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, email: e.target.value }))} 
                />
                <input type="text" placeholder="Subject" 
                    value={newTeacher.subject} 
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, subject: e.target.value }))} 
                />
                <input type="password" placeholder="Enter Password" 
                    value={newTeacher.password} 
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, password: e.target.value }))} 
                />
                <button type="submit">Add Teacher</button>
            </form>

            </div></div>
            {/* <ul>
                {teachers.map((teacher) => (
                    <li key={teacher._id}> {teacher.name} - {teacher.email} - {teacher.subject} </li>
                ))}
            </ul> */}
        </>
    );
};

export default AdminTeacher;
