// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import { dbConnection } from "./database/dbConnection.js";
// import studentRouter from "./routers/studentRouter.js";
// import eventRouter from "./routers/eventRouter.js";
// import teacherRouter from "./routers/teacherRouter.js"
// import examRouter from "./routers/examRouter.js"
// import assignmentRouter from "./routers/assignmentRouter.js"
// import attendanceRouter from "./routers/attendanceRouter.js"
// // import announcementRouter from "./routers/announcementRouter.js"
// // import classRouter from "./routers/classRouter.js"
// import classRouter from "./routers/classRouter.js";  // ✅ Correct path

// import { errorHandler } from "./middlewares/errorHandler.js";


// const app = express();

// // Load environment variables
// config({ path: "./config/config.env" });

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true // If using cookies/auth
// }));

// // Handle preflight requests (Important for POST/PUT requests)
// app.options("*", cors());

// app.use((err,req,res,next)=>{
//     errorHandler(err,req,res,next)
// })
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// // API Routes
// app.use("/api/students", studentRouter);
// app.use("/api/events", eventRouter);
// app.use("/api/exam", examRouter);
// app.use("/api/attendance", attendanceRouter);
// app.use("/api/assignment", assignmentRouter);
// app.use("/api/teacher",teacherRouter);
// // app.use("/api/announcement", announcementRouter);
// app.use("/api/classes", classRouter);
// // Error handler middleware
// app.use(errorHandler);

// // Database connection
// dbConnection();

// export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routers/authRoutes.js";
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import studentRouter from "./routers/studentRouter.js";
import eventRouter from "./routers/eventRouter.js";
import teacherRouter from "./routers/teacherRouter.js";
import examRouter from "./routers/examRouter.js";
import attendanceRouter from "./routers/attendanceRouter.js";
import classRouter from "./routers/classRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminRoutes from "./routers/adminRoutes.js"
const app = express();

config({ path: "./config/config.env" });

app.use(cors({
    origin: "http://localhost:5173",
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
app.use("/api/events", eventRouter);
app.use("/api/exam", examRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/classes", classRouter);

app.use(errorHandler);
dbConnection();

export default app;
