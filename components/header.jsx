"use client";

import Link from "next/link";
import { ModeToggle } from "@/lib/modeToggle";
import { useState } from "react";
import { User, Menu, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // Base navigation
  let navItems = [
    { href: "/admission", label: "Admission" },
    { href: "/exams", label: "Exams" },
  ];

  // Add admin-only links
  if (session?.user?.role === "Admin") {
    navItems = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/hostel", label: "Hostel" },
      ...navItems,
    ];
  }
  console.log(session?.user);
  

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/sign-in";
  };

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

          {session ? (
            <>
              {/* Avatar + Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={session.user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback>
                        {session.user.name
                          ? session.user.name.charAt(0).toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 pt-2 mt-2">
                  <DropdownMenuItem disabled>
                    {session.user.name || session.user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Logout button visible on desktop */}
              {/* <Button
                className="hidden sm:flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button> */}
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <User className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-zinc-800"
              >
                <User className="w-5 h-5" />
                Sign Up
              </Link>
            </div>
          )}

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
              {session ? (
                <Button
                  className="mt-6 flex items-center gap-2 w-full justify-center"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              ) : (
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2 w-full justify-center px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    <User className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center gap-2 w-full justify-center px-3 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Sign Up
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
