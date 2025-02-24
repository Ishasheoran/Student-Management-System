// import mongoose from "mongoose";
// const examSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     registrationNumber:{
//         type:String,
//         required:true,
//         unique:true
//     }, className:{
//         type:String,
//         required:true
//     },
//     marks:{
//         type:Number,
//         required:true
//     }
    
// });
// const Exam=mongoose.model('Exam',examSchema);
// export default Exam;

// import mongoose from "mongoose";

// const examSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     registrationNumber: {
//         type: String,
//         required: true,
//         // unique: true  // ❌ Remove this if students can have multiple exams
//     },
//     className: {
//         type: String,
//         required: true
//     },
//     marks: {
//         type: Number,
//         required: true
//     }
// }, { timestamps: true });  // ✅ Track creation/update times

// const Exam = mongoose.model("Exam", examSchema);
// export default Exam;
// import mongoose from "mongoose";

// const examSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     registrationNumber: {
//         type: String,
//         required: true
//     },
//     className: {
//         type: String,
//         required: true
//     },
//     subject: {  // ✅ Add subject field
//         type: String,
//         required: true
//     },
//     marks: {
//         type: Number,
//         required: true
//     }
// }, { timestamps: true });

// const Exam = mongoose.model("Exam", examSchema);
// export default Exam;


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
