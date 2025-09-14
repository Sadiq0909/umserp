"use client";

import React from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-4xl sm:text-6xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-500 dark:to-white">
        Hostels
      </h2>

      {hostels.length === 0 ? (
        <p className="text-center text-lg text-zinc-600 dark:text-zinc-400">
          No hostels available.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hostels.map((hostel) => (
            <Card
              key={hostel.Hostel_ID}
              className="rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {hostel.Hostel_Name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">
                <p>
                  <span className="font-semibold">Hostel ID:</span>{" "}
                  {hostel.Hostel_ID}
                </p>
                <p>
                  <span className="font-semibold">Capacity:</span>{" "}
                  {hostel.Capacity}
                </p>
                <p>
                  <span className="font-semibold">Warden:</span>{" "}
                  {hostel.Warden_Name}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {hostel.Contact}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Add Hostel CTA Card */}
          <Link href="/add-hostel">
            <Card className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer h-full">
              <CardHeader className="flex flex-col items-center justify-center">
                <Home className="w-10 h-10 text-zinc-600 dark:text-zinc-400 mb-2" />
                <CardTitle className="text-xl font-semibold">
                  Add Hostel
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Create and manage new hostels
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
