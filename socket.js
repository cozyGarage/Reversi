// socket.js

const socketio = require('socket.io');

module.exports = function(server) {
  const io = socketio(server);

    // Socket.io event handling
    io.on('connection', (socket) => {
    // User connected
    io.emit('userConnected', { socketId: socket.id });
  
    // User disconnected
    socket.on('disconnect', () => {
      io.emit('userDisconnected', { socketId: socket.id });
    });
  });
};
