const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const CommentValidator = require("../utilities/validations/comment.validation");

const commentRoutes = [
  {
    method: "get",
    path: "/comments",
    handler: CommentController.getAllComments,
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
