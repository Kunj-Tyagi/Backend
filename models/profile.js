import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dob: { type: String },
  gender: { type: String },
  weight: { type: Number },
  height: { type: Number },
  state: { type: String }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);