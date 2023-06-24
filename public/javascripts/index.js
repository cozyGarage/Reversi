$(document).ready(function() {
  $('#lobbyButton').click(function() {
    var username = $('#nameInput').val();

    if (username === '') {
      alert('Please enter your name');
    } else {
      window.location.href = '/lobby.html?username=' + encodeURIComponent(username);
    }
  });

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
    let username = getIRIParametersValue('username');
    if (typeof username === 'undefined' || username === null) {
      username = 'Anonymous' + Math.floor(Math.random() * 1000);
    }
    socketClient.emit('userJoined', username); // Emit userJoined event
  }

  function announceLeave() {
    let username = getIRIParametersValue('username');
    if (typeof username === 'undefined' || username === null) {
      username = 'Anonymous' + Math.floor(Math.random() * 1000);
    }
    socketClient.emit('userLeft', username); // Emit userLeft event
  }

  let socketClient = io();

  // Handle client connection
  socketClient.on('connect', function() {
    announceJoin(); // Call announceJoin() when the client connects
  });

  // Handle client disconnection
  socketClient.on('disconnect', function() {
    announceLeave(); // Call announceLeave() when the client disconnects
  });
});


