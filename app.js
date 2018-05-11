'use strict'

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const cocktailsRouter = require('./routes/cocktails')
const usersRouter = require('./routes/users');

const app = express();

// CONNECT TO DB------
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/PROJECT-3-DB', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// --MIDDLEWARES
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

// -----SESSIONS----
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/cocktails', cocktailsRouter);
app.use('/users', usersRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.json('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.json('error');
  }
});

module.exports = app;