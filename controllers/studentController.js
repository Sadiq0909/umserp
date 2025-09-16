// import crypto from "crypto";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs"; 
// import { Student } from "@/models/Student";
// import { User } from "@/models/User"; 
// import { connect } from "@/database/connect";


// export async function verifyAndAddStudent(req) {
//   await connect();
//   const session = await mongoose.startSession(); // <-- Start a session for transaction
//   session.startTransaction(); // <-- Start the transaction

//   try {
//     const body = await req.json();
//     const {
//       formData,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     } = body;

//     // Step 1: Verify Razorpay signature
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSign !== razorpay_signature) {
//       // No need to abort transaction, as we haven't written to the DB yet
//       await session.endSession();
//       return { success: false, message: "Payment verification failed" };
//     }

//     // Step 2: Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(formData.password, salt);

//     // Step 3: Create the Student within the transaction
//     const student = await Student.create([{ 
//       ...formData,
//       Payment_Id: razorpay_payment_id,
//       Order_Id: razorpay_order_id,
//     }], { session }); 

//     // Step 4: Create the corresponding User within the transaction
//     await User.create([{ 
//       User_ID: await getNextUserId(),
//       Username: formData.First_Name,
//       Password_Hash: hashedPassword,
//       Role: "Student", 
//       Email: formData.Email,
//     }], { session });

//     // Step 5: If all goes well, commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     return { success: true, student: student[0] };
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
    
//     console.error("Error in verifyAndAddStudent:", err);
//     // Check for duplicate key error
//     if (err.code === 11000) {
//       return { success: false, message: "A student with this email already exists." };
//     }
//     return { success: false, message: "Server error during admission." };
//   }
// }