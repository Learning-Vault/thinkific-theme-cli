#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');
var command_path = path.resolve(__dirname, 'src', 'commands')
var print = require('./src/core/print');
var chalk = require('chalk');

var command_runner = function (command) {
  var module = require(path.resolve(command_path, command));
  module.run();
}

var validate_command = function(command) {
  return fs.existsSync(path.resolve(command_path, command + '.js'));
};

var main = function (args) {

  // run help if no argument was passed
  if( 0 == args.length ) {
    command_runner('help');
    return;
  }
  var command = args.shift();
  if( validate_command(command) ) {
    command_runner(command);
  } else {
    print(chalk.red('\nERROR: invalid command'));
    command_runner('help');
  }
};

if (require.main === module) {
  var args = process.argv.splice(2);
  main(args);
}

module.exports = main;