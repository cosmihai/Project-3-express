'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo').default;

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const cocktailsRouter = require('./routes/cocktails')
const usersRouter = require('./routes/users');

const app = express();

// CONNECT TO DB------
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,  
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
}).then(res => console.log('Connected to db...')).catch(err => console.log(err));

// --MIDDLEWARES
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_API_URL]
}));

// -----SESSIONS----
app.use(session({
  store: MongoStore.create({
    mongoUrl: mongoose.connection,
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

const port = process.env.PORT || 3000;
const server = app.listen(port, console.log(`app started on port ${port} ..`));
module.exports = server;