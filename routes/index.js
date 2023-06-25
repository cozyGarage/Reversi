// Import the Express module
const express = require('express');
// Create a new instance of an Express Router
const router = express.Router();

// GET route for the homepage
router.get('/', (req, res) => {
  res.render('index', { title: 'Reversi' });
});

// POST route for handling the login form submission
router.post('/lobby', (req, res) => {
  const username = req.body.username;
  // Redirect the user back to the homepage after successful login
  res.redirect('/');
});

// Export the router
module.exports = router;


