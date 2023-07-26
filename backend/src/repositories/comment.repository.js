const Comment = require('../models/comment.model');

const getAllComments = async () => {
  return await Comment.find({}).populate('videoId');
};

const getCommentById = async (id) => {
  return await Comment.findById(id).populate('videoId');
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
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
