import { register, login } from "@/controllers/authController"
import { NextResponse } from "next/server"

function attachTokenCookie(res, token) {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hr
  })
  return res
}

export async function POST(req) {
  let body = {}
  try {
    body = await req.json()
  } catch (err) {
    const text = await req.text()
    try {
      body = JSON.parse(text)
    } catch (err2) {
      return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 })
    }
  }

  const { action } = body

  if (action === "register") {
    const normalized = {
      name: body.Username || body.name,
      email: body.Email || body.email,
      password: body.Password || body.password,
      role: body.Role || body.role || "Student",
    }

    const result = await register(normalized)
    if (result.success) {
      const res = NextResponse.json(result, { status: 201 })
      return attachTokenCookie(res, result.token)
    }
    return NextResponse.json(result, { status: 400 })
  }

  if (action === "login") {
    const normalized = {
      email: body.Email || body.email,
      password: body.Password || body.password,
    }

    const result = await login(normalized)
    if (result.success) {
      const res = NextResponse.json(result, { status: 200 })
      return attachTokenCookie(res, result.token)
    }
    return NextResponse.json(result, { status: 401, message: result.message })
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 })
}



