const chokidar = require('chokidar');
const path = require('path');
let print = require('../print'); // eslint-disable-line prefer-const
const chalk = require('chalk');
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const

const syncFile = (eventType, themePath, filename) => {
  const resource = filename.replace(`${filename}/`, '');
  switch (eventType) {
    case 'add':
      print(chalk.green(`File Created ${resource}\n`));
      break;
    case 'change':
      print(chalk.green(`File Changed ${resource}\n`));
      break;
    case 'unlink':
      print(chalk.green(`File Deleted ${resource}\n`));
      break;
    default:
      print(chalk.red(`didn't understand ${resource} event\n`));
      break;
  }
};

const run = (themeId) => {
  const config = configHelpers.getConfigData();
  if (!themeId) throw Error('Missing theme id');
  if (!config.themes[themeId]) throw Error('Invalid theme id!');
  if (!configHelpers.themeDirExistsSync(config.themes[themeId])) {
    throw Error('Theme doesn\'t exist!');
  }
  const themePath = path.resolve(config.path, config.themes[themeId]);
  let ready = false;
  print(`Watching File Structure: ${chalk.bold(themePath)}!!\n`);
  print('Go and make Magic!\n');
  print('------------------\n');
  chokidar.watch(themePath, {
    filter: /\.liquid$/,
    recursive: true,
  }).on('ready', () => (ready = true))
    .on('add', (filename) => { if (ready) syncFile('add', themePath, filename); })
    .on('change', (filename) => { if (ready) syncFile('change', themePath, filename) })
    .on('unlink', (filename) => { if (ready) syncFile('unlink', themePath, filename) });
};

module.exports = {
  run,
};
