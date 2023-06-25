const socketClient = io();
const username = decodeURI(getIRIParametersValue('username'));
const chatRoom = 'lobby';

function getIRIParametersValue(requestedKey) {
  let pageIRI = window.location.search.substring(1);
  let pageIRIParameters = pageIRI.split('&');
  for (let i = 0; i < pageIRIParameters.length; i++) {
    let currentKey = pageIRIParameters[i].split('=');
    if (currentKey[0] === requestedKey) {
      return currentKey[1];
    }
  }
}
function announceJoin() {
  if (typeof username === 'undefined' || username === null) {
    username = 'Anonymous' + Math.floor(Math.random() * 1000);
  }
  socketClient.emit('userJoined', username); // Emit userJoined event
}

function announceLeave() {
  if (typeof username === 'undefined' || username === null) {
    username = 'Anonymous' + Math.floor(Math.random() * 1000);
  }
  socketClient.emit('userLeft', username); // Emit userLeft event
}
// Handle client connection
socketClient.on('connect', function () {
  announceJoin(); // Call announceJoin() when the client connects
});

// Handle client disconnection
socketClient.on('disconnect', function () {
  announceLeave(); // Call announceLeave() when the client disconnects
});

//request to join the chat room
$(( ) => {
    const request = { username: username, room: chatRoom };
    request.room = chatRoom;
    request.username = username;
    console.log(' **** request to join \'join_room\' command: '+JSON.stringify(request));
    socketClient.emit('join_room', request);
});