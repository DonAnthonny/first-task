const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  is_online: {
    type: Boolean,
    default: false
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Provider", providerSchema);
