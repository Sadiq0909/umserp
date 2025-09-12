// src/controllers/allotmentController.js
import { Room } from "@/models/Room";
import { Student } from "@/models/Student";

export async function allotRoomController({ Student_ID, Full_Name, Hostel_ID, Room_ID }) {
  try {
    if (!Student_ID || !Full_Name || !Hostel_ID || !Room_ID) {
      return { success: false, message: "Missing required fields" };
    }

    const room = await Room.findOne({ Room_ID, Hostel_ID });
    if (!room) {
      return { success: false, message: "Room not found" };
    }

    if (room.Occupied >= room.Capacity) {
      return { success: false, message: "Room is already full" };
    }

    const student = await Student.findOne({ Student_ID });
    if (!student) {
      return { success: false, message: "Student not found" };
    }

    // ✅ Update room occupancy
    room.Occupied += 1;
    await room.save();

    // ✅ Attach hostel + room to student
    student.Hostel_ID = Hostel_ID;
    student.Room_ID = Room_ID;
    await student.save();

    return { success: true, message: "Room allotted successfully", room };
  } catch (err) {
    return { success: false, message: "Error allotting room" };
  }
}
