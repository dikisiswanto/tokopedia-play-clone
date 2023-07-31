const CommentController = require('../controllers/comment.controller');
const CommentValidator = require('../utilities/validations/comment.validation');

const routes = [
  {
    method: 'get',
    path: '/comments',
    isPrivate: false,
    validator: CommentValidator.getComments,
    handler: CommentController.getComments,
  },
  {
    method: 'get',
    path: '/comments/:id',
    isPrivate: false,
    handler: CommentController.getCommentById,
  },
  {
    method: 'post',
    path: '/comments',
    isPrivate: false,
    validator: CommentValidator.postComment,
    handler: CommentController.createComment,
  },
  {
    method: 'put',
    path: '/comments/:id',
    isPrivate: true,
    validator: CommentValidator.postComment,
    handler: CommentController.updateComment,
  },
  {
    method: 'delete',
    path: '/comments/:id',
    isPrivate: true,
    handler: CommentController.deleteComment,
  },
  {
    method: 'get',
    path: '/videos/:videoId/comments',
    isPrivate: false,
    validator: CommentValidator.getComments,
    handler: CommentController.getCommentsByVideoId,
  },
];

module.exports = routes;
