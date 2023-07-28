const CommentController = require('../controllers/comment.controller');
const CommentValidator = require('../utilities/validations/comment.validation');

const routes = [
  {
    method: 'get',
    path: '/comments',
    validator: CommentValidator.getComments,
    handler: CommentController.getComments,
  },
  {
    method: 'get',
    path: '/comments/:id',
    handler: CommentController.getCommentById,
  },
  {
    method: 'post',
    path: '/comments',
    validator: CommentValidator.postComment,
    handler: CommentController.createComment,
  },
  {
    path: '/comments/:id',
    method: 'put',
    validator: CommentValidator.postComment,
    handler: CommentController.updateComment,
  },
  {
    path: '/comments/:id',
    method: 'delete',
    handler: CommentController.deleteComment,
  },
  {
    method: 'get',
    path: '/videos/:videoId/comments',
    validator: CommentValidator.getComments,
    handler: CommentController.getCommentsByVideoId,
  },
];

module.exports = routes;
