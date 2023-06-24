// Set up web socket server
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    function serverLog(...messages) {
     io.emit('log', ['**** \t'+ item]);
     console.log(item) ;

    }
});

serverLog('A user connected'+ socket.id);

socket.on('disconnect', () => {
    serverLog('A user disconnected'+ socket.id);
});