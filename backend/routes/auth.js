const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const transporter = require("../config/mail");

const router = express.Router();


// ===============================
// 📝 REGISTER
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, bikeBrand, bikeModel } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      bikeBrand,
      bikeModel
    });

    await user.save();

    // ✅ Send Welcome Email
    try {
      await transporter.sendMail({
        from: `"GearShift 🏍️" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to GearShift 🚀",
        html: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Hello ${name} 👋</h2>
            <p>Your GearShift account has been created successfully!</p>
            
            <h3>🏍️ Bike Details</h3>
            <p><strong>Brand:</strong> ${bikeBrand}</p>
            <p><strong>Model:</strong> ${bikeModel}</p>

            <p>Start creating and joining rides now!</p>

            <br/>
            <p>Ride Safe 🔥</p>
            <p><strong>Team GearShift</strong></p>
          </div>
        `
      });

      console.log("Email sent successfully ✅");

    } catch (mailError) {
      console.log("Email sending failed ❌", mailError);
    }

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ===============================
// 🔐 LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Send user data (without password)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bikeBrand: user.bikeBrand,
      bikeModel: user.bikeModel
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;