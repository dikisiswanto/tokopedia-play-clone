const CommentRepository = require('../repositories/comment.repository');
const { setCookies } = require('../utilities/helper');

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

const setUserSession = (res, commentData) => {
  const { fullname, username, avatar } = commentData;
  const userSession = { fullname, username, avatar };

  setCookies(res, userSession);
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  setUserSession,
};
