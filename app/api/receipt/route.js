import { NextResponse } from "next/server";
import { generateReceipt } from "@/lib/generateReceipt";

export async function POST(req) {
  try {
    const { student, payment } = await req.json();
    const pdfStream = await generateReceipt(student, payment);

    return new NextResponse(pdfStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Receipt_${student.First_Name}.pdf`,
      },
    });
  } catch (err) {
    console.error("Receipt API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
