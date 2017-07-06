// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const themeHelpers = require('../helpers/themes');

const BASE = 'assets';

const formulateMultipartData = (themeId, filename) => {
  const stream = fs.createReadStream(filename);
  const file = path.basename(filename);
  const resource = themeHelpers.getResourcePath(themeId, filename);
  const contentType = mime.lookup(filename);

  return {
    formData: Object.assign({}, {
      theme_id: themeId,
      path: resource,
      asset: {
        value: stream,
        options: {
          file,
          contentType,
        },
      },
    }),
  };
};

const formulateDeleteData = (themeId, filename) => {
  const resource = themeHelpers.getResourcePath(themeId, filename);
  return {
    form: {
      theme_id: themeId,
      path: resource,
    }
  };
};

const post = (themeId, filename, callback) => {
  request.post(BASE, formulateMultipartData(themeId, filename), (err, response) => {
    callback(err, response);
  });
}

const put = (themeId, filename, callback) => {
  request.put(`${BASE}/${themeId}`, formulateMultipartData(themeId, filename), (err, response) => {
    callback(err, response);
  });
}

const destroy = (themeId, filename, callback) => {
  request.remove(`${BASE}/${themeId}`, formulateDeleteData(themeId, filename), (err, response) => {
    callback(err, response);
  });
}

module.exports = {
  post,
  put,
  destroy,
}
