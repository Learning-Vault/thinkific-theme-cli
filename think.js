#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');
var print = require('./src/core/print');
var chalk = require('chalk');
var helpers = require('./src/core/helpers');

var main = function (args) {

  // run help if no argument was passed
  if( 0 == args.length ) {
    helpers.command_runner('help');
    return;
  }
  var command = args.shift();
  if( helpers.validate_command(command) ) {
    try {
      helpers.command_runner(command, args);
    } catch(e) {
      print(chalk.red(e.message));
      helpers.command_runner('help');
    }
  } else {
    print(chalk.red('\nERROR: invalid command'));
    helpers.command_runner('help');
  }
};

if (require.main === module) {
  var args = process.argv.splice(2);
  main(args);
}

module.exports = main;