const express = require('express');
const router = module.exports = express.Router();

router.get('/lobby', (req, res) => {
  const username = req.query.username;

  // Register the username and add to the waiting list in the lobby
  // Your code to handle the registration logic goes here

  res.send(`Registered ${username} in the lobby`);
  res.render('lobby', { title: '${username}' });
});

