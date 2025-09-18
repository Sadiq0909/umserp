"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, BedDouble, CreditCard, BookOpen, Award, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [stats, setStats] = useState(null);
  const [studentData, setStudentData] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      router.push("/sign-in"); // redirect if not logged in
    } else {
      setRole(userRole);

      if (userRole === "Admin") {
        fetch("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setStats(data))
          .catch((err) => console.error("Error fetching dashboard stats:", err));
      }

      if (userRole === "Student") {
        fetch("/api/student/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setStudentData(data))
          .catch((err) => console.error("Error fetching student data:", err));
      }
    }
  }, [router]);

  if (!role) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="relative py-12 px-6 mx-auto bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black">
      <div className="max-w-7xl mx-auto">
        {/* Logout Button */}
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            router.push("/sign-in");
          }}
          className="absolute top-6 right-6 bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </Button>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">
            {role === "Admin" ? "Admin Dashboard" : "Student Dashboard"}
          </h1>
        </div>

        {/* ---------- Admin View ---------- */}
        {role === "Admin" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard title="Students" value={stats?.totalStudents} icon={<Users className="w-5 h-5 text-blue-600" />} />
              <StatCard title="Hostels" value={stats?.totalHostels} icon={<Home className="w-5 h-5 text-purple-600" />} />
              <StatCard title="Rooms" value={320} icon={<BedDouble className="w-5 h-5 text-green-600" />} />
              <StatCard title="Fees Collected" value={`₹${stats?.feesCollected}`} icon={<CreditCard className="w-5 h-5 text-orange-600" />} />
            </div>

            {/* Hostels Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Hostels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/hostels">
                  <Card className="cursor-pointer shadow-md border hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Home className="w-6 h-6 text-purple-600" /> View All Hostels
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-600 dark:text-zinc-400">Manage hostel details, rooms, and allocations.</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/add-hostel">
                  <Card className="cursor-pointer shadow-md border hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Home className="w-6 h-6 text-green-600" /> Add New Hostel
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-600 dark:text-zinc-400">Create a new hostel and assign rooms easily.</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* ---------- Student View ---------- */}
        {role === "Student" && studentData && (
          <div className="space-y-8">
            {/* Profile */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Name:</strong> {studentData.name}</p>
                <p><strong>Email:</strong> {studentData.email}</p>
                <p><strong>Department:</strong> {studentData.department}</p>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                <CardTitle>My Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-6">
                  {studentData.subjects?.length > 0 ? (
                    studentData.subjects.map((subj, i) => <li key={i}>{subj.name}</li>)
                  ) : (
                    <p>No subjects enrolled.</p>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-600" />
                <CardTitle>My Results</CardTitle>
              </CardHeader>
              <CardContent>
                {studentData.results?.length > 0 ? (
                  studentData.results.map((res, i) => (
                    <p key={i}><strong>{res.subject}:</strong> {res.marks} marks</p>
                  ))
                ) : (
                  <p>No results available.</p>
                )}
              </CardContent>
            </Card>

            {/* Fees */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <CardTitle>My Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Total Paid:</strong> ₹{studentData.feesPaid}</p>
                <p><strong>Status:</strong> {studentData.feeStatus}</p>
              </CardContent>
            </Card>

            {/* Hostel */}
            {studentData.hostel && (
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <Home className="w-6 h-6 text-purple-600" />
                  <CardTitle>My Hostel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Hostel:</strong> {studentData.hostel.name}</p>
                  <p><strong>Room:</strong> {studentData.hostel.room}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value ?? "-"}</p>
      </CardContent>
    </Card>
  );
}
