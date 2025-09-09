import mongoose from "mongoose";


const SubjectSchema = new mongoose.Schema({
  Subject_ID: { type: Number, required: true, unique: true },
  Subject_Name: String,
  Subject_Code: String
});

export const Subject = mongoose.model("Subject", SubjectSchema);