import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  Student_ID: { type: Number, unique: true },
  First_Name: String,
  Last_Name: String,
  DOB: Date,
  Gender: String,
  Email: { type: String, required: true, unique: true },
  Phone: String,
  Address: String,
  Department: String,
  Payment_Id: String,
  Order_Id: String,
  Hostel_ID: { type: Number, default: null },
  Room_ID: { type: Number, default: null },
  Admission_Date: Date
});



StudentSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const lastStudent = await mongoose
      .model("Student", StudentSchema)
      .findOne({})
      .sort({ Student_ID: -1 });

    this.Student_ID = lastStudent ? lastStudent.Student_ID + 1 : 1001;
    next();
  } catch (err) {
    next(err);
  }
});


export const Student = mongoose.model("Student", StudentSchema);