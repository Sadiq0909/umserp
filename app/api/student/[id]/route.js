// app/api/student/[id]/route.js
import { NextResponse } from "next/server";
import {Student} from "@/models/Student";
import { connect} from "@/database/connect";

export async function GET(req, { params }) {
  try {
    await connect() ;
    const { id } = await params;
    const student = await Student.findById(id).lean();

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, student }, { status: 200 });
  } catch (err) {
    console.error("Get student by ID error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
