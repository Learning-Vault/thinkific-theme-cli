const Command = require('../base/command');
const chalk = require('chalk');
// These are let so that I can overwrite theme in my tests
let themeService = require('../services/themes'); // eslint-disable-line prefer-const
let generatorService = require('../services/theme_generator'); // eslint-disable-line prefer-const
let print = require('../print'); // eslint-disable-line prefer-const

const validateArgs = (args) => {
  if (args.length === 0) {
    throw Error('subcommand definition is required');
  }
  if (['list', 'download'].indexOf(args[0]) === -1) {
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

const download = (themeId) => {
  generatorService.download(themeId);
}

const run = (args) => {
  switch (args[0]) {
    case 'list':
      list();
      break;
    case 'download':
      download(args[1]);
      break;
    default:
      throw Error('Unrecognizeable subcommand');
  }
};

module.exports = new Command({
  description: 'Downloads and syncs views with thinkific',
  commandSample: 'think.js themes <subcommand:list|download> <theme_id>',
  validateArgs,
  run,
});
