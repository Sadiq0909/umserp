import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  Student_ID: { type: Number, required: true, unique: true },
  First_Name: String,
  Last_Name: String,
  DOB: Date,
  Gender: String,
  Email: { type: String, required: true, unique: true },
  Phone: String,
  Address: String,
  Admission_Date: Date
});

export const Student = mongoose.model("Student", StudentSchema);