if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');

const { dbLogin } = require('./src/models/db');
const passport = require('passport');
const initializePasport = require('./src/utils/passport-config');
initializePasport(passport, (email) => dbLogin.findOne({ email: email }));

app.set('view engine', 'ejs'); //use template engine
app.use(expressLayout);
app.use(express.static('src/public')); //public access file
app.use(flash()); //flash msg
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 10,
    },
  })
);

//Body Parsing
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./src/routes/route'));

const port = 3333;
app.listen(port);
