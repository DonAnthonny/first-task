const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  lat: Number,
  lng: Number,
  is_online: Boolean
});

module.exports = mongoose.model("User", userSchema);
