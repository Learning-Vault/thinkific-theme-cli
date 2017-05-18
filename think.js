#!/usr/bin/env node

const chalk = require('chalk');
const helpers = require('./src/core/helpers');
const print = require('./src/core/print');

const main = function (args) {
  // run help if no argument was passed
  if (args.length === 0) {
    helpers.commandRunner('help');
    return;
  }
  const command = args.shift();
  if (helpers.validateCommand(command)) {
    try {
      helpers.commandRunner(command, args);
    } catch (e) {
      print(chalk.red(e.message));
      helpers.commandRunner('help');
    }
  } else {
    print(chalk.red('\nERROR: invalid command'));
    helpers.commandRunner('help');
  }
};

if (require.main === module) {
  const args = process.argv.splice(2);
  main(args);
}

module.exports = main;
