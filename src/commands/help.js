const Command = require('../core/command');
const chalk = require('chalk');
const path = require('path');

const fileName = path.basename(__filename);
/**
 * These are set to 'let' so that i can write a test that will allow me to
 * overwrite functionality within these modules.
 */
let helpers = require('../core/helpers'); // eslint-disable-line prefer-const
let print = require('../core/print'); // eslint-disable-line prefer-const

let output = `
Usage: ${chalk.bold('think.js <command> <subcommand>')}

  Commands:`;

/**
 * Loads a module dynamically
 *
 * Note: is set to 'let' because i don't want to actually require
 * a module on my test.
 *
 * @param {string} file name
 */
let loadModule = file =>  // eslint-disable-line prefer-const
   require( // eslint-disable-line import/no-dynamic-require, global-require
    path.resolve(__dirname, file))

const help = new Command({
  description: 'prints out a help statement',
  commandSample: 'think.js help',
  run() {
    // load all modules
    const files = helpers.getAvailableCommandFiles();

    files.forEach((file) => {
      const mod = (file === fileName) ? help : loadModule(file);
      const dsc = mod.options.description;
      const smpl = mod.options.commandSample;

      output += `
    ${chalk.cyan(smpl)}${chalk.grey(' | ')}${chalk.white(dsc)}`;
    }, this);
    print(`${output}\n\n`);
  },
});

module.exports = help;
