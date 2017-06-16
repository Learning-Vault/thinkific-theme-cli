#!/usr/bin/env node

const chalk = require('chalk');
const commandHelpers = require('./src/helpers/command');
const print = require('./src/print');

const main = (args) => {
  // run help if no argument was passed
  if (args.length === 0) {
    commandHelpers.runCommand('help');
    return;
  }
  const command = args.shift();
  if (commandHelpers.validateCommand(command)) {
    try {
      commandHelpers.runCommand(command, args);
    } catch (e) {
      print(chalk.red(e.message));
      commandHelpers.runCommand('help');
    }
  } else {
    print(chalk.red('\nERROR: invalid command'));
    commandHelpers.runCommand('help');
  }
};

if (require.main === module) {
  const args = process.argv.splice(2);
  main(args);
}

module.exports = main;
