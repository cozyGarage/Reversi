const socketio = require('socket.io');

module.exports = function initializeSocket(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    // User joined
    socket.on('userJoined', (username) => {
      const decodedUsername = decodeURIComponent(username);
      io.emit('userJoined', decodedUsername);
      serverLog(decodedUsername + ' has joined the lobby');
    });

    // User left
    socket.on('userLeft', (username) => {
      io.emit('userLeft', username);
      serverLog(username + ' has left the lobby');
    });

    // User disconnected
    socket.on('disconnect', () => {
      const socketId = socket.id;
      io.emit('userDisconnected', { socketId });
      serverLog('User with socket ID ' + socketId + ' has disconnected');
    });
  });

  function serverLog(message) {
    console.log(message);
  }
};

