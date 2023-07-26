const VideoService = require("../services/video.service");
const ChannelService = require("../services/channel.service");
const { validationResult } = require("express-validator");
const {
  handleServerError,
  handleResponse,
  handleClientError,
} = require("../utilities/responseHandler");

const getAllVideos = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const { query, sort_by, sort_order, page, limit } = req.query;

  if (page) {
    req.query.page = parseInt(page, 10);
    req.query.limit = limit ? parseInt(limit, 10) : 10;
  } else {
    req.query.page = 0;
    req.query.limit = 0;
  }

  const sort = { field: sort_by, order: sort_order };

  try {
    const videos = await VideoService.getAllVideos(
      query,
      sort,
      req.query.page,
      req.query.limit
    );

    handleResponse(res, 200, "Data retrieved successfully", videos);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getVideoById = async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await VideoService.getVideoById(videoId);

    if (!video) {
      return handleClientError(res, 404, "Video not found");
    }

    handleResponse(res, 200, "Data retrieved successfully", video);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getVideosByChannelId = async (req, res) => {
  const channelId = req.params.channelId;

  try {
    const channel = await ChannelService.getChannelById(channelId);

    if (!channel) {
      return handleClientError(res, 404, "Channel not found");
    }

    const videos = await VideoService.getVideosByChannelId(channelId);

    handleResponse(res, 200, "Data retrieved successfully", videos);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createVideo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const videoData = req.body;

  try {
    const createdVideo = await VideoService.createVideo(videoData);
    handleResponse(res, 201, "Data created successfully", createdVideo);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateVideo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const videoId = req.params.id;
  const videoData = req.body;

  try {
    const updatedVideo = await VideoService.updateVideo(videoId, videoData);

    if (!updatedVideo) {
      return handleClientError(res, 404, "Video not found");
    }

    handleResponse(res, 200, "Data updated successfully", updatedVideo);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteVideo = async (req, res) => {
  const videoId = req.params.id;

  try {
    const deletedVideo = await VideoService.deleteVideo(videoId);

    if (!deletedVideo) {
      return handleClientError(res, 404, "Video not found");
    }

    handleResponse(res, 202, "Data deleted successfully", deletedVideo);
  } catch (error) {
    handleServerError(res, error);
  }
};

const playVideo = async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await VideoService.getVideoById(videoId);
    if (!video) {
      return handleClientError(res, 404, "Video not found");
    }

    await VideoService.updateViews(videoId);
    handleResponse(res, 200, "Now playing the video", video);
  } catch (error) {
    handleServerError(res, error);
  }
};

const likeVideo = async (req, res) => {
  const videoId = req.params.id;
  const userIpAddress = req.ip;
  const userLikesCookie = req.headers.cookie;

  try {
    let video = await VideoService.getVideoById(videoId);

    if (!video) {
      return handleClientError(res, 404, "Video not found");
    }

    if (video.likes.includes(userIpAddress)) {
      return handleClientError(res, 409, "You have already liked this video");
    }

    if (userLikesCookie && userLikesCookie.includes(`video_likes_${videoId}`)) {
      return handleClientError(res, 409, "You have already liked this video");
    }

    res.cookie(`video_likes_${videoId}`, true, {
      maxAge: undefined, // Cookie never expires
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });

    video = await VideoService.likeVideo(videoId, userIpAddress);

    handleResponse(res, 200, "Video liked successfully!", video);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  getVideosByChannelId,
  createVideo,
  updateVideo,
  deleteVideo,
  playVideo,
  likeVideo,
};
