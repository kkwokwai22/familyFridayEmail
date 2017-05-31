var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var ejs = require('ejs');


var home = require('./routes/home');
var index = require('./routes/index');

// var users = require('./routes/users');

var app = express();

// view engine setup
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// mongoose.connect('mongodb://promptUser:testing111@ds157641.mlab.com:57641/rating')
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/sendEmail', index)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
 }

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(app.set('port'), function () {
  console.log('Example app listening on port ' + port + '!');
});

module.exports = app;
