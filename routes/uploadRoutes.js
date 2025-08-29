import express from "express";
import { upload, uploadVideo } from "../controllers/uploadController.js";

const router = express.Router();
router.post("/upload", upload, uploadVideo);

export default router;
