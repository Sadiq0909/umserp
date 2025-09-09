import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  Exam_ID: { type: Number, required: true, unique: true },
  Subject_ID: { type: Number, ref: "Subject", required: true },
  Exam_Name: String,
  Exam_Date: Date,
  Exam_Type: String,
  Max_Marks: Number
});


export const Exam = mongoose.model("Exam", ExamSchema);