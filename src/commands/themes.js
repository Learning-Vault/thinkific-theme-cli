const Command = require('../base/command');
const chalk = require('chalk');
// These are let so that I can overwrite theme in my tests
let themeService = require('../services/themes'); // eslint-disable-line prefer-const
let generatorService = require('../services/theme-generator'); // eslint-disable-line prefer-const
let syncService = require('../services/sync'); // eslint-disable-line prefer-const
let print = require('../print'); // eslint-disable-line prefer-const

const validateArgs = (args) => {
  if (args.length === 0) {
    throw Error('subcommand definition is required');
  }

  if (['list', 'download', 'sync'].indexOf(args[0]) === -1) {
    throw Error(`Invalid subcommands: ${args[0]}`);
  }

  if (['sync', 'download'].indexOf(args[0]) >= 0) {
    if (args.length <= 1) {
      throw Error(`The ${args[0]} subcommand requires the theme id`);
    }
  }
};

const list = () => {
  themeService.get((err, body) => {
    if (err) {
      print(chalk.red(`Something went bananas: ${err}\n`));
      return;
    }
    let content = `
${chalk.bold('Themes found in your account:')}
${chalk.bold.red('** Note that this tool only supports themes with a version of 2.1.0 or greater. **')}

`;
    content += chalk.grey('\tID:\tName\n');
    content += '\t---\t----\n';
    body.forEach((theme) => {
      content += `\n\t${theme.id}\t${theme.name}`;
    });
    print(`${content}\n\n`);
  });
}

const download = themeId => generatorService.download(themeId);
const sync = themeId => syncService.run(themeId);

const run = (args) => {
  switch (args[0]) {
    case 'list':
      list();
      break;
    case 'download':
      download(args[1]);
      break;
    case 'sync':
      sync(args[1]);
      break;
    default:
      throw Error('Unrecognizeable subcommand');
  }
};

module.exports = new Command({
  description: 'List the themes in your Thinkific site | Download a specific theme by id | Watch a specific theme and sync it with your Thinkific site',
  commandSample: 'thinkcli themes <subcommand: (list|download|sync)> <theme_id>',
  validateArgs,
  run,
});
