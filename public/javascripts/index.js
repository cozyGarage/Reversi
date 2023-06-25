$(document).ready(function () {
  $('#lobbyButton').click(function () {
    var username = encodeURI($('#nameInput').val());

    if (username === '') {
      alert('Please enter your name');
    } else {
      window.location.href = '/lobby.html?username=' + username;
    }
  });
});