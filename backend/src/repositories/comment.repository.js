const Comment = require("../models/comment.model");

const getComments = async (videoId = null, page = 0, limit = 10) => {
  const filter = videoId ? { videoId } : {};
  const skip = page && limit ? (page - 1) * limit : page;

  const comments = await Comment.find(filter)
    .populate("videoId")
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalComments = await Comment.countDocuments();

  return { comments, totalComments };
};

const getCommentsBefore = async (videoId = null, lastCommentId, limit = 10) => {
  const filter = { _id: { $lt: lastCommentId } };

  if (videoId) {
    filter["videoId"] = videoId;
  }

  const comments = await Comment.find(filter)
    .populate("videoId")
    .sort({ _id: -1 })
    .limit(limit)
    .lean();

  const totalComments = await Comment.countDocuments({ videoId });

  return { comments, totalComments };
};

const getCommentById = async (id) => {
  return await Comment.findById(id).populate("videoId");
};

const createComment = async (commentData) => {
  return await Comment.create(commentData);
};

const updateComment = async (id, commentData) => {
  return await Comment.findByIdAndUpdate(id, commentData, { new: true });
};

const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

module.exports = {
  getComments,
  getCommentsBefore,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
