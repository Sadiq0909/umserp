import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  Room_ID: { type: Number, required: true, unique: true },
  Hostel_ID: { type: Number, ref: "Hostel", required: true },
  Room_Number: String,
  Capacity: Number,
  Occupied: { type: Number, default: 0 }
});

export const Room =  mongoose.model("Room", RoomSchema);