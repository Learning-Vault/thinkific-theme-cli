// for test purposes, we need to overwrite the request module.
const request = require('request');
const chalk = require('chalk');
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const
let requestHelpers = require('../helpers/request'); // eslint-disable-line prefer-const

const printRequest = (options) => {
  console.log(chalk.grey(`${options.method} ${options.url}`));
};

const getConfig = () => {
  const config = configHelpers.getConfigData();
  if (Object.keys(config).length === 0) throw Error('Missing thinkific Credentials');
  return config;
}

const getHeader = config => ({
  'X-Auth-API-Key': config.api_key,
  'X-Auth-Subdomain': config.course_name,
});

const get = (url, callback) => {
  const config = getConfig();
  const headers = getHeader(config);
  const options = {
    url: requestHelpers.buildUrl(config.env, url),
    method: 'GET',
    headers,
  }
  printRequest(options);
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

const post = (url, data, callback) => {
  const config = getConfig();
  const headers = getHeader(config);
  const options = {
    url: requestHelpers.buildUrl(config.env, url),
    method: 'POST',
    form: data,
    headers,
  }
  printRequest(options);
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

const put = (url, data, callback) => {
  const config = getConfig();
  const headers = getHeader(config);
  const options = {
    url: requestHelpers.buildUrl(config.env, url),
    method: 'PUT',
    form: data,
    headers,
  }
  printRequest(options);
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

const remove = (url, callback) => {
  const config = getConfig();
  const headers = getHeader(config);
  const options = {
    url: requestHelpers.buildUrl(config.env, url),
    method: 'DELETE',
    headers,
  }
  printRequest(options);
  request(options, (err, response, body) => {
    callback(err, JSON.parse(body));
  });
}

module.exports = {
  get,
  post,
  remove,
  put,
}
