const { checkSchema } = require("express-validator");

const postComment = checkSchema({
  username: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Username is required.",
    },
    trim: true,
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage:
        "Username can only contain alphanumeric characters and underscores.",
    },
  },
  fullname: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Fullname is required.",
    },
    trim: true,
  },
  avatar: {
    in: ["body"],
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "Invalid avatar URL format. Please provide a valid URL.",
    },
  },
  comment: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Comment is required.",
    },
    trim: true,
  },
  videoId: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "videoId is required.",
    },
    isMongoId: {
      errorMessage:
        "Invalid videoId format. Please provide a valid MongoDB ObjectId.",
    },
  },
});

module.exports = {
  postComment,
};
