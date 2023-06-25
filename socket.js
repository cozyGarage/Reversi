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

    // Join room
    socket.on('join_room', (request) => {
      serverLog('Server received request to \'join room\' ' + JSON.stringify(request));
      if (typeof request === 'undefined' || request === null) {
        response = {
          result: 'error',
          message: 'client request is undefined or null'
        };
        socket.emit('join_room_response', response);
        serverLog('join_room command failed: ' + JSON.stringify(response));
        return;
      }

      let room = request.room;
      let username = request.username;

      if (typeof room === 'undefined' || room === null) {
        response = {
          result: 'error',
          message: 'request.room is undefined or null'
        };
        socket.emit('join_room_response', response);
        serverLog('join_room command failed: ' + JSON.stringify(response));
        return;
      }

      if (typeof username === 'undefined' || username === null) {
        response = {
          result: 'error',
          message: 'request.username is undefined or null'
        };
        socket.emit('join_room_response', response);
        serverLog('join_room command failed: ' + JSON.stringify(response));
        return;
      }

      socket.join(room);

      io.in(room).fetchSockets().then((sockets) => {
        serverLog('Room ' + room + ' now has ' + sockets.length + ' client(s)');
        
        // If socket didn't join the room
        if (typeof sockets === 'undefined' || sockets === null || !sockets.includes(socket)) {
          response = {
            result: 'error',
            message: 'server internal in ' + room
          };
          socket.emit('join_room_response', response);
          serverLog('join_room command failed: ' + JSON.stringify(response));
        } else {
          response = {
            result: 'success',
            room: room,
            username: username,
            count: sockets.length,
            message: 'joined room ' + room
          };
          
          // Tell everyone in the room that someone joined
          io.of('/').to(room).emit('join_room_response', response);
          serverLog('join_room command succeeded: ' + JSON.stringify(response));
        }
      });
    });

    function serverLog(message) {
      console.log(message);
    }
  });
};
