'use strict';

var request = require('request');
var helpers = require('./helpers');
var config = helpers.get_config_data();

var get = (url, callback) => {

  var options = {
    url: helpers.build_url(config.env, url),
    headers: {
      'X-Auth-API-Key': config.api_key,
      'X-Auth-Subdomain': config.course_name
    }
  }
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

module.exports = {
  get: get
}