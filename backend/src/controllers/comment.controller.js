const CommentService = require("../services/comment.service");
const VideoService = require("../services/video.service");
const { validationResult } = require("express-validator");
const {
  handleServerError,
  handleResponse,
  handleClientError,
} = require("../utilities/responseHandler");

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

    handleResponse(res, 200, "Data retrieved successfully", comments);
  } catch (error) {
    handleServerError(res, error);
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
      return handleClientError(res, 404, "Video not found");
    }

    const comments = await CommentService.getComments({
      videoId,
      limit,
      page,
      beforeCommentId,
    });

    handleResponse(res, 200, "Data retrieved successfully", comments);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await CommentService.getCommentById(commentId);

    if (!comment) {
      return handleClientError(res, 404, "Comment not found");
    }

    handleResponse(res, 200, "Data retrieved successfully", comment);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const commentData = req.body;

  try {
    const video = VideoService.getVideoById(commentData.videoId);

    if (!video) {
      return handleClientError(res, 404, "Video not found");
    }

    const createdComment = await CommentService.createComment(commentData);

    handleResponse(res, 201, "Data created successfully", createdComment);
  } catch (error) {
    handleServerError(res, error);
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
    const updatedComment = await Comment.updateComment(commentId, commentData);

    if (!updatedComment) {
      return handleClientError(res, 404, "Comment not found");
    }

    handleResponse(res, 200, "Data updated successfully", updatedComment);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedcomment = await CommentService.deleteComment(commentId);

    if (!deletedcomment) {
      return handleClientError(res, 404, "Comment not found");
    }

    handleResponse(res, 202, "Data deleted successfully", deletedcomment);
  } catch (error) {
    handleServerError(res, error);
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
