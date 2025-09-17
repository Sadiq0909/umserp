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
    Department: "",
    Admission_Date: "",
  });

  const [selectedFee, setSelectedFee] = useState(null);
  const [loading, setLoading] = useState(false);

  const departments = {
    "Computer Science": 1000,
    "Biotechnology": 200,
    "Civil Engineering": 10,
    "Chemical Engineering": 400,
  };

  // --- Handlers ---
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleDepartmentSelect = (dept) => {
    handleSelect("Department", dept);
    setSelectedFee(departments[dept]);
  };

  const createOrder = async (amount) => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!data?.orderId) throw new Error("Failed to create order");
      return data.orderId;
    } catch (err) {
      console.error("Order creation error:", err);
      throw err;
    }
  };

  const handleStudentSave = async (paymentResponse) => {
    try {
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Student save failed");
      }

      console.log("✅ Student saved successfully");
      return true;
    } catch (err) {
      console.error("Student save error:", err);
      throw err;
    }
  };

  const downloadReceipt = async (paymentResponse) => {
    try {
      const receiptRes = await fetch("/api/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: formData,
          payment: {
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_order_id: paymentResponse.razorpay_order_id,
            amount: selectedFee * 100,
          },
        }),
      });

      if (!receiptRes.ok) throw new Error("Receipt generation failed");

      const blob = await receiptRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Receipt_${formData.First_Name}_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      console.log("✅ Receipt downloaded successfully");
    } catch (err) {
      console.error("Receipt download error:", err);
      alert("⚠️ Student added, but receipt could not be generated.");
    }
  };

  const handlePayment = async () => {
    if (!formData.Department || !selectedFee) {
      alert("Please select a department to proceed with payment.");
      return;
    }

    setLoading(true);

    try {
      const orderId = await createOrder(selectedFee);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: selectedFee * 100,
        currency: "INR",
        name: "University Management System",
        description: `Fee Payment for ${formData.Department}`,
        order_id: orderId,
        handler: async (response) => {
          // Save student
          try {
            await handleStudentSave(response);
          } catch (err) {
            console.error("Student save failed:", err);
            // fail silently, no alert
          }

          // Download receipt
          try {
            await downloadReceipt(response);
          } catch (err) {
            console.error("Receipt download failed:", err);
            // fail silently, no alert
          }

          console.log("✅ Payment handled (student save and/or receipt may have failed silently).");
        },
        theme: { color: "#121212" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("⚠️ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- JSX ---
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
              {/* Grid for Name */}
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

              {/* Grid for DOB and Gender */}
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

              {/* Email & Phone */}
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

              {/* Department */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Select onValueChange={handleDepartmentSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(departments).map(([dept]) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedFee && (
                  <p className="text-lg font-semibold mt-2 text-zinc-800 dark:text-zinc-200">
                    Fee: ₹{selectedFee}
                  </p>
                )}
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

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="px-6 rounded-lg w-full text-lg py-6 font-semibold disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Submit and Pay"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
