import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema({
  Fee_ID: { type: Number, required: true, unique: true },
  Student_ID: { type: Number, ref: "Student", required: true },
  Amount: Number,
  Payment_Date: Date,
  Payment_Mode: String,
  Transaction_ID: String,
  Status: { type: String, enum: ["Paid", "Pending", "Failed"], default: "Pending" },
  Receipt_Link: String
});

export const Fee =  mongoose.model("Fee", FeeSchema);