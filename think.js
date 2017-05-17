#!/usr/bin/env node


const path = require('path');
const fs = require('fs');
const print = require('./src/core/print');
const chalk = require('chalk');
const helpers = require('./src/core/helpers');

const main = function (args) {
  // run help if no argument was passed
  if (args.length == 0) {
    helpers.command_runner('help');
    return;
  }
  const command = args.shift();
  if (helpers.validate_command(command)) {
    try {
      helpers.command_runner(command, args);
    } catch (e) {
      print(chalk.red(e.message));
      helpers.command_runner('help');
    }
  } else {
    print(chalk.red('\nERROR: invalid command'));
    helpers.command_runner('help');
  }
};

if (require.main === module) {
  const args = process.argv.splice(2);
  main(args);
}

module.exports = main;
