const request = require('../request');

const BASE = 'custom_site_themes';

const get = (callback) => {
  request.get(BASE, (err, data) => {
    callback(err, data.custom_site_themes);
  });
}

module.exports = {
  get,
}
