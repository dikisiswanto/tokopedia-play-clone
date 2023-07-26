const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
