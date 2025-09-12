import { NextResponse } from "next/server";
import { connect } from "@/src/database/connect";
import { getRoomsByHostelController } from "@/src/controllers/roomController";

export async function GET(req) {
  await connect();
  const { searchParams } = new URL(req.url);
  const hostelId = searchParams.get("hostelId");

  const result = await getRoomsByHostelController(hostelId);
  return NextResponse.json(result.success ? result.data : { message: result.message }, { status: result.success ? 200 : 500 });
}
