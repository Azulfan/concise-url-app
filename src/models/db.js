const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://conciseUrl:aF5j1mr3P47xN5Th@ac-v6f4iut-shard-00-00.v4dsb3j.mongodb.net:27017,ac-v6f4iut-shard-00-01.v4dsb3j.mongodb.net:27017,ac-v6f4iut-shard-00-02.v4dsb3j.mongodb.net:27017/?ssl=true&replicaSet=atlas-o7rhj3-shard-0&authSource=admin&retryWrites=true&w=majority'
);

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
