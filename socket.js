const socketio = require('socket.io');

module.exports = function initializeSocket(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    // User joined
    socket.on('userJoined', (username) => {
      io.emit('userJoined', username);
      console.log(username + ' has joined the lobby');
    });

    // User left
    socket.on('userLeft', (username) => {
      io.emit('userLeft', username);
      console.log(username + ' has left the lobby');
    });

    // User disconnected
    socket.on('disconnect', () => {
      io.emit('userDisconnected', { socketId: socket.id });
      console.log('User with socket ID ' + socket.id + ' has disconnected');
    });
  });
};