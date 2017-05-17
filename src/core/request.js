
const request = require('request');
const helpers = require('./helpers');

const config = helpers.getConfigData();

const get = (url, callback) => {
  const options = {
    url: helpers.buildUrl(config.env, url),
    headers: {
      'X-Auth-API-Key': config.api_key,
      'X-Auth-Subdomain': config.course_name,
    },
  }
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

module.exports = {
  get,
}
