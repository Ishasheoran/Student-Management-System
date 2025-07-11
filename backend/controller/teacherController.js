
import Teacher from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login Teacher
export const loginTeacher = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(400).json({ success: false, message: "Teacher not found" });
        }

        const isMatch = await teacher.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: teacher._id }, "your_secret_key", { expiresIn: "1h" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            teacher: {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                subject: teacher.subject,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Create Teacher
export const createTeacher = async (req, res, next) => {
    console.log(req.body);
    const { name, email, subject, password } = req.body;

    try {
        if (!name || !email || !subject || !password) {
            return next(handleValidationError("Please fill out all required fields", 400));
        }

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return next(handleValidationError("Email is already taken", 400));
        }

        // Create new teacher
        const newTeacher = await Teacher.create({ name, email, subject, password });

        res.status(201).json({
            success: true,
            message: "Teacher Created Successfully",
            teacher: {
                _id: newTeacher._id,
                name: newTeacher.name,
                email: newTeacher.email,
                subject: newTeacher.subject
            }
        });

    } catch (err) {
        console.error("Error creating teacher:", err);
        return next(err);
    }
};

// Get All Teachers
export const getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find().select("-password"); // Exclude password for security
        res.status(200).json({
            success: true,
            teachers
        });
    } catch (err) {
        return next(err);
    }
};
