// for test purposes, we need to overwrite the request module.
const request = require('request');
const mime = require('mime');
const path = require('path');
const fs = require('fs');
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const
let requestHelpers = require('../helpers/request'); // eslint-disable-line prefer-const

const getHeader = config => ({
  'X-Auth-API-Key': config.api_key,
  'X-Auth-Subdomain': config.course_name,
});

const getConfig = () => {
  const config = configHelpers.getConfigData();
  if (Object.keys(config).length === 0) throw Error('Missing thinkific Credentials');
  return config;
}

const formulateFormOptions = (url, method, data, isMultipart) => {
  let dataOptions;
  const config = getConfig();
  const headers = getHeader(config);
  const requestOptions = {
    url: requestHelpers.buildUrl(config.env, url),
    method,
    headers,
  };

  if (isMultipart) {
    const stream = fs.createReadStream(data.filename);
    const filename = path.basename(data.filename);
    const contentType = mime.lookup(data.filename);

    dataOptions = {
      formData: Object.assign({}, data, {
        asset: {
          value: stream,
          options: {
            filename,
            contentType,
          },
        },
      }),
    };
    delete dataOptions.formData.filename;
  } else {
    dataOptions = {
      form: data,
    };
  }

  return Object.assign({}, requestOptions, dataOptions);
};

const handleResponse = callback => (err, response, body) => {
  const status = response.statusCode;
  switch (status) {
    case 200:
    case 201:
    case 202:
      callback(err, JSON.parse(body));
      break;
    case 204:
      callback(err, 'Success!');
      break;
    case 401:
    case 400:
      callback(JSON.parse(body).error);
      break;
    default:
      callback(`Could not understand ${status} status`);
      break;
  }
}

const get = (url, callback) => {
  const options = formulateFormOptions(url, 'GET', {}, false);
  request(options, handleResponse(callback));
}

const post = (url, data, isMultipart, callback) => {
  const options = formulateFormOptions(url, 'POST', data, isMultipart);
  request(options, handleResponse(callback));
}

const put = (url, data, isMultipart, callback) => {
  const options = formulateFormOptions(url, 'PUT', data, isMultipart);
  request(options, handleResponse(callback));
}

const remove = (url, data, callback) => {
  const options = formulateFormOptions(url, 'DELETE', data, false);
  request(options, handleResponse(callback));
}

module.exports = {
  get,
  post,
  remove,
  put,
}
