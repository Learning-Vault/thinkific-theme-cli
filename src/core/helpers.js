
'use strict';

var path = require('path');
var fs = require('fs');
var command_path = path.resolve(__dirname, '..', 'commands');

var command_runner = function (command) {
  var module = require(path.resolve(command_path, command));
  module.run();
}

var validate_command = function(command) {
  return fs.existsSync(path.resolve(command_path, command + '.js'));
};

module.exports = {
  validate_command: validate_command,
  command_runner: command_runner
}