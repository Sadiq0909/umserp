import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount } = body || 500; // Expect amount from frontend (in INR)

    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { message: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const order =  razorpay.orders.create({
      amount: amount * 100, // Convert INR to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error in creating order", error);
    return NextResponse.json(
      { message: "Error in creating order" },
      { status: 500 }
    );
  }
}
