import crypto from "crypto";
import { Student } from "@/models/Student";
import { connect } from "@/database/connect";
import mongoose from "mongoose";

export function verifyPayment(body) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");
  return expectedSign === razorpay_signature;
}

async function generateStudentID() {
  await connect();

  const lastStudent = await Student.findOne({}).sort({ Student_ID: -1 }); return lastStudent ? lastStudent.Student_ID + 1 : 1001;
}

export async function addStudent(formData, razorpay_payment_id, razorpay_order_id) {
  await connect();

  const studentID = await generateStudentID();

  const student = await Student.create({
    ...formData,
    Student_ID: studentID,          
    Payment_Id: razorpay_payment_id,
    Order_Id: razorpay_order_id,
  });

  return student;
}

export async function verifyAndAddStudent(body) {
  try {
    const isValid = verifyPayment(body);
    if (!isValid) return { success: false, message: "Payment verification failed" };

    const student = await addStudent(
      body.formData,
      body.razorpay_payment_id,
      body.razorpay_order_id
    );

    return { success: true, student };
  } catch (err) {
    console.error("Error in verifyAndAddStudent:", err);
    return { success: false, message: "Server error" };
  }
}


export async function getStudents() {
  try {
    connect();
    const students = await Student.find().sort({ createdAt: -1 });
    const plainStudents = students.map((s) => s.toObject());
    console.log("Hiii");
    
    return { success: true, students: plainStudents };
  } catch (err) {
    console.error("getStudents error:", err);
    return { success: false, message: err.message };
  }
}