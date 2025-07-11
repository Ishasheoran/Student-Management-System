


import express from "express";
import { createClass, getAllClasses, getAllSubjects } from "../controller/classController.js";

const router = express.Router();

router.post("/", createClass);
router.get("/", getAllClasses);
router.get("/subjects", getAllSubjects);

export default router;
