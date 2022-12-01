const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortURL');

const UserLogin = new mongoose.Schema([
  {
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
]);

const UserSchema = new mongoose.Schema([
  {
    shortenId: {
      type: String,
    },
    urlId: {
      type: String,
    },
    longUrl: {
      type: String,
    },
    shortUrl: {
      type: String,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
]);

const dbShorten = mongoose.model('UserSchema', UserSchema);
const dbLogin = mongoose.model('UserLogin', UserLogin);

module.exports = { dbShorten, dbLogin };
