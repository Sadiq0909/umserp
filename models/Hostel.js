import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema({
  Hostel_ID: { type: Number, required: true, unique: true },
  Hostel_Name: { type: String, required: true, unique: true }, 
  Capacity: Number,
  Warden_Name: String,
  Contact: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);   // ✅ must be 10 digits
      },
      message: (props) => `${props.value} is not a valid 10-digit contact number!`,
    },
  },

});

export const Hostel = mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);

