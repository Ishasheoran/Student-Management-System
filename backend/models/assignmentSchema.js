
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: { // Changed field name to match the controller
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
