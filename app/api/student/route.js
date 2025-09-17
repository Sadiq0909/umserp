import { NextResponse } from "next/server";
import { verifyAndAddStudent } from "@/controllers/studentController";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await verifyAndAddStudent(body);
    if (!result.success) return NextResponse.json(result, { status: 400 });

    return NextResponse.json({ success: true, student: result.student });
  } catch (err) {
    console.error("Student API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
