"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register", // ✅ required by route.js
          Username: form.username, // normalized by backend
          Email: form.email,
          Password: form.password,
          Role: "Student", // default role
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...")
        // redirect after success
        setTimeout(() => {
          window.location.href = "/sign-in"
        }, 1500)
      } else {
        // show backend message or generic error
        setError(data.message || "Signup failed")
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black px-4">
      <Card className="w-full max-w-md shadow-md rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="username"
              placeholder="User Name"
              value={form.username}
              onChange={handleChange}
              className="py-5 text-lg"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="py-5 text-lg"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="py-5 text-lg"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-5 text-lg font-semibold rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {success && <p className="text-center text-green-500 mt-4">{success}</p>}

          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6">
            Already have an account?{" "}
            <a href="/sign-in" className="font-semibold underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
