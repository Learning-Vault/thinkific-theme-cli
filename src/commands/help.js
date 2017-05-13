'use strict';

var Command = require('../core/command');
var chalk = require('chalk');
var print = require('../core/print');

var help_output = `
Usage: ${chalk.bold('think.js <command>')}

  Commands:
    ${chalk.cyan('"./think.js help"')}\t${chalk.white('prints command instructions')}
    ${chalk.cyan('"./think.js wizard setup"')}\t${chalk.white('Sets up your thinkific API credentials')}
    ${chalk.cyan('"./think.js theme download"')}\t${chalk.white('Downloads theme')}
    ${chalk.cyan('"./think.js theme watch"')}\t${chalk.white('watches for file modifications and syncs with server')}
`;

var help = new Command({
  command: 'help',
  description: 'prints out help a help statement',
  run: function() {
    print(help_output);
  }
});

module.exports = help;