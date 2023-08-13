const socketIo = require('socket.io');

let ioServer;

const setupSocket = (server) => {
  try {
    const io = socketIo(server, {
      cors: {
        origin: '*',
        method: ['GET', 'POST'],
      },
    });

    ioServer = io.of('/socket');

    ioServer.on('connection', (socket) => {
      socket.on('comment', ({ videoId, ...comment }) => {
        ioServer.to(videoId).emit('comment', { videoId, ...comment });
      });

      socket.on('joinRoom', (videoId) => {
        socket.join(videoId);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    });
  } catch (error) {
    console.error('Error setting up Socket.IO:', error.message);
  }
};

const getIoServer = () => ioServer;

module.exports = { setupSocket, getIoServer };
