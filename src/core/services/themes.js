'use strict';

var request = require('../request');
var request = require('../request');
const BASE = 'custom_site_themes';

var get = (callback) => {
  request.get(BASE, (err, data) => {
    callback(err, data['custom_site_themes']);
  });
}

module.exports = {
  get: get
}