const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const CommentValidator = require("../utilities/validations/comment.validation");

const commentRoutes = [
  {
    method: "get",
    path: "/comments",
    validator: CommentValidator.getComments,
    handler: CommentController.getComments,
  },
  {
    method: "get",
    path: "/comments/:id",
    handler: CommentController.getCommentById,
  },
  {
    method: "post",
    path: "/comments",
    validator: CommentValidator.postComment,
    handler: CommentController.createComment,
  },
  {
    path: "/comments/:id",
    method: "put",
    validator: CommentValidator.postComment,
    handler: CommentController.updateComment,
  },
  {
    path: "/comments/:id",
    method: "delete",
    handler: CommentController.deleteComment,
  },
  {
    method: "get",
    path: "/videos/:videoId/comments",
    validator: CommentValidator.getComments,
    handler: CommentController.getCommentsByVideoId,
  },
];

commentRoutes.forEach((route) => {
  const { method, path, validator, handler } = route;
  if (validator) {
    router[method](path, validator, handler);
  } else {
    router[method](path, handler);
  }
});

module.exports = router;
