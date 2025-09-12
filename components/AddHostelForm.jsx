"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddHostelForm() {
  const [formData, setFormData] = useState({
    Hostel_ID: "",
    Hostel_Name: "",
    Capacity: "",
    Warden_Name: "",
    Contact: "",
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
      const res = await fetch("/api/hostels", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.success ? "Hostel added successfully ✅" : data.message);
    } catch (err) {
      setMessage("Error adding hostel ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md border border-gray-200 dark:border-zinc-800 max-w-5xl mx-auto sm:my-40 my-20 ">
      <CardHeader>
        <CardTitle className="text-3xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">Add Hostel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="py-2">Hostel ID</Label>
            <Input name="Hostel_ID" value={formData.Hostel_ID} onChange={handleChange} required />
          </div>
          <div>
            <Label className="py-2">Hostel Name</Label>
            <Input name="Hostel_Name" value={formData.Hostel_Name} onChange={handleChange} required />
          </div>
          <div>
            <Label className="py-2">Capacity</Label>
            <Input type="number" name="Capacity" value={formData.Capacity} onChange={handleChange} required />
          </div>
          <div>
            <Label className="py-2">Warden Name</Label>
            <Input name="Warden_Name" value={formData.Warden_Name} onChange={handleChange} />
          </div>
          <div>
            <Label className="py-2">Contact</Label>
            <Input name="Contact" value={formData.Contact} onChange={handleChange} />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Hostel"}
          </Button>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </CardContent>
    </Card>
  );
}
