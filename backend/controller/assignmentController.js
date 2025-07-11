

import Assignment from "../models/assignmentSchema.js";

// ✅ Function to create a new assignment
export const createAssignment = async (req, res) => {
    try {
        const { title, grade, deadline } = req.body;
        if (!title || !grade || !deadline || !req.file) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const assignment = new Assignment({
            title,
            description: req.file.path, // Save file path
            grade,
            deadline,
        });

        await assignment.save();
        res.status(201).json({ success: true, assignment });
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Function to fetch all assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json({ success: true, assignments });
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

