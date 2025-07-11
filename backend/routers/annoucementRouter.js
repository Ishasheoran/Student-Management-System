import express from "express";
import Announcement from "../models/announcementSchema.js"; // make sure this is correct

const router = express.Router();

// POST /api/announcements
router.post("/", async (req, res) => {
  try {
    const { title, message } = req.body;

    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();

    res.json({ success: true, announcement: newAnnouncement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// GET all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, announcements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
