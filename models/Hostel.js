import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema({
  Hostel_ID: { type: Number, required: true, unique: true },
  Hostel_Name: String,
  Capacity: Number,
  Warden_Name: String,
  Contact: String
});

export const Hostel = mongoose.model("Hostel", HostelSchema);