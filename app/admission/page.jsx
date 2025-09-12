// src/components/admission/AdmissionSection.jsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdmissionSection() {
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    DOB: "",
    Gender: "",
    Email: "",
    Phone: "",
    Address: "",
    Admission_Date: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handlePayment = async () => {
    const res = await fetch("/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }), // ₹500 in paise
    });

    const { order } = await res.json();

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "University Management",
        description: "Admission Fee",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, studentData: formData }),
          });

          const data = await verifyRes.json();
          if (data.success) {
            alert("Admission successful! Student ID: " + data.student.Student_ID);
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: `${formData.First_Name} ${formData.Last_Name}`,
          email: formData.Email,
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <section className="py-30 bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black px-4">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="shadow-lg border border-gray-200 dark:border-zinc-800 py-20 sm:px-10">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">
              Student Admission Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input name="First_Name" value={formData.First_Name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input name="Last_Name" value={formData.Last_Name} onChange={handleChange} required />
                </div>
              </div>

              {/* DOB + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input name="DOB" type="date" value={formData.DOB} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select onValueChange={(val) => handleSelect("Gender", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="Email" type="email" value={formData.Email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input name="Phone" type="tel" value={formData.Phone} onChange={handleChange} />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea name="Address" value={formData.Address} onChange={handleChange} />
              </div>

              {/* Admission Date */}
              <div className="space-y-2">
                <Label>Admission Date</Label>
                <Input name="Admission_Date" type="date" value={formData.Admission_Date} onChange={handleChange} required />
              </div>

              {/* Submit & Pay */}
              <div className="pt-4">
                <Button type="button" className="w-full text-lg py-6" onClick={handlePayment}>
                  Submit & Pay Fees
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
