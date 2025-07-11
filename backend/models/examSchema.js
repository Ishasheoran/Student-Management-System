


import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    marks: { type: Number, required: true }
});

const examSchema = new mongoose.Schema({
    registrationNumber: { type: String, required: true },
    className: { type: String, required: true },
    subjects: [subjectSchema]  // ✅ Allow multiple subjects
}, { timestamps: true });

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
