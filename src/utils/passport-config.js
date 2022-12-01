const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { dbLogin } = require('../models/db');

function initialize(passport, getUserByEmail) {
  const loginCheck = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) return done(null, false, { message: 'No User with this email' });
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password Incorrect' });
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, loginCheck));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    dbLogin.findOne(
      {
        _id: id,
      },
      function (err, user) {
        done(err, user);
      }
    );
  });
}
module.exports = initialize;
