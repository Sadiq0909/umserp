import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "@/models/User"
import { connect } from "@/database/connect"

// ---------------- REGISTER ----------------
export async function register(body) {
  await connect()
  try {
    const { name, email, password, role } = body

    const existingUser = await User.findOne({ Email: email })
    if (existingUser) return { success: false, message: "User already exists" }

    const hashedPassword = await bcrypt.hash(password, 10)

    const lastUser = await User.findOne({}).sort({ User_ID: -1 })
    const newUser = await User.create({
      User_ID: lastUser ? lastUser.User_ID + 1 : 1,
      Username: name,
      Email: email,
      Password_Hash: hashedPassword,
      Role: role || "Student",
    })

    const token = jwt.sign(
      { id: newUser.User_ID, email: newUser.Email, role: newUser.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return {
      success: true,
      token,
      user: {
        id: newUser.User_ID,
        name: newUser.Username,
        email: newUser.Email,
        role: newUser.Role,
      },
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

// ---------------- LOGIN ----------------
export async function login(body) {
  await connect()
  try {
    const { email, password } = body

    const user = await User.findOne({ Email: email })
    if (!user) return { success: false, message: "Invalid credentials" }

    const valid = await bcrypt.compare(password, user.Password_Hash)
    if (!valid) return { success: false, message: "Invalid credentials" }

    const token = jwt.sign(
      { id: user.User_ID, email: user.Email, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return {
      success: true,
      token,
      user: {
        id: user.User_ID,
        name: user.Username,
        email: user.Email,
        role: user.Role,
      },
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

