const { checkSchema } = require('express-validator');

const getVideos = checkSchema({
  query: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Query parameter must be a string',
    },
  },
  sort_by: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Sort field must be a string',
    },
    isIn: {
      options: [['views', 'likes', 'title']],
      errorMessage: "Sort field must be 'views', 'likes,' or 'title'",
    },
  },
  sort_order: {
    optional: true,
    trim: true,
    isIn: {
      options: [['asc', 'desc']],
      errorMessage: "Sort order must be either 'asc' or 'desc'",
    },
  },
  page: {
    optional: true,
    trim: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'Page number must be a positive integer',
    },
  },
  limit: {
    optional: true,
    trim: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'Limit value must be a positive integer',
    },
  },
});

const postVideo = checkSchema({
  title: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Title is required',
    },
  },
  description: {
    in: ['body'],
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Sort field must be a string',
    },
  },
  url: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'URL is required',
    },
    isURL: {
      errorMessage: 'Invalid URL format',
    },
  },
  thumbnail: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Thumbnail is required',
    },
    isURL: {
      errorMessage: 'Invalid thumbnail URL format',
    },
  },
  channelId: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Channel ID is required',
    },
    isMongoId: {
      errorMessage: 'Invalid channelId format. Please provide a valid MongoDB ObjectId.',
    },
  },
});

module.exports = {
  getVideos,
  postVideo,
};
