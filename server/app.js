// Import required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
const socketio = require("socket.io");
const app = express();

// Import route modules
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

// Create the http server
const server = http.createServer(app);

// Create the Socket IO server on
// the top of http server
const io = socketio(server);

// Set up view engine for rendering templates
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON data in the request body
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data in the request body
app.use(cookieParser()); // Parse cookies from the request
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the 'public' directory

// Define routes
app.use('/', indexRouter); // Use the 'indexRouter' for requests to the root URL ('/')
app.use('/users', usersRouter); // Use the 'usersRouter' for requests to '/users' URL

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

module.exports = { app: app, server: server };