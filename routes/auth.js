
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// router.post("/login", async (req, res) => {
//   const { phone, password } = req.body;

//   const user = await User.findOne({ phone });
//   if (!user) return res.status(404).json({ msg: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });
router.post("/login", (req, res) => {
  const { phone, password } = req.body;

  // فرض کن شماره و پسورد ثابته:
  if (phone === "09120000000" && password === "123456") {
    const token = jwt.sign({ phone }, process.env.JWT_SECRET);
    return res.json({ token });
  } else {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
});


module.exports = router;
// auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // چون تو توکن فقط phone داری:
    req.user = { phone: decoded.phone };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
