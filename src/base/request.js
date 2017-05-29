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
    const status = response.statusCode;
    switch (status) {
      case 200:
        callback(err, JSON.parse(body));
        break;
      case 400:
        callback(err);
        break;
      default:
        callback(`Could not understand ${status} status`);
        break;
    }
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
  console.log('options', options);
  request(options, (err, response, body) => {
    const status = response.statusCode;
    console.log('body', body);
    console.log('err', err);
    console.log('response', response);
    switch (status) {
      case 200:
      case 201:
        callback(err, JSON.parse(body));
        break;
      case 400:
        callback(err);
        break;
      default:
        callback(`Could not understand ${status} status`);
        break;
    }
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
    const status = response.statusCode;
    switch (status) {
      case 202:
        callback(err, JSON.parse(body));
        break;
      case 400:
        callback(err);
        break;
      default:
        callback(`Could not understand ${status} status`);
        break;
    }
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
    const status = response.statusCode;
    switch (status) {
      case 204:
        callback(err, JSON.parse(body));
        break;
      case 400:
        callback(err);
        break;
      default:
        callback(`Could not understand ${status} status`);
        break;
    }
  });
}

module.exports = {
  get,
  post,
  remove,
  put,
}
