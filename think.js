#!/usr/bin/env node

const chalk = require('chalk');
const commandHelpers = require('./src/helpers/command');
const print = require('./src/print');

const main = function (args) {
  // run help if no argument was passed
  if (args.length === 0) {
    commandHelpers.commandRunner('help');
    return;
  }
  const command = args.shift();
  if (commandHelpers.validateCommand(command)) {
    try {
      commandHelpers.commandRunner(command, args);
    } catch (e) {
      print(chalk.red(e.message));
      commandHelpers.commandRunner('help');
    }
  } else {
    print(chalk.red('\nERROR: invalid command'));
    commandHelpers.commandRunner('help');
  }
};

if (require.main === module) {
  const args = process.argv.splice(2);
  main(args);
}

module.exports = main;
