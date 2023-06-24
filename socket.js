const socketio = require('socket.io');

module.exports = function initializeSocket(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    // User connected
    io.emit('userConnected', { socketId: socket.id });

    // User joined
    socket.on('userJoined', (username) => {
      io.emit('userJoined', username);
    });

    // User left
    socket.on('userLeft', (username) => {
      io.emit('userLeft', username);
    });

    // User disconnected
    socket.on('disconnect', () => {
      io.emit('userDisconnected', { socketId: socket.id });
    });
  });
};