// frontend/src/components/Header.jsx
"use client";
import { ModeToggle } from "@/lib/modeToggle";
import Link from "next/link";
import { useState } from "react";
import { Sun, Moon, User } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🎓 UMS
          </span>
          <span className="hidden sm:block font-semibold text-zinc-800 dark:text-zinc-200">
            University Management
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
            Dashboard
          </Link>
          <Link href="/students" className="hover:text-blue-600 dark:hover:text-blue-400">
            Students
          </Link>
          <Link href="/fees" className="hover:text-blue-600 dark:hover:text-blue-400">
            Fees
          </Link>
          <Link href="/hostel" className="hover:text-blue-600 dark:hover:text-blue-400">
            Hostel
          </Link>
          <Link href="/exams" className="hover:text-blue-600 dark:hover:text-blue-400">
            Exams
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Profile */}
          <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            <span className="hidden sm:block text-sm">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
