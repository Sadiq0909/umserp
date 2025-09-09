import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  User_ID: { type: Number, required: true, unique: true },
  Username: { type: String, required: true },
  Password_Hash: { type: String, required: true },
  Role: { type: String, enum: ["Admin", "Student"], required: true },
  Email: { type: String, required: true, unique: true }
});

export const User = mongoose.model("User", UserSchema);
