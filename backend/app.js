const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

// dotenv
dotenv.config();

// router
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

const passportConfig = require('./passport');

const app = express();

// sequelize
const { sequelize } = require('./models');

app.set('port', process.env.PORT || 8080);

// database connect
sequelize
  .sync({ force: false /*alter: true*/ }) // force: true = table drop and create
  .then(() => {
    console.log('database connect success');
  })
  .catch(err => {
    console.log(`database connect fail : ${err}`);
  });

passportConfig();

// middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session()); // passport.deserializeUser() execute

app.use('/', pageRouter);
app.use('/auth', authRouter);

// 404 error
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} is not exist`);
  error.status = 404;
  next(error); // go to error middleware
});

// error
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(app.get('port'), () => {
  console.log(`listen ${app.get('port')}`);
});
