import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import errorhandler from "./errorHandler.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";



dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// POST /api/auth/register → Register new user
// POST /api/auth/login → Login user
// POST /api/profile → Create/Update profile (protected)
// GET /api/profile → Get logged-in profile (protected)
app.use("/api/auth", authRoutes);      // Register + Login
app.use("/api/profile", profileRoutes); // Profile create/update/get
app.use("/api/videos", uploadRoutes);
app.use(errorhandler);

app.get("/", (req, res) => {
  res.send("🚀 Parakh Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
