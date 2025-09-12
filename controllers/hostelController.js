import { Hostel } from "@/models/Hostel";

export async function getHostelsController() {
  try {
    const hostels = await Hostel.find();
    return { success: true, data: hostels };
  } catch (err) {
    return { success: false, message: "Error fetching hostels" };
  }
}
export async function getHostelByIdController(id) {
  try {
    const hostel = await Hostel.findById(id);
    if (!hostel) return { success: false, message: "Hostel not found" };
    return { success: true, data: hostel };
  } catch (err) {
    return { success: false, message: "Error fetching hostel" };
  }
}

// Add new hostel
export async function addHostelController(data) {
  try {
    const hostel = new Hostel(data);
    await hostel.save();
    return { success: true, data: hostel };
  } catch (err) {
    return { success: false, message: "Error adding hostel" };
  }
}

// Update hostel
export async function updateHostelController(id, data) {
  try {
    const hostel = await Hostel.findByIdAndUpdate(id, data, { new: true });
    if (!hostel) return { success: false, message: "Hostel not found" };
    return { success: true, data: hostel };
  } catch (err) {
    return { success: false, message: "Error updating hostel" };
  }
}

// Delete hostel
export async function deleteHostelController(id) {
  try {
    const hostel = await Hostel.findByIdAndDelete(id);
    if (!hostel) return { success: false, message: "Hostel not found" };
    return { success: true, message: "Hostel deleted successfully" };
  } catch (err) {
    return { success: false, message: "Error deleting hostel" };
  }
}
