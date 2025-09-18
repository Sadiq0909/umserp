import { NextResponse } from "next/server";
import { verifyAndAddStudent } from "@/controllers/studentController";
import { verifyToken } from "@/lib/utils";
import { connect } from "@/database/connect";
import {User} from "@/models/User";
import {Student} from "@/models/Student";
import {Fee} from "@/models/Fee";
import {Result} from "@/models/Result";
import {Subject} from "@/models/Subject";
import {Hostel} from "@/models/Hostel";
import {Exam} from "@/models/Exam";

// Add new student
export async function POST(req) {
  try {
    const body = await req.json();

    const result = await verifyAndAddStudent(body);
    if (!result.success) return NextResponse.json(result, { status: 400 });

    return NextResponse.json({ success: true, student: result.student });
  } catch (err) {
    console.error("Student API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

//Get logged-in student details
export async function GET(req) {
  await connect();
  try {
    const decoded = verifyToken(req); 
    const userEmail = decoded.email;

    const user = await User.findOne({ Email: userEmail });
    if (!user || user.Role !== "Student") {
      return NextResponse.json(
        { message: "Forbidden: Not a student" },
        { status: 403 }
      );
    }

    const student = await Student.findOne({ Email: user.Email });
    if (!student) {
      return NextResponse.json(
        { message: "Student record not found" },
        { status: 404 }
      );
    }


    const subjects = await Subject.find({});

    const results = await Result.find({ Student_ID: student.Student_ID }).populate({
      path: "Exam_ID",
      model: Exam,
      populate: {
        path: "Subject_ID",
        model: Subject,
      },
    });

    const formattedResults = results.map((r) => ({
      exam: r.Exam_ID?.Exam_Name,
      subject: r.Exam_ID?.Subject_ID?.Subject_Name,
      marksLink: r.Result_Link,
    }));

    const fees = await Fee.find({ Student_ID: student.Student_ID });
    const totalPaid = fees.reduce((sum, f) => sum + (f.Amount || 0), 0);

    let hostelData = null;
    if (student.Hostel_ID) {
      const hostel = await Hostel.findOne({ Hostel_ID: student.Hostel_ID });
      hostelData = {
        name: hostel?.Hostel_Name || "Not Assigned",
        room: student.Room_ID || "Not Assigned",
      };
    }

    return NextResponse.json(
      {
        name: `${student.First_Name} ${student.Last_Name}`,
        email: student.Email,
        department: student.Department,
        subjects: subjects.map((s) => ({ name: s.Subject_Name })),
        results: formattedResults,
        feesPaid: totalPaid,
        feeStatus: totalPaid > 0 ? "Paid" : "Pending",
        hostel: hostelData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error in /api/student GET:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

