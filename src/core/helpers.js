
'use strict';

var path = require('path');
var fs = require('fs');
var command_path = path.resolve(__dirname, '..', 'commands');
const DOMAINS = {
  test: 'localhost:3000',
  local: 'school.lvh.me:3000',
  staging: 'thinkific-staging.com',
  production: 'thinkific.com'
}
const API_PREFIX = 'api/public';
const VERSION = 'v1';
var config_file = '.thinkific_config';

var command_runner = function (command, args) {
  var mod = require(path.resolve(command_path, command));
  var opts = mod.options;
  if(opts.hasOwnProperty('validate_args')) {
    opts.validate_args(args);
  }
  mod.run(args);
}

var validate_command = function(command) {
  return fs.existsSync(path.resolve(command_path, command + '.js'));
};

var get_config_path = function() {
  return path.resolve(process.env.HOME, config_file);
}

var get_config_data = function(){
  var config = {};
  // load previous credentials (if applicable)
  try {
    config = JSON.parse(fs.readFileSync(get_config_path(), 'utf8'));
  } catch (e) {}
  return config;
}

var set_config_data = function(data, callback) {
  var json_data = JSON.stringify(data)
  fs.writeFile(get_config_path(), json_data, callback);
};

var build_url = (env, endpoint) => {

  // raise exception if arguments are not passed
  if(typeof env === 'undefined' || typeof endpoint === 'undefined') {
    throw Error('Missing arguments for build_url function');
  }

  // raise exception the environment is invalid
  if(-1 == Object.keys(DOMAINS).indexOf(env)) {
    throw Error('Invalid environment');
  }

  return ((-1 != ['local', 'test'].indexOf(env)) ? 'http': 'https') + '://' +
    DOMAINS[env] + '/' + API_PREFIX + '/' + VERSION + '/' + endpoint;
}

var get_available_command_files = function() {
  return fs.readdirSync(command_path);
};

module.exports = {
  validate_command: validate_command,
  command_runner: command_runner,
  get_available_command_files: get_available_command_files,
  get_config_data: get_config_data,
  set_config_data: set_config_data,
  build_url: build_url
}