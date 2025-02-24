import express from "express";
import { studentLogin,resetPassword } from "../controller/authController.js";

const router = express.Router();

// ✅ Student Login Route
router.post("/student-login", studentLogin);
router.post("/reset-password", resetPassword);
export default router;


