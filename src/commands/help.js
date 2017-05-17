const Command = require('../core/command');
const chalk = require('chalk');
const print = require('../core/print');
const path = require('path');

const fileName = path.basename(__filename);
const helpers = require('../core/helpers');

let output = `
Usage: ${chalk.bold('think.js <command> <subcommand>')}

  Commands:`;

const help = new Command({
  description: 'prints out help a help statement',
  command_sample: 'think.js help',
  run() {
    // load all modules
    const files = helpers.getAvailableCommandFiles();

    files.forEach((file) => {
      let mod;
      if (module === fileName) {
        mod = help;
      } else {
        mod = require( // eslint-disable-line import/no-dynamic-require, global-require
          path.resolve(__dirname, file));
      }
      const dsc = mod.options.description;
      const smpl = mod.options.command_sample;
      output += `
    ${chalk.cyan(smpl)}${chalk.grey(' | ')}${chalk.white(dsc)}`;
    }, this);
    print(`${output}\n\n`);
  },
});

module.exports = help;
