// File: app/api/razorpay-webhook/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import { connect } from "@/database/connect";
import { PendingAdmission } from "@/models/PendingAdmission";
import { Student } from "@/models/Student";
import { User } from "@/models/User";

async function getNextUserId() {
  const lastUser = await User.findOne().sort({ User_ID: -1 });
  return lastUser ? lastUser.User_ID + 1 : 1001;
}

export async function POST(request) {
  let session;
  try {
    // ... (connection and signature verification logic remains the same) ...
    await connect();
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = request.headers.get("x-razorpay-signature");
    const rawBody = await request.text();

    const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    if (expectedSignature !== signature) {
      return NextResponse.json({ message: "Invalid Signature" }, { status: 401 });
    }

    const data = JSON.parse(rawBody);

    if (data.event === 'payment.captured') {
      const paymentEntity = data.payload.payment.entity;
      const { notes, email, id: paymentId, order_id: orderId } = paymentEntity;
      
      const existingStudent = await Student.findOne({ Payment_Id: paymentId });
      if (existingStudent) {
        return NextResponse.json({ status: "ok" });
      }
      
      session = await mongoose.startSession();
      session.startTransaction();

      const pendingAdmission = await PendingAdmission.findById(notes.admissionId).session(session);

      if (!pendingAdmission || pendingAdmission.status === 'COMPLETED') {
        if(session.inTransaction()) await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ status: "ok" });
      }
      
      // --- START OF CHANGES ---
      
      // 1. Create the Student record
      // This returns an array, so we get the first (and only) element
      const createdStudentArray = await Student.create([{
        First_Name: pendingAdmission.First_Name,
        Last_Name: pendingAdmission.Last_Name,
        DOB: new Date(pendingAdmission.DOB), // Convert string to Date object
        Gender: pendingAdmission.Gender,
        Email: email,
        Phone: pendingAdmission.Phone,
        Address: pendingAdmission.Address,
        Department: pendingAdmission.Department,
        Admission_Date: new Date(pendingAdmission.Admission_Date), // Convert string to Date
        Payment_Id: paymentId,
        Order_Id: orderId,
      }], { session });

      const newStudent = createdStudentArray[0];

      // 2. Create the User record, linking it to the new Student
      await User.create([{
        User_ID: await getNextUserId(),
        Student_ID: newStudent._id, // <-- Use the new student's ID here
        Password_Hash: pendingAdmission.Password_Hash,
        Role: "Student",
        Email: email,
      }], { session });

      // --- END OF CHANGES ---

      pendingAdmission.status = 'COMPLETED';
      await pendingAdmission.save({ session });
      
      await session.commitTransaction();
      session.endSession();
    }

    return NextResponse.json({ status: "ok" });

  } catch (err) {
    // ... (error handling remains the same) ...
    console.error("Webhook processing failed:", err);
    if (session && session.inTransaction()) {
      await session.abortTransaction();
      session.endSession();
    }
    return NextResponse.json({ message: "Webhook processing error" }, { status: 500 });
  }
}