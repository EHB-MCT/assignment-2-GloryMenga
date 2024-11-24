const express = require("express");
const router = express.Router();
const UserData = require("../models/UserData");

router.post("/save-session", async (req, res) => {
  try {
    const { sessionDuration } = req.body;
    const newData = new UserData({ sessionDuration });
    await newData.save();
    res.status(200).json({ message: "Session duration saved." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save session duration." });
  }
});

router.post("/save-prompt", async (req, res) => {
  try {
    const { prompt } = req.body;
    const newData = new UserData({ promptKeywords: [prompt] });
    await newData.save();
    res.status(200).json({ message: "Prompt saved." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save prompt." });
  }
});

router.post("/increment-share", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserData.findById(userId);
    if (user) {
      user.shares += 1;
      await user.save();
      res.status(200).json({ message: "Share count updated." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update share count." });
  }
});

router.post("/save-post", async (req, res) => {
  try {
    const { type } = req.body;
    const newData = new UserData({
      publicPosts: type === "public" ? 1 : 0,
      privatePosts: type === "private" ? 1 : 0,
    });
    await newData.save();
    res.status(200).json({ message: "Post type saved." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save post type." });
  }
});

module.exports = router;
