"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Page() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [loading, setLoading] = useState(true);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    // ✅ Fetch all students
    useEffect(() => {
        async function fetchStudents() {
            try {
                const res = await fetch("/api/student", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch students");
                const data = await res.json();
                setStudents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, []);

    // ✅ Fetch student details when clicked
    async function fetchStudentDetails(id) {
        try {
            setDetailsLoading(true);
            const res = await fetch(`/api/student/${id}`);

            if (!res.ok) throw new Error("Failed to fetch student details");
            const data = await res.json();

            setSelectedStudent(data.student);

        } catch (err) {
            console.error(err);
        } finally {
            setDetailsLoading(false);
        }
    }

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            (student.First_Name?.toLowerCase().includes(search.toLowerCase()) || false) ||
            (student.Last_Name?.toLowerCase().includes(search.toLowerCase()) || false) ||
            (student.Student_ID?.toLowerCase().includes(search.toLowerCase()) || false) ||
            (student.Email?.toLowerCase().includes(search.toLowerCase()) || false);

        const matchesDepartment =
            department === "all" || student.Department === department;

        return matchesSearch && matchesDepartment;
    });

    const uniqueDepartments = Array.from(
        new Set(students.map((s) => s.Department))
    );

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Admitted Students</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    placeholder="Search by name, ID or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="md:w-1/3"
                />

                <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="md:w-1/3">
                        <SelectValue placeholder="Filter by Department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {uniqueDepartments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                                {dept}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            {loading ? (
                <p>Loading students...</p>
            ) : (
                <Table>
                    <TableCaption>
                        {filteredStudents.length === 0
                            ? "No students found"
                            : "List of admitted students"}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Phone</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow
                                key={student._id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => fetchStudentDetails(student._id)}
                            >
                                <TableCell className="font-medium">{student.Student_ID}</TableCell>
                                <TableCell>
                                    {student.First_Name} {student.Last_Name}
                                </TableCell>
                                <TableCell>{student.Department}</TableCell>
                                <TableCell>{student.Phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Modal for student details */}
            <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Student Details</DialogTitle>
                    </DialogHeader>
                    {detailsLoading ? (
                        <p>Loading...</p>
                    ) : selectedStudent ? (
                        <div className="space-y-2">
                            <p><b>Student ID:</b> {selectedStudent.Student_ID}</p>
                            <p><b>First Name:</b> {selectedStudent.First_Name} </p>
                            <p><b>Last Name:</b> {selectedStudent.Last_Name}</p>
                            <p><b>Department:</b> {selectedStudent.Department}</p>
                            <p><b>Email:</b> {selectedStudent.Email}</p>
                            <p><b>Phone:</b> {selectedStudent.Phone}</p>
                            <p><b>Hostel ID:</b> {selectedStudent.Hostel_ID}</p>
                            <p><b>Room ID:</b> {selectedStudent.Room_ID}</p>
                            <p><b>Gender:</b> {selectedStudent.Gender}</p>
                            <p><b>Address:</b> {selectedStudent.Address}</p>
                            <p><b>Date of Birth:</b> {selectedStudent.DOB.split("T")[0]}</p>
                        </div>
                    ) : (
                        <p>No student details available.</p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
