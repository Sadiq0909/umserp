// app/api/payment/route.js

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import bcrypt from "bcryptjs";
import { connect } from "@/database/connect"; // Your DB connection utility
import { PendingAdmission } from "@/models/PendingAdmission";
import { User } from "@/models/User";
import { Student } from "@/models/Student";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    // 1. Attempt to connect to the database first.
    await connect();
    
      // 1. First, get the JSON body from the request and store it in a variable
    const body = await request.json();

    // 2. NOW, you can log that variable to see what was received from the frontend
    console.log("Backend (/api/create-order): Received body ->", body);

    // 3. Destructure the variables you need from the body
    const { amount, notes: formData } = body;
    
    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { message: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    // 1. Check if a user with this email already exists in the final tables.
    const existingUser = await User.findOne({ Email: formData.Email });
    const existingStudent = await Student.findOne({ Email: formData.Email });

    if (existingUser || existingStudent) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 } // 409 Conflict is a good status code for this
      );
    }

    const pendingAdmission = await PendingAdmission.create({
      ...formData,
      Password_Hash: hashedPassword,
      status: 'PENDING',
    });
    console.log(pendingAdmission)
    const options = {
      amount: amount * 100,
      currency: "INR",
      notes: {
        admissionId: pendingAdmission._id.toString(),
      },
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }, { status: 200 });

  } catch (error) {
    // This single catch block now handles errors from the DB connection,
    // hashing, data creation, and Razorpay order creation.
    console.error("Error in create-order route:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}