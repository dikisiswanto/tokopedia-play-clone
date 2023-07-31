const ChannelController = require('../controllers/channel.controller');
const ChannelValidator = require('../utilities/validations/channel.validation');

const routes = [
  {
    method: 'get',
    path: '/channels',
    isPrivate: false,
    handler: ChannelController.getChannels,
  },
  {
    method: 'get',
    path: '/channels/:id',
    isPrivate: false,
    handler: ChannelController.getChannelById,
  },
  {
    method: 'post',
    path: '/channels',
    isPrivate: true,
    validator: ChannelValidator.postChannel,
    handler: ChannelController.createChannel,
  },
  {
    method: 'put',
    path: '/channels/:id',
    isPrivate: true,
    validator: ChannelValidator.postChannel,
    handler: ChannelController.updateChannel,
  },
  {
    method: 'delete',
    path: '/channels/:id',
    isPrivate: true,
    handler: ChannelController.deleteChannel,
  },
];

module.exports = routes;
