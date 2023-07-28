const { validationResult } = require('express-validator');
const CommentService = require('../services/comment.service');
const AvatarService = require('../services/avatar.service');
const VideoService = require('../services/video.service');
const {
  handleServerError,
  handleResponse,
  handleClientError,
} = require('../utilities/responseHandler');

const getComments = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const { limit, page, before: beforeCommentId } = req.query;

  try {
    const comments = await CommentService.getComments({
      limit,
      page,
      beforeCommentId,
    });

    return handleResponse(res, 200, 'Data retrieved successfully', comments);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const getCommentsByVideoId = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const { videoId } = req.params;
  const { limit, page, before: beforeCommentId } = req.query;

  try {
    const video = await VideoService.getVideoById(videoId);

    if (!video) {
      return handleClientError(res, 404, "videoId you provide doesn't match any record");
    }

    const comments = await CommentService.getComments({
      videoId,
      limit,
      page,
      beforeCommentId,
    });

    return handleResponse(res, 200, 'Data retrieved successfully', comments);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await CommentService.getCommentById(commentId);

    if (!comment) {
      return handleClientError(res, 404, 'Comment not found');
    }

    return handleResponse(res, 200, 'Data retrieved successfully', comment);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const createComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const commentData = req.body;

  try {
    const video = await VideoService.getVideoById(commentData.videoId);

    if (!video) {
      return handleClientError(res, 404, "videoId you provide doesn't match any record");
    }

    if (!commentData.avatar) {
      commentData.avatar = AvatarService.generateAvatar(commentData.username);
    }

    const createdComment = await CommentService.createComment(commentData);

    CommentService.setUserSession(res, commentData);

    return handleResponse(res, 201, 'Data created successfully', createdComment);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const updateComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const commentId = req.params.id;
  const commentData = req.body;

  try {
    const video = await VideoService.getVideoById(commentData.videoId);

    if (!video) {
      return handleClientError(res, 404, "videoId you provide doesn't match any record");
    }

    const updatedComment = await CommentService.updateComment(commentId, commentData);

    if (!updatedComment) {
      return handleClientError(res, 404, 'Comment not found');
    }

    return handleResponse(res, 200, 'Data updated successfully', updatedComment);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedcomment = await CommentService.deleteComment(commentId);

    if (!deletedcomment) {
      return handleClientError(res, 404, 'Comment not found');
    }

    return handleResponse(res, 202, 'Data deleted successfully', deletedcomment);
  } catch (error) {
    return handleServerError(res, error);
  }
};

module.exports = {
  getComments,
  getCommentsByVideoId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
