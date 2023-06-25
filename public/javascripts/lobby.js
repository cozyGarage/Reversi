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

function announceJoinOrLeave(joinOrLeave) {
  if (typeof username === 'undefined' || username === null) {
    username = 'Anonymous' + Math.floor(Math.random() * 1000);
  }
  const event = joinOrLeave ? 'userJoined' : 'userLeft';
  const message = joinOrLeave ? 'has joined the lobby' : 'has left the lobby';
  socketClient.emit(event, username); // Emit userJoined or userLeft event

  // Display a message
  const listItem = $('<p>').text(username + ' ' + message);
  $('#messages').prepend(listItem);
}

// Handle client connection
socketClient.on('connect', function () {
  console.log('Client connected');
  announceJoinOrLeave(true); // Call announceJoinOrLeave with true when the client connects
});

// Handle client disconnection
socketClient.on('disconnect', function () {
  console.log('Client disconnected');
  announceJoinOrLeave(false); // Call announceJoinOrLeave with false when the client disconnects
});

// Request to join the chat room
$(() => {
  const request = { username: username, room: chatRoom };
  socketClient.emit('join_room', request);
});
