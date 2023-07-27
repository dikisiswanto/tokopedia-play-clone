const CommentRepository = require('../repositories/comment.repository');

const getComments = async ({ videoId = null, page = 1, limit = 10, beforeCommentId } = {}) => {
  let comments;

  if (beforeCommentId) {
    comments = await CommentRepository.getCommentsBefore(beforeCommentId, videoId, limit);
  } else {
    comments = await CommentRepository.getComments(videoId, page, limit);
  }

  return comments;
};

const getCommentById = async (id) => await CommentRepository.getCommentById(id);

const createComment = async (commentData) => await CommentRepository.createComment(commentData);

const updateComment = async (id, commentData) =>
  await CommentRepository.updateComment(id, commentData);

const deleteComment = async (id) => await CommentRepository.deleteComment(id);

const setCookies = (res, cookies) => {
  const maxAgeInMilliseconds = 1000 * 60 * 60 * 24 * 365 * 10;

  Object.entries(cookies).forEach(([name, value]) => {
    res.cookie(name, value, {
      maxAge: maxAgeInMilliseconds,
      httpOnly: true,
      path: '/',
    });
  });
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  setCookies,
};
