// app/api/create-hostel/route.js
import { NextResponse } from "next/server";
import { Hostel } from "@/models/Hostel";
import { connect } from "@/database/connect";  // ✅ corrected import

export async function POST(req) {
  try {
    await connect();

    const body = await req.json();
    const { Hostel_Name, Capacity, Warden_Name, Contact } = body;
    // ✅ Check if hostel name already exists
    const existingHostel = await Hostel.findOne({ Hostel_Name });
    if (existingHostel) {
      return NextResponse.json(
        { success: false, message: "Hostel name must be unique ❌" },
        { status: 400 }
      );
    }
    // ✅ Validate Contact (10 digits)
    if (Contact && !/^[0-9]{10}$/.test(Contact)) {
      return NextResponse.json(
        { success: false, message: "Contact must be a 10-digit number ❌" },
        { status: 400 }
      );
    }



    const lastHostel = await Hostel.findOne().sort({ Hostel_ID: -1 });
    const Hostel_ID = lastHostel ? lastHostel.Hostel_ID + 1 : 1;

    const newHostel = new Hostel({
      Hostel_ID,
      Hostel_Name,
      Capacity,
      Warden_Name,
      Contact,
    });

    await newHostel.save();

    return NextResponse.json({ success: true, hostel: newHostel });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to add hostel" },
      { status: 500 }
    );
  }
}

