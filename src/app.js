// パッケージimport
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectFlash = require("connect-flash");
// ファイルimport
const auth = require('./services/auth');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(connectFlash());
app.use(cookieParser());
app.use(logger('dev'));
// ログイン設定
auth.Auth.initialize(app);
auth.Auth.setStrategy();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routing
app.use('/', require('./routes/index'));
app.use('/account', require('./routes/account'));
// app.use('/home', require('./routes/home');

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
