


import express from "express";
import multer from "multer";
import fs from "fs";
import { createAssignment, getAllAssignments } from "../controller/assignmentController.js";

const router = express.Router();

// Ensure "uploads" folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.get("/getall", getAllAssignments);
router.post("/", upload.single("file"), createAssignment);

export default router;
