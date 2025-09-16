import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  User_ID: { type: Number, required: true, unique: true },
  Student_ID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', // This creates the link to the 'Student' model
    required: true 
  },
  Password_Hash: { type: String, required: true },
  Role: { 
    type: String, 
    enum: ["Admin", "Student"], 
    required: true 
  },
  Email: { type: String, required: true, unique: true }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);