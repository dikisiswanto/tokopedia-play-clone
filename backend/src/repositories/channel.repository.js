const Channel = require("../models/channel.model");

const getAllChannels = async () => {
  const channels = await Channel.find({});
  const totalChannels = await Channel.countDocuments();
  return { channels, totalChannels };
};

const getChannelById = async (id) => {
  return await Channel.findById(id);
};

const getChannelByUsername = async (username) => {
  const lowercaseUsername = username.toLowerCase();
  return await Channel.findOne({ username: lowercaseUsername });
};

const createChannel = async (channelData) => {
  return await Channel.create(channelData);
};

const updateChannel = async (id, channelData) => {
  return await Channel.findByIdAndUpdate(id, channelData, { new: true });
};

const deleteChannel = async (id) => {
  return await Channel.findByIdAndDelete(id);
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  getChannelByUsername,
  updateChannel,
  deleteChannel,
};
