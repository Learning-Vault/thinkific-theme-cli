// we want to unit the functions in this module
let request = require('../base/request'); // eslint-disable-line prefer-const
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const
let fs = require('fs'); // eslint-disable-line prefer-const
let print = require('../print'); // eslint-disable-line prefer-const
let extract = require('extract-zip'); // eslint-disable-line prefer-const
const async = require('async');
const http = require('http');
const chalk = require('chalk');
const extend = require('util')._extend

const BASE = 'custom_site_theme_generator';
const interval = 100;

/**
 * Sends a request to thinkific to get the theme generated
 *
 * returns the job id and theme info
 *
 * @param {id} themeId
 * @param {function} callback
 */
const generateTheme = (themeId, callback) => {
  print('Requesting generation:\n');
  const data = {
    form: { theme_id: themeId },
  };
  request.post(BASE, data, (err, response) => {
    let _generationErr = err;

    if (!_generationErr && configHelpers.themeDirExistsSync(response.theme_name)) {
      _generationErr = `The ${response.theme_name} has already being downloaded.`;
    }
    if (!_generationErr) print(`${chalk.green('done!')}\n`);
    callback(_generationErr, response);
  });
}

/**
 * long polls thinkific to find out when the server has finished
 * generating the theme.
 *
 * @param {dictionary} data
 * @param {function} callback
 */
const checkThemeGeneration = (data, callback) => {
  print(`${chalk.green('generating! ')}`);
  let status;
  const test = () => status !== 'complete';
  const iteratee = (iterateeCb) => {
    setTimeout(() => {
      print(`${chalk.green('.')}`);
      request.get(`${BASE}/${data.job_id}`, (err, response) => {
        status = response.status;
        iterateeCb(null);
      });
    }, interval);
  }
  async.whilst(test, iteratee, () => {
    print(`${chalk.green('done!')}\n`);
    callback(null, data);
  });
}

/**
 * Downloads the file into a temp folder
 *
 * @param {dictionary} data
 * @param {function} callback
 */
const downloadFile = (data, callback) => {
  const updatedData = extend(data, { tmp: `/tmp/${data.theme_name}.zip` });
  const file = fs.createWriteStream(data.tmp);
  print(`${chalk.green('Downloading!')}\n`);
  http.get(updatedData.url.replace('https', 'http'), (response) => {
    response.pipe(file);
    file.on('finish', () => {
      print(`${chalk.green('done!')}\n`);
      file.close(() => callback(null, updatedData));
    });
  });
}

/**
 * Extracts the zipped theme content into the expected directory
 * within the workspace.
 *
 * @param {dictionary} data
 * @param {function} callback
 */
const extractTheme = (data, callback) => {
  const config = configHelpers.getConfigData();
  const dir = `${config.path}/${data.theme_name}`;
  print(`${chalk.green('extracting!')}\n`);
  extract(data.tmp, { dir }, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

/**
 * Extracts the zipped theme content into the expected directory
 * within the workspace.
 *
 * @param {dictionary} data
 * @param {function} callback
 */
const updateConfigFile = (data, callback) => {
  print(`${chalk.green('Updating config!')}\n`);
  const config = configHelpers.getConfigData();
  if (!config.themes[data.theme_id]) {
    config.themes[data.theme_id] = data.theme_name;
  }
  configHelpers.setConfigData(config, () => (callback(null, data))); // continue passing the data
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
const download = (themeId) => {
  const config = configHelpers.getConfigData();
  if (Object.keys(config).length === 0) {
    throw Error('Credentials missing');
  }

  if (!fs.existsSync(config.path)) {
    throw Error('The theme workspace doesn\'t exist.');
  }

  const initProcess = callback => callback(null, themeId);
  const endProcess = (err, data) => {
    let msg;
    if (err) {
      msg = chalk.red(`\n${err}\n\n`);
    } else {
      const path = chalk.green(`${config.path}/${data.theme_name}`);
      msg = `\nThe ${data.theme_name} theme can be found here:\n${path} !!!!\n\n`;
    }
    print(msg);
  }
  const process = [initProcess, generateTheme, checkThemeGeneration, downloadFile,
    extractTheme, updateConfigFile];

  async.waterfall(process, endProcess);
};

module.exports = {
  download,
}
