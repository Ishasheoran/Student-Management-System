

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeSidebar from "./TeSidebar";

const TeacherExam = () => {
    const [examData, setExamData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [className, setClassName] = useState("");
    const [subject, setSubject] = useState("");  
    const [marks, setMarks] = useState("");

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/exam/getall");
            if (Array.isArray(response.data.exams)) {
                setExamData(response.data.exams);
            } else {
                setExamData([response.data]);
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    };

    const handleAddExam = async (e) => {
        e.preventDefault();

        const newExam = {
            registrationNumber,
            className,
            subject,  
            marks: Number(marks),
        };

        try {
            const response = await axios.post("http://localhost:8000/api/exam", newExam);

            if (response.data.success) {
                toast.success("Successfully added new subject and marks!", { autoClose: 3000 });
                fetchExams(); // Refresh the list
                setRegistrationNumber("");
                setClassName("");
                setSubject("");  
                setMarks("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error adding exam.");
        }
    };

    return<>
    <TeSidebar/>
     <div className="main"><h1>Exam Management</h1>
            <form onSubmit={handleAddExam} id="sign">
                
                <input 
                    type="text" 
                    placeholder="Registration No." 
                    value={registrationNumber} 
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Class" 
                    value={className} 
                    onChange={(e) => setClassName(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    placeholder="Marks" 
                    value={marks} 
                    onChange={(e) => setMarks(e.target.value)}
                    required
                />
                <button type="submit">Add Exam</button>
            </form>
      </div>
    </>
}
export default TeacherExam