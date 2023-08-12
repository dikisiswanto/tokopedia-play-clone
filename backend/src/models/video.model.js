const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    url: { type: String, required: true, trim: true },
    views: { type: Number, default: 0 },
    likes: { type: Array, required: true },
    thumbnail: { type: String, required: true, trim: true },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
