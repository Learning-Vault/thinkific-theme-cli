// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const

const BASE = 'custom_site_themes';

const get = (callback) => {
  request.get(BASE, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.custom_site_themes);
    }
  });
}

module.exports = {
  get,
}
