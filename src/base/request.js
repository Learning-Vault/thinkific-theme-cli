// for test purposes, we need to overwrite the request module.
const request = require('request');
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const
let requestHelpers = require('../helpers/request'); // eslint-disable-line prefer-const

const config = configHelpers.getConfigData();
const headers = {
  'X-Auth-API-Key': config.api_key,
  'X-Auth-Subdomain': config.course_name,
};

const get = (url, callback) => {
  const options = {
    url: requestHelpers.buildUrl(config.env, url),
    headers,
  }
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

const post = (url, data, callback) => {
  const options = {
    url: requestHelpers.buildUrl(config.env, url),
    method: 'POST',
    form: data,
    headers,
  }
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

module.exports = {
  get, post,
}
