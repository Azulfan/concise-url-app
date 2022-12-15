const { dbLogin, dbShorten } = require('../models/db');
const validateURL = require('../utils/urlAuth');
const validator = require('validator');
const passport = require('passport');
const bcrypt = require('bcrypt');

//User Register
const postRegister = async (req, res) => {
  const username = await validator.isAlphanumeric(req.body.username);
  const email = await validator.isEmail(req.body.email);
  const emailCek = await dbLogin.findOne({ email: req.body.email });

  try {
    if (email == false) await req.flash('error', 'Not a Valid Email');
    if (username == false) await req.flash('error', 'Not a Valid Username');
    if (emailCek) await req.flash('error', 'Email already Exist');
    if (username && email && emailCek == undefined) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); //get user input password
      let user = new dbLogin({
        userId: Date.now().toString(),
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      user.save();
      return res.redirect('/loginPanel');
    }
    res.redirect('/registerPanel');
  } catch (e) {
    console.error(e.message);
    return res.redirect('/registerPanel');
  }
};

//User Login
const userAuth = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/loginPanel',
  failureFlash: true,
});

//User Logout
const userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
};

//Generate ShortURL
const postUrl = async (req, res) => {
  const base = process.env.BASE;
  const longUrl = req.body.shortenLink;
  let urlId = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]/gi, '')
    .substring(2, 10);
  if (validateURL(longUrl)) {
    //const shortenId = req.user.userId;
    try {
      const url = await dbShorten.findOne({ longUrl: longUrl });
      if (url == null) {
        const shortUrl = `${base}/${urlId}`;
        let url = new dbShorten({
          shortenId,
          longUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });
        await url.save();
        return res.redirect('/');
      }
      req.flash('error', 'This URL Already Exist on Database');
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
      return res.redirect('/');
    }
  } else {
    await req.flash('error', 'Please Enter a Valid URL');
    res.redirect('/');
  }
};

//Redirect Origin URL
const urlRedirect = async (req, res) => {
  try {
    const url = await dbShorten.findOne({ urlId: req.params.urlId });
    if (url) {
      await dbShorten.updateOne(
        {
          urlId: req.params.urlId,
        },
        {
          $inc: { clicks: 1 },
        }
      );
      return res.redirect(url.longUrl);
    } else res.status(404).json('Ooops Page Not found');
  } catch (err) {
    console.log('err');
    res.status(500).json('Server Error');
  }
};

module.exports = { postRegister, userAuth, userLogout, postUrl, urlRedirect };
