"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'; // Import toast for notifications
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdmissionSection() {
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    DOB: "",
    Gender: "",
    Email: "",
    Phone: "",
    password: "",
    confirmPassword: "",
    Department: "",
    Address: "",
    Admission_Date: "",
  });

  const router = useRouter();
  const [selectedFee, setSelectedFee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const departments = {
    "Computer Science": 1000,
    Biotechnology: 200,
    "Civil Engineering": 10,
    "Chemical Engineering": 400,
  };

  const handleDepartmentSelect = (dept) => {
    handleSelect("Department", dept);
    setSelectedFee(departments[dept]);
  };

  const handlePayment = async () => {
    // --- Client-side validation ---
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError("");

    if (!formData.Department || !selectedFee) {
      toast.error("Please select a department to proceed.");
      return;
    }
    
    setLoading(true);
    const toastId = toast.loading("Initializing Payment...");

    try {
      // --- Call the secure '/api/create-order' endpoint ---
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedFee,
          notes: formData, // Pass form data to be saved on the backend
        }),
      });

      if (!res.ok) {
        console.log("i am checking")
        const errorData = await res.json();
        console.log(errorData)
        throw new Error(errorData.message || "An unexpected error occurred.");
      }

      const { orderId } = await res.json();
      if (!orderId) {
        throw new Error("Could not create payment order. Please try again.");
      }
      
      toast.dismiss(toastId); // Dismiss loading toast before opening Razorpay

      // --- Configure and open Razorpay ---
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: selectedFee * 100,
        currency: "INR",
        name: "University Management System",
        description: `Admission Fee for ${formData.Department}`,
        order_id: orderId,
        handler: function (response) {
          setLoading(true); 
          setIsRedirecting(true);
          toast.success("Payment Successful! Finalizing admission...");
          router.push("/dashboard"); 
        },
        prefill: {
          name: `${formData.First_Name} ${formData.Last_Name}`,
          email: formData.Email,
          contact: formData.Phone,
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: {
          color: "#121212",
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  if (isRedirecting) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black animate-fadeIn">
      <div className="text-center space-y-4">
        {/* Animated Spinner */}
        <div 
          className="w-12 h-12 rounded-full animate-spin
          border-4 border-solid border-blue-500 border-t-transparent"
        ></div>

        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          Finalizing Your Admission...
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Please do not refresh or close the page.
        </p>
      </div>
    </div>
  );
}

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
            {/* The entire <form> JSX remains the same as your last version. */}
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
                    <SelectTrigger> <SelectValue placeholder="Select gender" /> </SelectTrigger>
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

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Create Password</Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}
                </div>
              </div>

              {/* Department + Fee */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Select onValueChange={handleDepartmentSelect}>
                  <SelectTrigger> <SelectValue placeholder="Select department" /> </SelectTrigger>
                  <SelectContent>
                    {Object.entries(departments).map(([dept, fee]) => (
                      <SelectItem key={dept} value={dept}> {dept} </SelectItem>
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

              {/* Submit & Pay */}
              <div className="pt-4">
                <Button type="button" onClick={handlePayment} disabled={loading} className="px-6 rounded-lg w-full text-lg py-6 font-semibold disabled:opacity-50">
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