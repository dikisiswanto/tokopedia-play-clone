const CommentRepository = require("../repositories/comment.repository");

const getAllComments = async () => {
  return await CommentRepository.getAllComments();
};

const getCommentById = async (id) => {
  return await CommentRepository.getCommentById(id);
};

const createComment = async (commentData) => {
  return await CommentRepository.createComment(commentData);
};

const updateComment = async (id, commentData) => {
  return await CommentRepository.updateComment(id, commentData);
};

const deleteComment = async (id) => {
  return await CommentRepository.deleteComment(id);
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
