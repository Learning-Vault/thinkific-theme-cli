// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const

const BASE = 'assets';

const post = (themeId, path, filename, callback) => {
  const data = {
    theme_id: themeId,
    path,
    filename,
  }

  request.post(BASE, data, true, (err, response) => {
    callback(err, response);
  });
}

const put = (themeId, path, filename, callback) => {
  const data = {
    theme_id: themeId,
    path,
    filename,
  }

  request.put(`${BASE}/${themeId}`, data, true, (err, response) => {
    callback(err, response);
  });
}

const destroy = (themeId, path, callback) => {
  const data = {
    theme_id: themeId,
    path,
  }

  request.remove(`${BASE}/${themeId}`, data, (err, response) => {
    callback(err, response);
  });
}

module.exports = {
  post,
  put,
  destroy,
}
