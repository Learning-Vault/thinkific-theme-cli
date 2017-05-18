// we want to unit the functions in this module
let request = require('../request'); // eslint-disable-line prefer-const
let helpers = require('../helpers'); // eslint-disable-line prefer-const

const BASE = 'custom_site_themes';

const get = (callback) => {
  request.get(BASE, (err, data) => {
    callback(err, data.custom_site_themes);
  });
}

/**
 * Generates and downloads a zipped theme file
 *
 *  . check that the credentials have been set
 *  . make sure worspace exists
 *  . make sure theme is not already crearted
 *  . return a promise
 *  . request file generation
 *  . long poll server checking for server to be done
 *  . once theme has been generated, download file into theme workspace
 */
const download = () => {
  if (!helpers.credentialsCreated()) {
    throw Error('Before proceeding with this command, please setup your credentials');
  }
};

module.exports = {
  get,
  download,
}
