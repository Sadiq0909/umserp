"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddRoomForm() {
  const [formData, setFormData] = useState({
    Room_ID: "",
    Hostel_ID: "",
    Room_Number: "",
    Capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.success ? "Room added successfully ✅" : data.message);
    } catch (err) {
      setMessage("Error adding room ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Room ID</Label>
            <Input name="Room_ID" value={formData.Room_ID} onChange={handleChange} required />
          </div>
          <div>
            <Label>Hostel ID</Label>
            <Input name="Hostel_ID" value={formData.Hostel_ID} onChange={handleChange} required />
          </div>
          <div>
            <Label>Room Number</Label>
            <Input name="Room_Number" value={formData.Room_Number} onChange={handleChange} required />
          </div>
          <div>
            <Label>Capacity</Label>
            <Input type="number" name="Capacity" value={formData.Capacity} onChange={handleChange} required />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Room"}
          </Button>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </CardContent>
    </Card>
  );
}
