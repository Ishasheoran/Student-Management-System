
import express from "express";
import Student from "../models/studentSchema.js";
import { createStudent, getAllStudents, studentLogin, getStudentsByGrade } from "../controller/studentController.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const router = express.Router();


const generateNextRegNumber = async () => {
  // Only find students that actually HAVE a registration number
  const lastStudent = await Student.findOne({
    registrationNumber: { $exists: true, $ne: null }
  }).sort({ registrationNumber: -1 });

  let nextRegNumber;

  if (lastStudent && !isNaN(parseInt(lastStudent.registrationNumber, 10))) {
    nextRegNumber = parseInt(lastStudent.registrationNumber, 10) + 1;
  } else {
    // If no students exist, start with 21134501001
    nextRegNumber = 21134501001;
  }

  console.log(`✅ Next Registration Number: ${nextRegNumber}`);
  return nextRegNumber;
};


// ✅ Bulk Student Registration with Unique Registration Numbers
router.post("/bulk", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log("🚀 Received student data:", JSON.stringify(req.body, null, 2));
        const { students } = req.body;

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "Invalid data format. 'students' must be a non-empty array." });
        }

        // ✅ Get the latest registration number **once** before processing students
        let nextRegNumber = await generateNextRegNumber();
        const validatedStudents = [];

        for (let student of students) {
            if (!student.name || !student.dob || !student.email || !student.phone || !student.grade || !student.Sem || !student.password) {
                console.error("❌ Missing fields for student:", student);
                return res.status(400).json({ message: "Missing required fields (name, email, grade, password)" });
            }

            // ✅ Assign a unique registration number for each student in the loop
            let studentRegNumber = nextRegNumber++;
            
            // 🔐 Hash the password
            const hashedPassword = await bcrypt.hash(student.password, 10);

            validatedStudents.push({
                ...student,
                registrationNumber: studentRegNumber.toString(),
                password: hashedPassword
            });
        }

        console.log("✅ Inserting students into database...");
        const addedStudents = await Student.insertMany(validatedStudents, { session });

        await session.commitTransaction();
        session.endSession();

        console.log("🎉 Students added successfully!", addedStudents);
        res.status(201).json({ students: addedStudents });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        console.error("🔥 Error adding students:", error);
        res.status(500).json({ message: "Error adding students", error: error.message });
    }
});
// Get students by class ID
router.get("/class/:classId", async (req, res) => {
    try {
      const students = await Student.find({ classId: req.params.classId });
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Error fetching students" });
    }
  });
  

router.get("/grade/:grade", getStudentsByGrade);
router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.post("/login", studentLogin);

export default router;
