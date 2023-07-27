const ChannelRepository = require('../repositories/channel.repository');

const getChannels = async () => await ChannelRepository.getChannels();

const getChannelById = async (id) => await ChannelRepository.getChannelById(id);

const createChannel = async (channelData) => await ChannelRepository.createChannel(channelData);

const updateChannel = async (id, channelData) =>
  await ChannelRepository.updateChannel(id, channelData);

const deleteChannel = async (id) => await ChannelRepository.deleteChannel(id);

const checkUsernameExist = async (username) => {
  try {
    const channel = await ChannelRepository.getChannelByUsername(username);
    return channel !== null;
  } catch (error) {
    console.error('Error checking username existence:', error.message);
    return false;
  }
};

module.exports = {
  getChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
  checkUsernameExist,
};
