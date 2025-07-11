import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routers/authRoutes.js";
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import studentRouter from "./routers/studentRouter.js";
import announcementRouter from "./routers/annoucementRouter.js"
import teacherRouter from "./routers/teacherRouter.js";
import examRouter from "./routers/examRouter.js";

import classRouter from "./routers/classRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminRoutes from "./routers/adminRoutes.js"

const app = express();

config({ path: "./config/config.env" });

app.use(cors({
    origin: "https://student-management-system-chi-jet.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
// Serve static files from "uploads" folder
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes); 
app.use("/api/assignment", assignmentRouter);
app.use("/api/students", studentRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/exam", examRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/class", classRouter);

app.use(errorHandler);
dbConnection();
export default app;
