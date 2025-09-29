"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

export default function CreateExamPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    sessionName: "",
    department: "",
    semester: "",
    examStart: "",
    examEnd: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create exam");
      }

      toast.success("Exam created successfully!");
      router.push("/dashboard/exams"); // Redirect back to exam list
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="py-12 px-6 mx-auto">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg border border-gray-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create New Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session Name */}
              <div className="space-y-2">
                <Label>Session Name</Label>
                <Input
                  name="sessionName"
                  value={formData.sessionName}
                  onChange={handleChange}
                  placeholder="Mid-Semester Exams 2025"
                  required
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  required
                />
              </div>

              {/* Semester */}
              <div className="space-y-2">
                <Label>Semester</Label>
                <Input
                  name="semester"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="6"
                  required
                />
              </div>

              {/* Exam Start Date */}
              <div className="space-y-2">
                <Label>Exam Start Date</Label>
                <Input
                  name="examStart"
                  type="date"
                  value={formData.examStart}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Exam End Date */}
              <div className="space-y-2">
                <Label>Exam End Date</Label>
                <Input
                  name="examEnd"
                  type="date"
                  value={formData.examEnd}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter details about the exam session..."
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full py-6 text-lg font-semibold">
                Create Exam
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}