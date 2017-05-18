const Command = require('../core/command');
const chalk = require('chalk');
// These are let so that I can overwrite theme in my tests
let themeService = require('../core/services/themes'); // eslint-disable-line prefer-const
let print = require('../core/print'); // eslint-disable-line prefer-const

const validateArgs = function (args) {
  if (args.length === 0) {
    throw Error('subcommand definition is required');
  }
  if (['list'].indexOf(args[0]) === -1) {
    throw Error(`Invalid subcommands: ${args[0]}`);
  }
};

const list = () => {
  themeService.get((err, body) => {
    if (err) {
      print(chalk.red(`Something went bananas: ${err.message}`));
      return;
    }
    let content = `
${chalk.bold('Themes found in your account:')}

`;
    content += chalk.grey('\tID:\tName\n');
    content += '\t---\t----\n';
    body.forEach((theme) => {
      content += `\t${theme.id}\t${theme.name}`;
    });
    print(`${content}\n\n`);
  });
}

const run = function (args) {
  switch (args[0]) {
    case 'list':
      list();
      break;
    default:
      throw Error('Unrecognizeable subcommand');
  }
};

module.exports = new Command({
  description: 'Downloads and syncs views with thinkific',
  commandSample: 'think.js themes <subcommand:list>',
  validateArgs,
  run,
});
