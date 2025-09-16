import mongoose from "mongoose";

const PendingAdmissionSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: { type: String, required: true },
  Password_Hash: { type: String, required: true },
  DOB: String,
  Gender: String,
  Phone: String,
  Address: String,
  Department: String,
  Admission_Date: String,
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
}, { timestamps: true });

export const PendingAdmission = mongoose.models.PendingAdmission || mongoose.model("PendingAdmission", PendingAdmissionSchema);