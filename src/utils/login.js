const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

const isUserLogin = (req, res, next) => {
  if (req.user == undefined) {
    return next();
  }
  res.redirect('/');
};

module.exports = { checkAuthenticated, isUserLogin };
