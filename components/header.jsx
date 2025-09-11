// frontend/src/components/Header.jsx
"use client";

import Link from "next/link";
import { ModeToggle } from "@/lib/modeToggle";
import { useState } from "react";
import { User, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/fees", label: "Fees" },
    { href: "/hostel", label: "Hostel" },
    { href: "/exams", label: "Exams" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
          src="/logo.svg" 
          alt="About University Management System"
          className="w-14 sm:w-20"
        />
          <span className="text-2xl sm:text-4xl font-bold text-zinc-600 dark:text-zinc-400">
            UMS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          <button className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            <span className="text-sm">Profile</span>
          </button>

          {/* Mobile Nav (Hamburger) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <Menu className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-white dark:bg-zinc-900 px-3">
              <SheetHeader>
                <Link
                  href="/"
                  className="flex items-center gap-2 mb-6"
                  onClick={() => setOpen(false)}
                >
                  <img
          src="/logo.svg" 
          alt="About University Management System"
          className="w-14 sm:w-20"
        />
                  <span className="font-bold text-lg text-zinc-600 dark:text-zinc-400">
                    UMS
                  </span>
                </Link>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <button
                className="mt-6 flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                <User className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                <span>Profile</span>
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
