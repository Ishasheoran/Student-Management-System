

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";

// const AdminStudent = () => {
//     const [newStudent, setNewStudent] = useState({ 
//         name: "", 
//         registrationNumber: "", 
//         grade: "", 
//         password: "" 
//     });
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/api/students/getall");
//             setStudents(response.data.students);
//         } catch (error) {
//             console.error("Error fetching students", error);
//         }
//     };

//     const handleAddStudent = async (e) => {
//         e.preventDefault();

//         if (!newStudent.name.trim() ||!newStudent.registrationNumber.trim() ||!newStudent.email.trim()|| !newStudent.grade.trim() || !newStudent.password.trim()) {
//             alert("Please fill out all fields.");
//             console.log("New Student Data:", newStudent);
//             return;
//         }
//             try {console.log("Sending student data:", newStudent);
//                 const response = await axios.post("http://localhost:8000/api/students", newStudent);
                
//                 alert("Student added successfully!");
                
//                 setStudents([...students, response.data.student]);
//                 setNewStudent({ name: "", registrationNumber: "", email:"",grade: "", password: "" });
//             } catch (error) {
//                 console.error("Error adding student", error);

//                 if (error.response && error.response.status === 404) {
//                     alert("Grade does not exist. Please add the grade first.");
//                 } else {
//                     alert("Failed to add student. Please try again.");
//                 }
//             }
        
//     };

//     return (<><Sidebar/>
//         <div className="main">
//             <h1>Student</h1>
//             <form onSubmit={handleAddStudent} id="sign">
//                 <input 
//                     type="text" 
//                     placeholder="Enter Student Name" 
//                     value={newStudent.name||""} 
//                     onChange={(e) => {
//                         const value = e.target.value;
//                         if (/^[A-Za-z\s]*$/.test(value))
//                             {setNewStudent({ ...newStudent, name: e.target.value }) ; 
//                     } 
//             else {
//                             alert("⚠️ Name should contain only letters and spaces.");
//                         }
//                     } }
//                     required
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="Enter Registration No." 
//                     value={newStudent.registrationNumber||""} 
//                     onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })} 
//                     required
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="Class" 
//                     value={newStudent.grade||""} 
//                     onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })} 
//                     required
//                 />
//                  <input type="email" placeholder="Enter Student Email" 
//                     value={newStudent.email} 
//                     onChange={(e) => setNewStudent(prev => ({ ...newStudent, email: e.target.value }))} 
//                 />
//               <input 
//     type="password" 
//     placeholder="Password (Max 6 chars)" 
//     value={newStudent.password || ""} 
//     onChange={(e) => {
//         const value = e.target.value;
//         if (value.length > 6) {  
//             alert(" Password cannot be more than 6 characters.");
//         }
//         setNewStudent({ ...newStudent, password: value }); 
//     }} 
//     required
// />
//                 <button type="submit" style={{ marginTop: "10px" }}>Add Student</button>
//             </form>

//             {/* <ul>
//                 {students.map((student) => (
//                     <li key={student._id}>{student.name} - {student.registrationNumber} - {student.grade}</li>
//                 ))}
//             </ul> */}
//         </div></>
//     );
// };

// export default AdminStudent;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";

// const AdminStudent = () => {
//     const [newStudents, setNewStudents] = useState([
//         { name: "", registrationNumber: "", email: "", grade: "", password: "" }
//     ]);
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/api/students/getall");
//             setStudents(response.data.students);
//         } catch (error) {
//             console.error("Error fetching students", error);
//         }
//     };

//     const handleAddStudent = async (e) => {
//         e.preventDefault();

//         if (newStudents.some(student => 
//             !student.name.trim() || 
//             !student.registrationNumber.trim() || 
//             !student.email.trim() || 
//             !student.grade.trim() || 
//             !student.password.trim())) {
//             alert("Please fill out all fields.");
//             return;
//         }

//         try {
//             console.log("Sending student data:", newStudents);
//             const response = await axios.post("http://localhost:8000/api/students/bulk", { students: newStudents });

//             alert("Students added successfully!");

//             setStudents([...students, ...response.data.students]);
//             setNewStudents([{ name: "", registrationNumber: "", email: "", grade: "", password: "" }]);
//         } catch (error) {
//             console.error("Error adding students", error);
//             alert("Failed to add students. Please try again.");
//         }
//     };

//     const handleChange = (index, field, value) => {
//         const updatedStudents = [...newStudents];
//         updatedStudents[index][field] = value;
//         setNewStudents(updatedStudents);
//     };

//     const addNewStudentRow = () => {
//         setNewStudents([...newStudents, { name: "", registrationNumber: "", email: "", grade: "", password: "" }]);
//     };

//     return (
//         <>
//             <Sidebar />
//             <div className="main">
//                 <h1>Student</h1>
//                 <form onSubmit={handleAddStudent} id="sign">
//                     {newStudents.map((student, index) => (
//                         <div key={index} style={{ marginBottom: "10px" }}>
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter Student Name" 
//                                 value={student.name} 
//                                 onChange={(e) => handleChange(index, "name", e.target.value)}
//                                 required 
//                             />
//                             {/* <input 
//                                 type="text" 
//                                 placeholder="Enter Registration No." 
//                                 value={student.registrationNumber} 
//                                 onChange={(e) => handleChange(index, "registrationNumber", e.target.value)}
//                                 required 
//                             /> */}
//                             <input 
//                                 type="text" 
//                                 placeholder="Class" 
//                                 value={student.grade} 
//                                 onChange={(e) => handleChange(index, "grade", e.target.value)}
//                                 required 
//                             />
//                             <input 
//                                 type="email" 
//                                 placeholder="Enter Student Email" 
//                                 value={student.email} 
//                                 onChange={(e) => handleChange(index, "email", e.target.value)}
//                                 required 
//                             />
//                             <input 
//                                 type="password" 
//                                 placeholder="Password (Max 6 chars)" 
//                                 value={student.password} 
//                                 onChange={(e) => handleChange(index, "password", e.target.value)}
//                                 required 
//                             />
//                         </div>
//                     ))}
//                     <button type="button" onClick={addNewStudentRow}>➕ Add Another Student</button>
//                     <button type="submit" style={{ marginTop: "10px" }}>Add Students</button>
//                 </form>
//             </div>
//         </>
//     );
// };


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const AdminStudent = () => {
    const [studentsCount, setStudentsCount] = useState(0);
    const [newStudents, setNewStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    useEffect(() => {
        fetchStudents();
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

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/students/getall");
            setStudents(response.data.students);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const handleStudentCountSubmit = () => {
        if (studentsCount <= 0) {
            alert("Enter a valid number of students.");
            return;
        }
        if (!selectedClass) {
            alert("Please select a class before proceeding.");
            return;
        }
    
        const studentArray = Array.from({ length: studentsCount }, () => ({
            name: "",
            email: "",
            grade: selectedClass,
            password: "" // Leave blank initially, generate when the user enters a name
        }));
    
        setNewStudents(studentArray);
    };
    

    const handleChange = (index, field, value) => {
        const updatedStudents = [...newStudents];
    
        // Update the field
        updatedStudents[index][field] = value;
    
        // If updating the name, generate a password
        if (field === "name") {
            const trimmedName = value.trim();
            const generatedPassword = trimmedName.length >= 4 ? trimmedName.slice(0, 4) + "@3" : trimmedName + "@3";
            updatedStudents[index].password = generatedPassword; // Auto-set password
        }
    
        setNewStudents(updatedStudents);
    };
    

    const handleAddStudent = async (e) => {
        e.preventDefault();
        console.log("🚀 Sending student data:", JSON.stringify(newStudents, null, 2));

        if (newStudents.some(student =>
            !student.name.trim() ||
            !student.email.trim() ||
            !student.grade.trim() ||
            !student.password.trim()
        )) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/students/bulk", { students: newStudents });

            alert("Students added successfully!");
            setStudents([...students, ...response.data.students]);
            setNewStudents([]);
            setStudentsCount(0);
        } catch (error) {
            console.error("🔥 Error adding students:", error);
            alert(`Failed to add students: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="main">
                <h1>Student Registration</h1>

                {newStudents.length === 0 && (
                    <div>
                        <input
                            type="number"
                            placeholder="Enter number of students"
                            value={studentsCount}
                            onChange={(e) => setStudentsCount(Number(e.target.value))}
                            min="1"
                        />
                        <label>Select Class:</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => {
                                setSelectedClass(e.target.value);
                                fetchStudents(e.target.options[e.target.selectedIndex].text);
                            }}
                        >
                            <option value="">-- Select Class --</option>
                            {classes.map((ClassItem) => (
                                <option key={ClassItem._id} value={ClassItem.grade}>
                                    {ClassItem.grade}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleStudentCountSubmit}>Proceed</button>
                    </div>
                )}

                {newStudents.length > 0 && (
                    <form onSubmit={handleAddStudent}>
                        {newStudents.map((student, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <input
                                    type="text"
                                    placeholder={`Student ${index + 1} Name`}
                                    value={student.name}
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={student.email}
                                    onChange={(e) => handleChange(index, "email", e.target.value)}
                                    required
                                />
                                {/* <input
                                    type="password"
                                    placeholder="Password (Max 6 chars)"
                                    value={student.password}
                                    onChange={(e) => handleChange(index, "password", e.target.value)}
                                    required
                                /> */}
                            </div>
                        ))}
                        <button type="submit">Add Students</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default AdminStudent;

// export default AdminStudent;
