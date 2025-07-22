const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// مسیر آپدیت موقعیت و وضعیت آنلاین
router.post("/location/update", auth, async (req, res) => {
  const { lat, lng, is_online } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { phone: req.user.phone },
      { lat, lng, is_online },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({ msg: "Location updated", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ msg: "lat and lng are required" });
  }

  const maxDistance = 0.01; // حدود 1 کیلومتر

  try {
    const providers = await User.find({
      is_online: true,
      lat: { $gte: parseFloat(lat) - maxDistance, $lte: parseFloat(lat) + maxDistance },
      lng: { $gte: parseFloat(lng) - maxDistance, $lte: parseFloat(lng) + maxDistance },
    }).select("_id name lat lng");

    // تبدیل _id به id و ساختار دلخواه
    const formattedProviders = providers.map(p => ({
      id: p._id.toString(),  // اگر می‌خوای رشته باشه، toString کن
      name: p.name,
      lat: p.lat,
      lng: p.lng
    }));

    res.json({ status: "success", providers: formattedProviders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
