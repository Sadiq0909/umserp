import { Hostel } from "@/models/Hostel";

export async function getHostelsController() {
  try {
    const hostels = await Hostel.find();
    return { success: true, data: hostels };
  } catch (err) {
    return { success: false, message: "Error fetching hostels" };
  }
}
