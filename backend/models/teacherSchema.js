

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving to DB
teacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is changed
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
teacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
