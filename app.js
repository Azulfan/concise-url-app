if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//Passport
const { dbLogin } = require('./src/models/db');
const passport = require('passport');
const initializePasport = require('./src/utils/passport-config');
initializePasport(passport, (email) => dbLogin.findOne({ email: email }));

//Template Layout
app.set('view engine', 'ejs');
app.use(expressLayout);

app.use(express.static('src/public'));
app.use(flash()); //flash msg
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 8 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl:
        'mongodb://conciseUrl:aF5j1mr3P47xN5Th@ac-v6f4iut-shard-00-00.v4dsb3j.mongodb.net:27017,ac-v6f4iut-shard-00-01.v4dsb3j.mongodb.net:27017,ac-v6f4iut-shard-00-02.v4dsb3j.mongodb.net:27017/?ssl=true&replicaSet=atlas-o7rhj3-shard-0&authSource=admin&retryWrites=true&w=majority',
      ttl: 14 * 24 * 60 * 60, //14 days
    }),
  })
);

//Body Parsing
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./src/routes/route'));

app.listen(port, () => console.log(`Listening on port ${port}`));
