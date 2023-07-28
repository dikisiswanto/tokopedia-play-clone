const ChannelController = require('../controllers/channel.controller');
const ChannelValidator = require('../utilities/validations/channel.validation');

const routes = [
  {
    path: '/channels',
    method: 'get',
    handler: ChannelController.getChannels,
  },
  {
    path: '/channels/:id',
    method: 'get',
    handler: ChannelController.getChannelById,
  },
  {
    path: '/channels',
    method: 'post',
    validator: ChannelValidator.postChannel,
    handler: ChannelController.createChannel,
  },
  {
    path: '/channels/:id',
    method: 'put',
    validator: ChannelValidator.postChannel,
    handler: ChannelController.updateChannel,
  },
  {
    path: '/channels/:id',
    method: 'delete',
    handler: ChannelController.deleteChannel,
  },
];

module.exports = routes;
