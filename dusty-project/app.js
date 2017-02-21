var express = require('express');

// Default imports
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Config file
var config = require('./config');

// Mongoose
var mongoose = require('mongoose');
mongoose.connect(config.database);

// Routers
var users = require('./routes/users');
var things = require('./routes/things');

var app = express();

app.set('secret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// This lets the url-injection happen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
  console.log(req.cookies);
  if (req.cookies.url) {
    res.render('index', {title: req.cookies.url})
  } else {
    res.redirect('/users/login')
  }
});

// Using routers
users.reset();
app.use('/api/users', users.router);
things.reset();
app.use('/api/things', things.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
