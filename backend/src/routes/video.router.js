const express = require("express");
const router = express.Router();
const VideoController = require("../controllers/video.controller");
const VideoValidator = require("../utilities/validations/video.validation");

const videoRoutes = [
  {
    method: "get",
    path: "/videos",
    validator: VideoValidator.getVideos,
    handler: VideoController.getVideos,
  },
  {
    method: "get",
    path: "/videos/:id",
    handler: VideoController.getVideoById,
  },
  {
    method: "get",
    path: "/videos/:id/play",
    handler: VideoController.playVideo,
  },
  {
    method: "get",
    path: "/videos/:id/like",
    handler: VideoController.likeVideo,
  },
  {
    method: "post",
    path: "/videos",
    validator: VideoValidator.postVideo,
    handler: VideoController.createVideo,
  },
  {
    method: "put",
    path: "/videos/:id",
    validator: VideoValidator.postVideo,
    handler: VideoController.updateVideo,
  },
  {
    method: "delete",
    path: "/videos/:id",
    handler: VideoController.deleteVideo,
  },
  {
    method: "get",
    path: "/channels/:channelId/videos",
    handler: VideoController.getVideosByChannelId,
  },
];

videoRoutes.forEach((route) => {
  const { method, path, validator, handler } = route;
  if (validator) {
    router[method](path, validator, handler);
  } else {
    router[method](path, handler);
  }
});

module.exports = router;
