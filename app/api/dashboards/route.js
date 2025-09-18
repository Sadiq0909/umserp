import { verifyToken } from "@/lib/utils";
import { connect } from "@/database/connect";
import User from "@/models/User";
import Student from "@/models/Student";
import Hostel from "@/models/Hostel";
import Subject from "@/models/Subject";
import Exam from "@/models/Exam";
import Result from "@/models/Result";
import Fee from "@/models/Fee";

export async function GET(req) {
  await connect();
  try {
    const decoded = verifyToken(req);

    if (decoded.role !== "Admin") {
      return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalHostels = await Hostel.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalExams = await Exam.countDocuments();
    const totalResults = await Result.countDocuments();

    const feeAgg = await Fee.aggregate([
      { $group: { _id: null, total: { $sum: "$Amount" } } },
    ]);
    const feesCollected = feeAgg.length > 0 ? feeAgg[0].total : 0;

    return new Response(
      JSON.stringify({
        totalUsers,
        totalStudents,
        totalHostels,
        totalSubjects,
        totalExams,
        totalResults,
        feesCollected,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }
}
