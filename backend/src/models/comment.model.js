const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    fullname: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
