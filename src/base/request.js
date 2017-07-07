// for test purposes, we need to overwrite the request module.
const request = require('request');
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const
let requestHelpers = require('../helpers/request'); // eslint-disable-line prefer-const

const getHeader = config => ({
  'X-Auth-API-Key': config.api_key,
  'X-Auth-Subdomain': config.subdomain,
});

const getConfig = () => {
  const config = configHelpers.getConfigData();
  if (Object.keys(config).length === 0) throw Error('Missing thinkific Credentials');
  return config;
}

const handleResponse = (err, response, callback) => {
  const status = response.statusCode;
  switch (status) {
    case 200:
    case 201:
    case 202:
      callback(err, JSON.parse(response.body));
      break;
    case 204:
      callback(err, 'Success!');
      break;
    case 401:
      callback('Unauthorized');
      break;
    case 400:
      callback('Bad Request');
      break;
    default:
      callback(`Could not understand ${status} status`);
      break;
  }
}

const formulateOptions = (method, url, dataOptions) => {
  const config = getConfig();
  const requestOptions = {
    url: requestHelpers.buildUrl(config.env, url),
    method,
    headers: getHeader(config),
  };
  return Object.assign({}, requestOptions, dataOptions);
}

const get = (url, callback) => {
  request(formulateOptions('GET', url, {}), (err, response) => {
    handleResponse(err, response, callback)
  });
}

const post = (url, dataOptions, callback) => {
  request(formulateOptions('POST', url, dataOptions), (err, response) => {
    handleResponse(err, response, callback);
  });
}

const put = (url, dataOptions, callback) => {
  request(formulateOptions('PUT', url, dataOptions), (err, response) => {
    handleResponse(err, response, callback)
  });
}

const remove = (url, dataOptions, callback) => {
  request(formulateOptions('DELETE', url, dataOptions), (err, response) => {
    handleResponse(err, response, callback)
  });
}

module.exports = {
  get,
  post,
  remove,
  put,
}
