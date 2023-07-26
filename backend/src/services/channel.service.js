const ChannelRepository = require('../repositories/channel.repository');

const createChannel = async (channelData) => {
  return await ChannelRepository.createChannel(channelData);
};

const getAllChannels = async () => {
  return await ChannelRepository.getAllChannels();
};

const checkUsernameService = async (username) => {
  try {
    const channel = await ChannelRepository.getChannelByUsername(username);
    return channel !== null;
  } catch (error) {
    console.error('Error checking username existence:', error.message);
    return false;
  }
}

const getChannelById = async (id) => {
  return await ChannelRepository.getChannelById(id);
};

const updateChannel = async (id, channelData) => {
  return await ChannelRepository.updateChannel(id, channelData);
};

const deleteChannel = async (id) => {
  return await ChannelRepository.deleteChannel(id);
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  checkUsernameService,
  updateChannel,
  deleteChannel,
};
