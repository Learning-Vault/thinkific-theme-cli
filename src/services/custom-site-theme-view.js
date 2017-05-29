// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const

const BASE = 'custom_site_theme_views';

const post = (themeId, relativePath, content, callback) => {
  request.post(BASE, { theme_id: themeId, path: relativePath, content }, (err, response) => {
    callback(err, response);
  });
}

const put = (themeId, relativePath, content, callback) => {
  request.put(`${BASE}/${themeId}`, { path: relativePath, content }, (err, response) => {
    callback(err, response);
  });
}

const destroy = (themeId, relativePath, callback) => {
  request.destroy(`${BASE}/${themeId}`, { path: relativePath }, (err, response) => {
    callback(err, response);
  });
}

module.exports = {
  post,
  put,
  destroy,
}
