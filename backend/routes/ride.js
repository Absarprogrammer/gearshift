const express = require("express");
const Ride = require("../models/Ride");

const router = express.Router();


// ===============================
// CREATE RIDE
// ===============================
router.post("/create", async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ride" });
  }
});


// ===============================
// GET ALL RIDES (Public Feed)
// ===============================
router.get("/all", async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});


// ===============================
// GET USER RIDES
// ===============================
router.get("/:userId", async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.params.userId });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});


// ===============================
// ❤️ LIKE RIDE
// ===============================
// routes/rides.js
router.put("/like/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ error: "Ride not found" });

    // Convert ObjectIds to strings for safe comparison
    const likes = ride.likes.map(id => id.toString());
    if (likes.includes(userId)) {
      ride.likes = ride.likes.filter(id => id.toString() !== userId);
    } else {
      ride.likes.push(userId);
    }

    await ride.save();
    res.json(ride);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to like ride" });
  }
});


// ===============================
// 👥 JOIN RIDE
// ===============================
router.put("/join/:id", async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (ride.participants.includes(req.body.userId)) {
    // If user is already there, REMOVE them (Unjoin)
    ride.participants = ride.participants.filter(id => id.toString() !== req.body.userId);
  } else {
    // If user is not there, ADD them (Join)
    ride.participants.push(req.body.userId);
  }
  await ride.save();
  res.json(ride);
});


module.exports = router;