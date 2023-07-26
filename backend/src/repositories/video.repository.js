const Video = require("../models/video.model");

const getVideos = async (query, sort, page = 0, limit = 0) => {
  const { field = "createdAt", order = "desc" } = sort;
  const filter = {};
  const sortQuery = {};

  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }

  if (field) {
    sortQuery[field] = order === "desc" ? -1 : 1;
  }

  const skip = page && limit ? (page - 1) * limit : page;

  const videos = await Video.find(filter)
    .populate("channelId")
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .exec();

  const totalVideos = await Video.countDocuments(filter);

  return { videos, totalVideos, sort: { field, order }, page, limit, query };
};

const getUserLikesCount = async (id) => {
  const video = await Video.findById(id);
  return video.likes.length;
};

const getVideoById = async (id) => {
  const video = await Video.findById(id).populate("channelId").exec();
  if (!video) {
    return video;
  }
  const totalLikes = await getUserLikesCount(id);
  return { video, totalLikes };
};

const getVideosByChannelId = async (channelId) => {
  const videos = await Video.find({ channelId });
  const totalVideos = await Video.countDocuments({ channelId });
  return { videos, totalVideos, filter: { channelId } };
};

const createVideo = async (videoData) => {
  return await Video.create(videoData).populate("channelId").exec();
};

const updateVideo = async (id, videoData) => {
  return await Video.findByIdAndUpdate(id, videoData, { new: true });
};

const deleteVideo = async (id) => {
  return await Video.findByIdAndDelete(id);
};

const addUserLike = async (id, userIpAddress) => {
  return await Video.findByIdAndUpdate(
    id,
    { $push: { likes: userIpAddress } },
    { new: true }
  )
    .populate("channelId")
    .exec();
};

const updateVideoViews = async (id) => {
  return await Video.findByIdAndUpdate(id, { $inc: { views: 1 } })
    .populate("channelId")
    .exec();
};

module.exports = {
  getVideos,
  getVideoById,
  getVideosByChannelId,
  createVideo,
  updateVideo,
  deleteVideo,
  addUserLike,
  updateVideoViews,
  getUserLikesCount,
};
