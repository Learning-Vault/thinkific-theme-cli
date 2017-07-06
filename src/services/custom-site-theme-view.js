// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const
const themeHelpers = require('../helpers/themes')
const fs = require('fs');

const BASE = 'custom_site_theme_views';

const formulatePostData = (themeId, filename) => {
  const resource = themeHelpers.getResourcePath(themeId, filename);
  const content = fs.readFileSync(filename);
  return {
    form: {
      theme_id: themeId,
      path: resource,
      content,
    },
  };
};

const formulateDeleteData = (themeId, filename) => {
  const resource = themeHelpers.getResourcePath(themeId, filename);
  return {
    form: {
      theme_id: themeId,
      path: resource,
    },
  };
};

const post = (themeId, filename, callback) => {
  request.post(BASE, formulatePostData(themeId, filename), (err, response) => {
    callback(err, response);
  });
}

const put = (themeId, filename, callback) => {
  request.put(`${BASE}/${themeId}`, formulatePostData(themeId, filename), (err, response) => {
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
