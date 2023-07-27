const VideoRepository = require('../repositories/video.repository');

const getVideos = async (query, sort, page, limit) =>
  await VideoRepository.getVideos(query, sort, page, limit);

const getVideoById = async (id) => await VideoRepository.getVideoById(id);

const getVideosByChannelId = async (channelId) =>
  await VideoRepository.getVideosByChannelId(channelId);

const createVideo = async (videoData) => await VideoRepository.createVideo(videoData);

const updateVideo = async (id, videoData) => await VideoRepository.updateVideo(id, videoData);

const deleteVideo = async (id) => await VideoRepository.deleteVideo(id);

const likeVideo = async (id, userIpAddress) => await VideoRepository.addUserLike(id, userIpAddress);

const updateViews = async (id) => await VideoRepository.updateVideoViews(id);

const getUserLikesCount = async (id) => await VideoRepository.getUserLikesCount(id);

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
