const { dbShorten } = require('../models/db');

//Dashboard View
const dashboard = async (req, res) => {
  const user = req.user;
  if (user == undefined) {
    return res.render('index', {
      user: req.user,
      layout: 'layouts/main-template',
      title: 'Dashboard',
      failureFlash: true,
    });
  }
  res.render('index', {
    layout: 'layouts/main-template',
    title: 'Dashboard',
    sessionID: req.user.username,
    user: req.user,
    sessionExpireTime: new Date(req.session.cookie.expires) - new Date(),
    error: req.flash('error'),
    dataShort: await dbShorten.find({ shortenId: req.user.id }),
  });
};

//Login View
const loginPanel = (req, res) => {
  res.render('loginPanel', {
    user: req.user,
    layout: 'layouts/main-template',
    title: 'Login',
  });
};

//Register View
const registerPanel = (req, res) => {
  const message = req.flash('error');
  res.render('registerPanel', {
    user: req.user,
    layout: 'layouts/main-template',
    title: 'Register',
    message,
  });
};

//NotFound View Handle
const errorPanel = (req, res) => {
  res.status(404);
  res.send('<h1> Oppsss... something went wrong </h1>');
};

module.exports = { dashboard, loginPanel, registerPanel, errorPanel };
