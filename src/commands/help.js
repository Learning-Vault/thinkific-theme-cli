'use strict';

var Command = require('../core/command');
var chalk = require('chalk');

var print = function(content) {
  var help_output = `
Usage: ${chalk.bold('npm start -- <command> <args>')}

  Commands:
    ${chalk.cyan('"./think.js wizard setup"')}\t${chalk.white('Sets up your thinkific API credentials')}
    ${chalk.cyan('"./think.js theme download"')}\t${chalk.white('Downloads theme')}
    ${chalk.cyan('"./think.js theme watch"')}\t${chalk.white('watches for file modifications and syncs with server')}
`;
  console.log(help_output);
};

var help = new Command({
  command: 'help',
  description: 'prints out help a help statement',
  run: function() {
    print('hello world');
  }
});

module.exports = help;