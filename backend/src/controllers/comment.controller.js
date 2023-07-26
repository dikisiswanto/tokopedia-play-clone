const CommentService = require("../services/comment.service");

const getAllComments = async (req, res) => {
  try {
    const comments = await CommentService.getAllComments();
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await CommentService.getCommentById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const createComment = async (req, res) => {
  const commentData = req.body;

  try {
    const createdComment = await CommentService.createComment(commentData);
    res.status(201).json({ success: true, data: createdComment });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
};
