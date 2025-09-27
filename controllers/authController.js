import { User } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Signup Controller
export async function signup(req, res) {
  try {
    const { Username, Password, Email, Role } = req.body;

    if (!Username || !Password || !Email || !Role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(Password, 10);

    const lastUser = await User.findOne().sort({ User_ID: -1 });
    const User_ID = lastUser ? lastUser.User_ID + 1 : 1;

    const user = new User({
      User_ID,
      Username,
      Password_Hash: hash,
      Role,
      Email,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Signin Controller
export async function signin(req, res) {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password_Hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.Email, role: user.Role, id: user.User_ID },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
