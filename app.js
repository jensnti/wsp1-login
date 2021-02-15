require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { query } = require('./models/db');
const bcrypt = require('bcrypt');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {samesite: true}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }, async (username, password, done) => {
    console.log(username, password);
    try {
      const user = await query('SELECT * FROM users WHERE email = ?', username);
      if (!user) { 
        return done(null, false); 
      }
      // if (!user.verifyPassword(password)) { return done(null, false); }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result === false ) {
          return done(null, false);
        }
        return done(null, user[0]);
      });
    } catch (err) {
      if (err) { return done(err); }
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});
 
passport.deserializeUser(async (id, done) => {
  console.log(id);
  try {
    const result = await query('SELECT * FROM users WHERE id = ?', id);
    done(null, result[0]);
  } catch (err) {
    if (err) { return done(err); }
  }
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
