
import Student from "../models/studentSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

export const studentLogin = async (req, res) => {
    const { registrationNumber, password } = req.body;
    
    try {
        console.log("Received Login Request:", { registrationNumber, password });

        const student = await Student.findOne({ registrationNumber });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        console.log("Password Match:", isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: student._id, registrationNumber: student.registrationNumber },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            student: { id: student._id, name: student.name, registrationNumber: student.registrationNumber }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
// ✅ Reset Password

export const resetPassword = async (req, res) => {
    const { registrationNumber, newPassword } = req.body;

    try {
        const student = await Student.findOne({ registrationNumber });
        if (!student) return res.status(404).json({ message: "Student not found!" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;
        await student.save();

        res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

