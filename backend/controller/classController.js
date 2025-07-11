
import Class from "../models/classSchema.js";

export const createClass = async (req, res) => {
    const { grade, Sem, subjects } = req.body;

    try {
        // Validate input
        if (!grade || !Sem || !Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Grade, semester, and at least one subject are required" 
            });
        }

        // Check for duplicate subjects
        const subjectNames = subjects.map(s => s.name);
        if (new Set(subjectNames).size !== subjectNames.length) {
            return res.status(400).json({ 
                success: false, 
                message: "Duplicate subjects not allowed" 
            });
        }

        // Create new class
        const newClass = await Class.create({ grade, Sem, subjects });

        res.status(201).json({
            success: true,
            message: "Class created successfully",
            class: newClass
        });
    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json({
            success: true,
            classes
        });
    } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Add this new endpoint to get all unique subjects across classes
export const getAllSubjects = async (req, res) => {
    try {
        const classes = await Class.find();
        const subjects = [];
        
        classes.forEach(cls => {
            cls.subjects.forEach(subject => {
                if (!subjects.some(s => s.name === subject.name)) {
                    subjects.push(subject);
                }
            });
        });

        res.status(200).json({
            success: true,
            subjects
        });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};