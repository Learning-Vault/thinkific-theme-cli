// we want to unit the functions in this module
let request = require('../request'); // eslint-disable-line prefer-const

const BASE = 'custom_site_themes';

const get = (callback) => {
  request.get(BASE, (err, data) => {
    callback(err, data.custom_site_themes);
  });
}

module.exports = {
  get,
}
