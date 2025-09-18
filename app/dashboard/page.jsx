"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, BookOpen, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch("/api/student/me", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setStudentData(data);
      } catch (err) {
        console.error(err);
        router.push("/sign-in"); // redirect if not logged in
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="p-8">
      <Button
        onClick={() => {
          document.cookie = "token=; Max-Age=0; path=/;"; // remove cookie
          router.push("/sign-in");
        }}
        className="mb-6 bg-red-600 text-white hover:bg-red-700"
      >
        Logout
      </Button>

      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {studentData && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {studentData.name}</p>
              <p><strong>Email:</strong> {studentData.email}</p>
              <p><strong>Department:</strong> {studentData.department}</p>
              <p><strong>DOB:</strong> {studentData.DOB?.split("T")[0]}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              <CardTitle>Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Subjects enrolled will appear here</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              <CardTitle>Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Fees info will appear here</p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
