// src/controllers/roomController.js
import { Room } from "@/models/Room";

export async function getRoomsByHostelController(hostelId) {
  try {
    if (!hostelId) {
      return { success: false, message: "Hostel ID required" };
    }
    const rooms = await Room.find({ Hostel_ID: hostelId });
    return { success: true, data: rooms };
  } catch (err) {
    return { success: false, message: "Error fetching rooms" };
  }
}
