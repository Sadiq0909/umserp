"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Book,
  Clock,
  Target,
  Flag,
  Calendar,
  User,
  LogOut,
  Phone,
  Home,
  Mail,
  CalendarDays,
  UserCircle,
  Receipt,
  Hash,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    roomNumber: "123",
    hostel: "Maple Residency",
    dob: "2002-05-14",
    phone: "+91 9876543210",
    address: "123, Elm Street, Springfield",
    admissionDate: "2022-08-01",
    level: 5,
    auraPoints: 2500,
    profilePicture: "https://via.placeholder.com/40",
    paymentId: "PAY123456",
    orderId: "ORD987654",
  };

  const StatsCard = ({ title, value, icon, description }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold break-words">{value}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold ">
            Welcome back, {userData.firstName} {userData.lastName}!
          </h1>
          <p className="text-gray-600">Track your progress and stay motivated</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Room"
          value={userData.roomNumber}
          icon={<Clock className="h-4 w-4 text-orange-600" />}
          description="Your allocated room number"
        />
        <StatsCard
          title="Hostel"
          value={userData.hostel}
          icon={<Target className="h-4 w-4 text-purple-600" />}
          description="Your hostel allocation"
        />
        <StatsCard
          title="Phone"
          value={userData.phone}
          icon={<Phone className="h-4 w-4 text-green-600" />}
          description="Registered mobile number"
        />
        <StatsCard
          title="Email"
          value={userData.email}
          icon={<Mail className="h-4 w-4 text-blue-600" />}
          description="Registered email address"
        />
      </div>

      {/* Profile Info + Admission Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><Mail className="inline h-4 w-4 mr-2 text-gray-500"/> {userData.email}</p>
            <p><User className="inline h-4 w-4 mr-2 text-gray-500"/> Gender: {userData.gender}</p>
            <p><CalendarDays className="inline h-4 w-4 mr-2 text-gray-500"/> DOB: {new Date(userData.dob).toLocaleDateString()}</p>
            <p><Phone className="inline h-4 w-4 mr-2 text-gray-500"/> {userData.phone}</p>
            <p><Home className="inline h-4 w-4 mr-2 text-gray-500"/> {userData.address}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Admission Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <CalendarDays className="inline h-4 w-4 mr-2 text-gray-500"/>
              Admission Date: {new Date(userData.admissionDate).toLocaleDateString()}
            </p>
            <p>
              <Receipt className="inline h-4 w-4 mr-2 text-gray-500"/>
              Payment ID: {userData.paymentId}
            </p>
            <p>
              <Hash className="inline h-4 w-4 mr-2 text-gray-500"/>
              Order ID: {userData.orderId}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress + Profession */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card
          onClick={() => router.push("/profession")}
          className="cursor-pointer hover:shadow-lg transition"
        >
          <CardHeader>
            <CardTitle>Profession Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Explore the complete roadmap for your chosen profession.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
