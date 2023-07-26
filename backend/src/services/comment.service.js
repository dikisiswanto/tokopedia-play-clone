const CommentRepository = require("../repositories/comment.repository");

const getComments = async ({
  videoId = null,
  page = 1,
  limit = 10,
  beforeCommentId,
} = {}) => {
  let comments;

  if (beforeCommentId) {
    comments = await CommentRepository.getCommentsBefore(
      videoId,
      beforeCommentId,
      limit
    );
  } else {
    comments = await CommentRepository.getComments(videoId, page, limit);
  }

  return comments;
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
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
