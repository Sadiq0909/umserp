"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HostelAllotmentSection() {
  const [formData, setFormData] = useState({
    Student_ID: "",
    Room_ID: "",
    Hostel_ID: "",
  });

  const [hostels, setHostels] = useState([
    { Hostel_ID: 101, Hostel_Name: "Evergreen Hostel" },
    { Hostel_ID: 102, Hostel_Name: "Sunrise Hostel" },
    { Hostel_ID: 103, Hostel_Name: "Harmony Hostel" },
  ]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch("/api/hostels");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setHostels((prev) => [...prev, ...data]); // merge static + DB hostels
          }
        }
      } catch (err) {
        console.error("Failed to fetch hostels:", err);
      }
    };
    fetchHostels();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/hostel-allotment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      alert(`Hostel Allotment Successful! Room ID: ${formData.Room_ID}`);
    } else {
      alert("Allotment failed: " + data.message);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black px-4">
      <div className="max-w-3xl mx-auto px-6">
        <Card className="shadow-lg border border-gray-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">
              Hostel Allotment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Student ID */}
              <div className="space-y-2">
                <Label>Student ID</Label>
                <Input
                  name="Student_ID"
                  value={formData.Student_ID}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Room ID */}
              <div className="space-y-2">
                <Label>Room ID</Label>
                <Input
                  name="Room_ID"
                  value={formData.Room_ID}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Hostel Dropdown */}
              <div className="space-y-2">
                <Label>Hostel</Label>
                <Select
                  onValueChange={(val) => handleSelect("Hostel_ID", val)}
                  value={formData.Hostel_ID}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hostel" />
                  </SelectTrigger>
                  <SelectContent>
                    {hostels.map((hostel) => (
                      <SelectItem
                        key={hostel.Hostel_ID}
                        value={hostel.Hostel_ID.toString()}
                      >
                        {hostel.Hostel_Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Allot Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
