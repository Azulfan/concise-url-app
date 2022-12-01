const URL = require('url').URL;
const validUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = validUrl;
