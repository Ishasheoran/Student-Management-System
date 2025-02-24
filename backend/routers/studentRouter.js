
import express from "express";
import { createStudent, getAllStudents, studentLogin, getStudentsByGrade } from "../controller/studentController.js";

import Student from "../models/studentSchema.js"; // Ensure this is imported

const router = express.Router();

router.get("/grade/:grade", getStudentsByGrade);


router.get('/getall', getAllStudents);


router.post('/', createStudent);


router.post("/login", studentLogin);

const generateNextRegNumber = async () => {
    // Get the last student in the database based on registration number
    const lastStudent = await Student.findOne().sort({ registrationNumber: -1 });

    // Start with a base registration number if no students exist
    let nextRegNumber = lastStudent ? parseInt(lastStudent.registrationNumber, 10) + 1 : 21134501004;

    return nextRegNumber.toString(); // Convert back to string
};


// router.post("/bulk", async (req, res) => {
//     try {
//         console.log("🚀 Received student data:", JSON.stringify(req.body, null, 2));

//         const { students } = req.body;

//         if (!Array.isArray(students) || students.length === 0) {
//             return res.status(400).json({ message: "Invalid data format. 'students' must be a non-empty array." });
//         }

//         // ✅ Validate all students before insertion
//         const validatedStudents = [];
//         for (let student of students) {
//             if (!student.name || !student.email || !student.password || !student.grade.trim()) {
//                 console.error("❌ Missing fields for student:", student);
//                 return res.status(400).json({ message: "Missing required fields (name, email, grade, password)" });
//             }

//             // ✅ Assign unique registration numbers
//             const regNumber = await generateNextRegNumber();
//             validatedStudents.push({ ...student, registrationNumber: regNumber });
//         }

//         console.log("✅ Inserting students into database...");
//         const addedStudents = await Student.insertMany(validatedStudents);
//         console.log("🎉 Students added successfully!", addedStudents);

//         res.status(201).json({ students: addedStudents });

//     } catch (error) {
//         console.error("🔥 Error adding students:", error);
//         res.status(500).json({ message: "Error adding students", error: error.message });
//     }
// });

router.post("/bulk", async (req, res) => {
    try {
        console.log("🚀 Received student data:", JSON.stringify(req.body, null, 2));

        const { students } = req.body;

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "Invalid data format. 'students' must be a non-empty array." });
        }

        // ✅ Generate unique registration numbers for each student
        const validatedStudents = [];
        let nextRegNumber = await generateNextRegNumber(); // Start from the latest number

        for (let student of students) {
            if (!student.name || !student.email || !student.password || !student.grade.trim()) {
                console.error("❌ Missing fields for student:", student);
                return res.status(400).json({ message: "Missing required fields (name, email, grade, password)" });
            }

            validatedStudents.push({
                ...student,
                registrationNumber: nextRegNumber.toString()
            });

            nextRegNumber++; // Increment for the next student
        }

        console.log("✅ Inserting students into database...");
        const addedStudents = await Student.insertMany(validatedStudents);
        console.log("🎉 Students added successfully!", addedStudents);

        res.status(201).json({ students: addedStudents });

    } catch (error) {
        console.error("🔥 Error adding students:", error);
        res.status(500).json({ message: "Error adding students", error: error.message });
    }
});


export default router;
