const path = require('path');
const fs = require('fs');

const commandPath = path.resolve(__dirname, 'commands');
console.log(commandPath);
const DOMAINS = {
  test: 'localhost:3000',
  local: 'school.lvh.me:3000',
  staging: 'thinkific-staging.com',
  production: 'thinkific.com',
}
const API_PREFIX = 'api/public';
const VERSION = 'v1';
const configFile = '.thinkific_config';

const commandRunner = function (command, args) {
  const mod = require( // eslint-disable-line import/no-dynamic-require, global-require
    path.resolve(commandPath, command));
  const opts = mod.options;
  if (opts.validateArgs) {
    opts.validateArgs(args);
  }
  mod.run(args);
}

const validateCommand = function (command) {
  return fs.existsSync(path.resolve(commandPath, `${command}.js`));
};

const getConfigPath = function () {
  return path.resolve(process.env.HOME, configFile);
}

const getConfigData = function () {
  // load previous credentials (if applicable)
  try {
    return JSON.parse(fs.readFileSync(getConfigPath(), 'utf8'));
  } catch (e) {
    return {}
  }
}

const setConfigData = function (data, callback) {
  fs.writeFile(getConfigPath(), JSON.stringify(data), callback);
};

const buildUrl = (env, endpoint) => {
  // raise exception if arguments are not passed
  if (typeof env === 'undefined' || typeof endpoint === 'undefined') {
    throw Error('Missing arguments for buildUrl function');
  }

  // raise exception the environment is invalid
  if (Object.keys(DOMAINS).indexOf(env) === -1) {
    throw Error('Invalid environment');
  }

  return `${(['local', 'test'].indexOf(env) !== -1) ? 'http' : 'https'}://${
    DOMAINS[env]}/${API_PREFIX}/${VERSION}/${endpoint}`;
}

const getAvailableCommandFiles = function () {
  return fs.readdirSync(commandPath);
};

module.exports = {
  validateCommand,
  commandRunner,
  getAvailableCommandFiles,
  getConfigData,
  setConfigData,
  buildUrl,
}
