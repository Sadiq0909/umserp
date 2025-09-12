import { NextResponse } from "next/server";
import { connect } from "@/database/connect";
import { getHostelsController } from "@/controllers/hostelController";

export async function GET() {
  // await connect();
  const result = await getHostelsController();
  return NextResponse.json(result.success ? result.data : { message: result.message }, { status: result.success ? 200 : 500 });
}
