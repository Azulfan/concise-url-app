const express = require('express');
const app = express();
const view = require('../controllers/controllers');
const user = require('../controllers/services');
const auth = require('../utils/login');

app.get('/', view.dashboard);
app.get('/loginPanel', auth.isUserLogin, view.loginPanel);
app.get('/registerPanel', auth.isUserLogin, view.registerPanel);

// User Action
app.post('/registerPanel', user.postRegister);
app.post('/loginPanel', user.userAuth);
app.get('/logout', user.userLogout);
app.post('/', user.postUrl);
app.get('/:urlId', user.urlRedirect);

// Page Path Not Found Handle
app.use(view.errorPanel);

module.exports = app;
