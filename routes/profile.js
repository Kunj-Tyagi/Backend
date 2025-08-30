import express from "express";
import Profile from "../models/profile.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/profile
// @desc    Create or Update profile
// @access  Private
router.post("/", requireAuth, async (req, res) => {
  try {
    const { dob, gender, weight, height, state } = req.body;

    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
      // update existing profile
      profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },
        { dob, gender, weight, height, state },
        { new: true }
      );
      return res.json({ msg: "Profile updated", profile });
    }

    // create new profile
    profile = new Profile({
      userId: req.user.id,
      dob,
      gender,
      weight,
      height,
      state
    });

    await profile.save();
    res.status(201).json({ msg: "Profile created", profile });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// @route   GET /api/profile
// @desc    Get logged-in user's profile
// @access  Private
router.get("/", requireAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id }).populate("userId", ["name", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
