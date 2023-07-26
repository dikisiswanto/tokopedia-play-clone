const VideoRepository = require("../repositories/video.repository");

const getVideos = async (query, sort, page, limit) => {
  return await VideoRepository.getVideos(query, sort, page, limit);
};

const getVideoById = async (id) => {
  return await VideoRepository.getVideoById(id);
};

const getVideosByChannelId = async (channelId) => {
  return await VideoRepository.getVideosByChannelId(channelId);
};

const createVideo = async (videoData) => {
  return await VideoRepository.createVideo(videoData);
};

const updateVideo = async (id, videoData) => {
  return await VideoRepository.updateVideo(id, videoData);
};

const deleteVideo = async (id) => {
  return await VideoRepository.deleteVideo(id);
};

const likeVideo = async (id, userIpAddress) => {
  return await VideoRepository.addUserLike(id, userIpAddress);
};

const updateViews = async (id) => {
  return await VideoRepository.updateVideoViews(id);
};

const getUserLikesCount = async (id) => {
  return await VideoRepository.getUserLikesCount(id);
};

module.exports = {
  getVideos,
  getVideoById,
  getVideosByChannelId,
  getUserLikesCount,
  createVideo,
  updateVideo,
  updateViews,
  deleteVideo,
  likeVideo,
};
