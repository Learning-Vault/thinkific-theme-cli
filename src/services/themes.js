// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const
const themeHelpers = require('../helpers/themes')
const fs = require('fs');
const configHelper = require('../helpers/config');

const config = configHelper.getConfigData();
const BASE = 'custom_site_themes';

const formulatePutData = (themeId, filename) => {
  const resource = themeHelpers.getResourcePath(themeId, filename);
  const content = fs.readFileSync(filename);
  return {
    form: {
      recreate_manifests: config.recreate_manifests,
      theme_id: themeId,
      manifest_schema: content,
    },
  };
};

const get = (callback) => {
  request.get(BASE, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.custom_site_themes);
    }
  });
}

const put = (themeId, filename, callback) => {
  request.put(`${BASE}/${themeId}`, formulatePutData(themeId, filename), (err, response) => {
    callback(err, response);
  });
}

module.exports = {
  get,
  put,
}
