const { validationResult } = require('express-validator');
const ChannelService = require('../services/channel.service');
const AvatarService = require('../services/avatar.service');
const {
  handleClientError,
  handleServerError,
  handleResponse,
} = require('../utilities/responseHandler');

const getChannels = async (req, res) => {
  try {
    const channels = await ChannelService.getChannels();

    return handleResponse(res, 200, 'Data retrieved successfully', channels);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const getChannelById = async (req, res) => {
  const channelId = req.params.id;

  try {
    const channel = await ChannelService.getChannelById(channelId);

    if (!channel) {
      return handleClientError(res, 404, 'Channel not found');
    }

    return handleResponse(res, 200, 'Data retrieved successfully', channel);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const createChannel = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const channelData = req.body;

  try {
    if (!channelData.avatar) {
      channelData.avatar = AvatarService.generateAvatar(channelData.username);
    }

    const isUsernameExist = await ChannelService.checkUsernameExist(channelData.username);

    if (isUsernameExist) {
      return handleClientError(
        res,
        400,
        'The username you provided is already in use. Please choose a different username',
      );
    }

    const createdChannel = await ChannelService.createChannel(channelData);

    return handleResponse(res, 201, 'Data created successfully', createdChannel);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const updateChannel = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const channelId = req.params.id;
  const channelData = req.body;

  try {
    const updatedChannel = await ChannelService.updateChannel(channelId, channelData);

    if (!updatedChannel) {
      return handleClientError(res, 404, 'Channel not found');
    }

    return handleResponse(res, 200, 'Data updated successfully', updatedChannel);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const deleteChannel = async (req, res) => {
  const channelId = req.params.id;

  try {
    const deletedChannel = await ChannelService.deleteChannel(channelId);

    if (!deletedChannel) {
      return handleClientError(res, 404, 'Channel not found');
    }

    return handleResponse(res, 202, 'Data deleted successfully', deletedChannel);
  } catch (error) {
    return handleServerError(res, error);
  }
};

module.exports = {
  createChannel,
  getChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
};
