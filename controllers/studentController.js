// controllers/studentController.js
import crypto from "crypto";
import { Student } from "@/models/Student";
import { connect } from "@/database/connect";

export async function verifyAndAddStudent(req) {
  await connect();
  try {
    const body = await req.json();
    const {
      formData,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = body;

    // Step 1: Verify Razorpay signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return { success: false, message: "Payment verification failed" };
    }

    // Step 2: Save student with auto-generated Student_ID
    const student = await Student.create({
      ...formData,
      Payment_Id: razorpay_payment_id,
      Order_Id: razorpay_order_id,
    });

    return { success: true, student };
  } catch (err) {
    console.error("Error in verifyAndAddStudent:", err);
    return { success: false, message: "Server error" };
  }
}
