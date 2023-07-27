const Channel = require('../models/channel.model');

const getChannels = async () => {
  const channels = await Channel.find({});
  const totalChannels = await Channel.countDocuments();
  return { channels, totalChannels };
};

const getChannelById = async (id) => await Channel.findById(id);

const getChannelByUsername = async (username) => {
  const lowercaseUsername = username.toLowerCase();
  return await Channel.findOne({ username: lowercaseUsername });
};

const createChannel = async (channelData) => await Channel.create(channelData);

const updateChannel = async (id, channelData) =>
  await Channel.findByIdAndUpdate(id, channelData, { new: true });

const deleteChannel = async (id) => await Channel.findByIdAndDelete(id);

module.exports = {
  createChannel,
  getChannels,
  getChannelById,
  getChannelByUsername,
  updateChannel,
  deleteChannel,
};
