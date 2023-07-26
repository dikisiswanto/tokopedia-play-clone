const { checkSchema } = require("express-validator");

const postProduct = checkSchema({
  url: {
    in: ["body"],
    trim: true,
    isURL: {
      errorMessage: "Invalid URL format. Please provide a valid URL.",
    },
    notEmpty: {
      errorMessage: "URL is required.",
    },
  },
  photos: {
    in: ["body"],
    trim: true,
    isArray: {
      errorMessage: "Photos must be provided as an array.",
    },
    notEmpty: {
      errorMessage: "Photos array cannot be empty.",
    },
    custom: {
      options: (value) => value.every((photo) => typeof photo === "string"),
      errorMessage: "Photos array must contain only strings (URLs).",
    },
  },
  title: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Title is required.",
    },
  },
  price: {
    in: ["body"],
    trim: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price must be a positive number.",
    },
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
  postProduct,
};
