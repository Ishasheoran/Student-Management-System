
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";

const AdminExam = () => {
    const [examData, setExamData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [grade, setGrade] = useState(""); // Changed from className to grade
    const [subject, setSubject] = useState("");  
    const [marks, setMarks] = useState("");
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchClassesWithSubjects();
        fetchExams();
    }, []);

const fetchClassesWithSubjects = async () => {
    try {
        // Updated endpoint to match the router
        const [classesRes, subjectsRes] = await Promise.all([
            axios.get("https://student-management-system-pm1u.onrender.com/api/class"),
            axios.get("https://student-management-system-pm1u.onrender.com/api/class/subjects")
        ]);

        setClasses(classesRes.data.classes || []);
        setSubjects(subjectsRes.data.subjects || []);
    } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load class data");
        setClasses([]);
        setSubjects([]);
    }
};
    const fetchExams = async () => {
        try {
            const response = await axios.get("https://student-management-system-pm1u.onrender.com/api/exam/getall");
            setExamData(Array.isArray(response.data.exams) ? response.data.exams : []);
        } catch (error) {
            console.error("Error fetching exams:", error);
            toast.error("Failed to load exam data");
        }
    };

    const handleAddExam = async (e) => {
        e.preventDefault();

        const newExam = {
            registrationNumber,
            grade, // Changed from className to grade
            subject,  
            marks: Number(marks),
        };

        try {
            // First verify the subject exists in the selected class
            const selectedClass = classes.find(c => c.grade === grade);
            if (!selectedClass) {
                toast.error("Selected class not found");
                return;
            }

            const subjectExists = selectedClass.subjects.some(s => s.name === subject);
            if (!subjectExists) {
                toast.error("Selected subject not found in this class");
                return;
            }

            const response = await axios.post("https://student-management-system-pm1u.onrender.com/api/exam", newExam);
            
            if (response.data.success) {
                toast.success("Exam record added successfully!");
                // Reset form
                setRegistrationNumber("");
                setGrade("");
                setSubject("");  
                setMarks("");
                fetchExams(); // Refresh exam data
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding exam");
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        
        if (!grade || !subject) {
            toast.error("Please select both class and subject");
            return;
        }

        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("className", grade); // Changed from className to grade
        formData.append("subject", subject);

        setIsUploading(true);
        
        try {
            const response = await axios.post("https://student-management-system-pm1u.onrender.com/api/exam/bulk", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success(`Successfully uploaded ${response.data.processed} records!`, { 
                    autoClose: 5000 
                });
                fetchExams();
                setFile(null);
            } else {
                toast.error(response.data.message || "Upload failed");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
            toast.error(`Upload error: ${errorMsg}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <Sidebar/>
            <ToastContainer />
            <div className="main">
                <h1>Exam Management</h1>
                
                {/* Add Single Exam Form */}
                
                
                {/* Bulk Upload Section */}
                <div className="section">
                    <h2>Bulk Upload</h2>
                    <form onSubmit={handleFileUpload}>
                        <div className="form-group">
                            <label>Class:</label>
                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                required
                            >
                                <option value="">Select Class</option>
                                {classes.map((cls) => (
                                    <option key={cls._id} value={cls.grade}>
                                        {cls.grade}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Subject:</label>
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((sub) => (
                                    <option key={sub.name} value={sub.name}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Upload File (CSV/Excel):</label>
                            <input 
                                type="file" 
                                accept=".csv, .xlsx, .xls" 
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                            <p className="hint">
                                File should contain columns: RegistrationNumber, Marks
                            </p>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isUploading}
                            className={isUploading ? "loading" : ""}
                        >
                            {isUploading ? "Uploading..." : "Upload Exam Data"}
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default AdminExam;
