import { NextResponse } from "next/server";
import { verifyAndAddStudent } from "@/controllers/studentController";

export async function POST(req) {
  const result = await verifyAndAddStudent(req);

  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Student added successfully", student: result.student },
    { status: 200 }
  );
}
