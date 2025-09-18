// utils.js
// "use server"
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate JWT
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.Role, userId: user.User_ID },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Verify JWT
export  const  verifyToken = (req) => {
  // const cookieStore = cookies();
  const token = req.cookies.get("token")?.value;

  if (!token) throw new Error("No token provided");

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
