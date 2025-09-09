import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  Result_ID: { type: Number, required: true, unique: true },
  Exam_ID: { type: Number, ref: "Exam", required: true },
  Student_ID: { type: Number, ref: "Student", required: true },
  Result_Link: String
});

export const Result = mongoose.model("Result", ResultSchema);