import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  videoUrl: { type: String, required: true },   // S3 link
  analysisResult: { type: Object },             // Future AI output
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", videoSchema);
