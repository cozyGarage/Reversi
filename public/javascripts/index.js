$(document).ready(function() {
    $('#lobbyButton').click(function() {
      var username = $('#nameInput').val();

      if (username === '') {
        alert('Please enter your name');
      } else {
        window.location.href = '/lobby?username=' + encodeURIComponent(username);
      }
    });
  });