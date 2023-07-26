const { checkSchema } = require("express-validator");

const postChannel = checkSchema({
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required.",
    },
  },
  username: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Username is required.",
    },
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage:
        "Username can only contain alphanumeric characters and underscores.",
    },
  },
  avatar: {
    in: ["body"],
    optional: true,
    isURL: {
      errorMessage: "Invalid avatar URL format",
    },
  },
});

module.exports = {
  postChannel,
};
