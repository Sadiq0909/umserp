import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

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
export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};

