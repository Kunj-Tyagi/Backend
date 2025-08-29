import s3 from "../config/s3.js";
import Video from "../models/Video.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("video");

export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `videos/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const s3Data = await s3.upload(params).promise();

    const newVideo = new Video({
    //   userId: req.body.userId,
      videoUrl: s3Data.Location,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
