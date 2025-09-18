"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, BedDouble, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const hostels = [
    {
      Hostel_ID: 1,
      Hostel_Name: "Ganga Hostel",
      Capacity: 120,
      Warden_Name: "Mr. Sharma",
      Contact: "9876543210",
    },
    {
      Hostel_ID: 2,
      Hostel_Name: "Yamuna Hostel",
      Capacity: 100,
      Warden_Name: "Mrs. Singh",
      Contact: "9123456780",
    },
    {
      Hostel_ID: 3,
      Hostel_Name: "Kaveri Hostel",
      Capacity: 80,
      Warden_Name: "Dr. Patel",
      Contact: "9988776655",
    },
  ];

  return (
    <section className="py-12 px-6 mx-auto bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 ">
          <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">
            Admin Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/students">
            <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Students</CardTitle>
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,245</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Hostels</CardTitle>
              <Home className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Rooms</CardTitle>
              <BedDouble className="w-5 h-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">320</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Fees Collected</CardTitle>
              <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹12.5L</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Admissions */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 mb-12">
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold">Recent Admissions</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            {[
              { name: "Rahul Sharma", email: "rahul@example.com", date: "2025-09-01" },
              { name: "Aisha Khan", email: "aisha@example.com", date: "2025-09-03" },
              { name: "Vikram Patel", email: "vikram@example.com", date: "2025-09-05" },
            ].map((student, idx) => (
              <div key={idx} className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {student.email}
                  </p>
                </div>
                <span className="text-sm text-zinc-500">{student.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hostels Section */}
<div className="mt-12">
  <h2 className="text-2xl font-semibold mb-6">Hostels</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* View All Hostels */}
    <Link href="/hostels">
      <Card className="cursor-pointer shadow-md border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            View All Hostels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage hostel details, rooms, and allocations.
          </p>
        </CardContent>
      </Card>
    </Link>

    {/* Add Hostel */}
    <Link href="/add-hostel">
      <Card className="cursor-pointer shadow-md border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="w-6 h-6 text-green-600 dark:text-green-400" />
            Add New Hostel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600 dark:text-zinc-400">
            Create a new hostel and assign rooms easily.
          </p>
        </CardContent>
      </Card>
    </Link>

  </div>
</div>

      </div>
    </section>
  );
}
