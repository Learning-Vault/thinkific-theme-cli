
const request = require('request');
const helpers = require('./helpers');

const config = helpers.get_config_data();

const get = (url, callback) => {
  const options = {
    url: helpers.build_url(config.env, url),
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
