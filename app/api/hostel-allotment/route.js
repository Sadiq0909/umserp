import { NextResponse } from "next/server";
import { connect } from "@/src/database/connect";
import { allotRoomController } from "@/src/controllers/allotmentController";

export async function POST(req) {
  await connect();
  const body = await req.json();
  const result = await allotRoomController(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
