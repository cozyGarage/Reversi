// app.js

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

// Import route modules
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lobbyRouter = require('./routes/lobby');
const initializeSocket = require('./socket');

// Create an Express application instance
const app = express();

// Create an HTTP server by ourselves
const server = http.createServer(app);

// Set up view engine for rendering templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON data in the request body
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data in the request body
app.use(cookieParser()); // Parse cookies from the request
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Define routes
app.use('/', indexRouter); // Use the 'indexRouter' for requests to the root URL ('/')
app.use('/users', usersRouter); // Use the 'usersRouter' for requests to '/users' URL
app.use('/lobby', lobbyRouter); // Use the 'lobbyRouter' for requests to '/lobby' URL

// Catch 404 errors and forward to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, providing error details in development environment
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports ={app, server};
