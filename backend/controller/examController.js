
import Student from "../models/studentSchema.js";
import Exam from "../models/examSchema.js";
import { processExamFile } from "../middlewares/bulkExamMiddleware.js";

// Get all exams
export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json({
            success: true,
            exams,
        });
    } catch (err) {
        console.error("Error fetching exams:", err);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: err.message 
        });
    }
};

// Add or update exam (single record)
export const addOrUpdateExam = async (req, res) => {
    console.log("Received data:", req.body);

    const { registrationNumber, className, subject, marks } = req.body;

    try {
        if (!registrationNumber || !className || !subject || marks === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill out all required fields." 
            });
        }

        const studentExists = await Student.findOne({ 
            registrationNumber, 
            grade: className 
        });

        if (!studentExists) {
            return res.status(404).json({ 
                success: false, 
                message: "Student with this enrollment number and class does not exist." 
            });
        }

        let existingExam = await Exam.findOne({ registrationNumber, className });

        if (!existingExam) {
            existingExam = new Exam({
                registrationNumber,
                className,
                subjects: [{ name: subject, marks }]
            });
        } else {
            const subjectIndex = existingExam.subjects.findIndex(s => s.name === subject);

            if (subjectIndex !== -1) {
                existingExam.subjects[subjectIndex].marks = marks;
            } else {
                existingExam.subjects.push({ name: subject, marks });
            }
        }

        await existingExam.save();

        res.status(200).json({
            success: true,
            message: "Successfully added/updated subject marks!",
            exam: existingExam,
        });
    } catch (err) {
        console.error("Error updating exam:", err);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: err.message 
        });
    }
};

// Get student exam results
export const getStudentExamResults = async (req, res) => {
    const { registrationNumber } = req.query;

    try {
        const student = await Student.findOne({ registrationNumber });

        if (!student) {
            return res.status(404).json({ 
                success: false, 
                message: "Student not found" 
            });
        }

        const examResults = await Exam.findOne({ registrationNumber });

        if (!examResults) {
            return res.status(404).json({ 
                success: false, 
                message: "No exam results found." 
            });
        }

        res.status(200).json({ 
            success: true, 
            exam: examResults 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Bulk upload exams
export const bulkUploadExams = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded" 
            });
        }

        const { className, subject } = req.body;
        
        if (!className || !subject) {
            return res.status(400).json({ 
                success: false, 
                message: "Class and subject are required" 
            });
        }

        const records = await processExamFile(req.file.buffer, req.file.originalname);
        
        if (!records || records.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No valid records found in the file" 
            });
        }

        let processedCount = 0;
        const errors = [];

        await Promise.all(records.map(async (record) => {
            try {
                const registrationNumber = record.RegistrationNumber || record.registrationNumber;
                const marks = Number(record.Marks || record.marks);

                if (!registrationNumber || isNaN(marks)) {
                    errors.push({
                        record,
                        error: "Missing registration number or invalid marks"
                    });
                    return;
                }

                const student = await Student.findOne({ 
                    registrationNumber,
                    grade: className 
                });

                if (!student) {
                    errors.push({
                        registrationNumber,
                        error: "Student not found in specified class"
                    });
                    return;
                }

                let exam = await Exam.findOne({ registrationNumber, className });

                if (!exam) {
                    exam = new Exam({
                        registrationNumber,
                        className,
                        subjects: []
                    });
                }

                const subjectIndex = exam.subjects.findIndex(s => s.name === subject);

                if (subjectIndex !== -1) {
                    exam.subjects[subjectIndex].marks = marks;
                } else {
                    exam.subjects.push({ name: subject, marks });
                }

                await exam.save();
                processedCount++;
            } catch (error) {
                errors.push({
                    record,
                    error: error.message
                });
            }
        }));

        res.status(200).json({
            success: true,
            message: `Bulk upload completed`,
            processed: processedCount,
            total: records.length,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        console.error("Bulk upload error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during bulk upload",
            error: error.message 
        });
    }
};