// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const
let helpers = require('../helpers'); // eslint-disable-line prefer-const
let fs = require('fs'); // eslint-disable-line prefer-const
const async = require('async');
const http = require('http');
const extract = require('extract-zip');
const print = require('../print');
const chalk = require('chalk');

const BASE = 'custom_site_theme_generator';
const interval = 100;
const config = helpers.getConfigData();

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
const download = (themeId) => {
  let generationData;
  if (Object.keys(config).length === 0) {
    throw Error('Credentials missing');
  }

  if (!fs.existsSync(config.path)) {
    throw Error('The theme workspace doesn\'t exist.');
  }

  async.waterfall([(callback) => {
    print('Requesting generation:\n');
    request.post(BASE, { theme_id: themeId }, (err, data) => {
      print(`${chalk.green('done!')}\n`);
      generationData = data;
      callback(null);
    });
  }, (callback) => {
    print(`${chalk.green('generating! ')}`);
    let status;
    const test = () => status !== 'complete';
    const iteratee = (iterateeCb) => {
      setTimeout(() => {
        print(`${chalk.green('.')}`);
        request.get(`${BASE}/${generationData.job_id}`, (err, data) => {
          status = data.status;
          iterateeCb(null);
        });
      }, interval);
    }
    async.whilst(test, iteratee, () => {
      print(`${chalk.green('done!')}\n`);
      callback(null, generationData.url);
    });
  }, (url, callback) => {
    const tmp = `/tmp/${generationData.theme_name}.zip`;
    const file = fs.createWriteStream(tmp);
    print(`${chalk.green('Downloading!')}\n`);
    http.get(url.replace('https', 'http'), (response) => {
      response.pipe(file);
      file.on('finish', () => {
        print(`${chalk.green('done!')}\n`);
        file.close(() => callback(null, tmp));
      });
    });
  }, (tmp, callback) => {
    const dir = `${config.path}/${generationData.theme_name}`;
    print(`${chalk.green('extracting!')}\n`);
    extract(tmp, { dir }, (err) => {
      callback(err);
    })
  }, (callback) => {
    print(`${chalk.green('Updating config!')}\n`);
    if (!config.themes[generationData.theme_id]) {
      config.themes[generationData.theme_id] = generationData.theme_name;
    }
    helpers.setConfigData(config, callback);
  }], () => {
    print(`\nYour theme can be found here: ${config.path}/${generationData.theme_name} !!!!\n\n`);
  });
};

module.exports = {
  download,
}
