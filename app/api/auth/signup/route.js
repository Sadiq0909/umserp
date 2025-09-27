import { connect } from "@/database/connect";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();
  const { username, email, password } = await req.json();

  if (!username || !email || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const existingUser = await User.findOne({ Email: email });
  if (existingUser)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = bcrypt.hashSync(password, 10);

  // Generate next User_ID
  const lastUser = await User.findOne().sort({ User_ID: -1 });
  const newUserID = lastUser ? lastUser.User_ID + 1 : 1;

  const newUser = await User.create({
    User_ID: newUserID,
    Username: username,
    Email: email,
    Password_Hash: hashedPassword,
    Role: "Student", // Default role
  });

  return NextResponse.json({ message: "User created", user: newUser });
}
