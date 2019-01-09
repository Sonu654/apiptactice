var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors')
var dotenv = require('dotenv').config()

var app = express();

// Express Settings
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Addtiion
app.use(cors());
app.options('*', cors());

// File Upload Limits
app.use(bodyParser.json({limit: '128mb'}));
app.use(bodyParser.urlencoded({limit: '128mb', extended: true}));

// Routes Init
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    status: err.status,
    message: err.message
  });
});

module.exports = app;