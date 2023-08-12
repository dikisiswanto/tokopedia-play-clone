const socketIo = require('socket.io');

let ioServer;

const setupSocket = (server) => {
  try {
    const io = socketIo(server, {
      pingInterval: 10000, // Send a ping every 10 seconds
      pingTimeout: 5000, // Disconnect if no response in 5 seconds
      cors: {
        origin: '*',
        method: ['GET', 'POST'],
      },
    });

    ioServer = io.of('/socket');

    ioServer.on('connection', (socket) => {
      socket.on('comment', (comment) => {
        ioServer.emit('comment', comment);
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
