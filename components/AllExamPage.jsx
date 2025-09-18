"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function AllExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams from API
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        if (res.ok) {
          const data = await res.json();
          setExams(data);
        }
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Exam Sessions</h1>
        <Link href="/exams/create-exam">
          <Button>Create New Exam</Button>
        </Link>
      </div>

      {/* Exam Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.length === 0 ? (
          <p className="text-gray-500">No exam sessions created yet.</p>
        ) : (
          exams.map((exam) => (
            <Card key={exam._id} className="shadow-md">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{exam.sessionName}</h2>
                <p className="text-gray-600">
                  Department: {exam.department} | Semester: {exam.semester}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(exam.examStart).toLocaleDateString()} →{" "}
                  {new Date(exam.examEnd).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
