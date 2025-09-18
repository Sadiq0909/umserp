// app/api/student/me/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils";
import { connect } from "@/database/connect";
import {Student} from "@/models/Student";

export async function GET(req) {
  await connect();

  try {
    const decoded = verifyToken(req); // pass req, not token string
    const student = await Student.findOne({ Email: decoded.email });
    if (!student) 
      return NextResponse.json({ message: "Student not found" }, { status: 404 });

    return NextResponse.json({
      name: `${student.First_Name} ${student.Last_Name}`,
      email: student.Email,
      department: student.Department,
      DOB: student.DOB,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}