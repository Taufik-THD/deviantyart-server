var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')

var indexRouter = require('./routes/index');
<<<<<<< 7af1e6f04a17eac7e0348e369888858f1221a0b3
<<<<<<< 710149c113d2df5d1f92ecd01a9479679de50d9f
var picturesRouter = require('./routes/pictures');
=======
// var usersRouter = require('./routes/users');
>>>>>>> register, please check
=======
var usersRouter = require('./routes/users');
>>>>>>> return state appjs

var app = express();

mongoose.connect("mongodb://127.0.0.1:27017/deviantyart")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('cors')())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/pictures', picturesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
