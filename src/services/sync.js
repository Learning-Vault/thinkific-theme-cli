const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const customSiteThemeView = require('../services/custom-site-theme-view');
let print = require('../print'); // eslint-disable-line prefer-const
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const

const syncFile = (eventType, themeId, themePath, filename) => {
  const resource = filename.replace(`${themePath}/`, '');
  const content = fs.readFileSync(filename).toString('utf8');
  switch (eventType) {
    case 'add':
      print(chalk.green(`File Created ${resource}\n`));
      customSiteThemeView.post(themeId, resource, content, (err, response) => {
        console.log(err, response);
      });
      break;
    case 'change':
      print(chalk.green(`File Changed ${resource}\n`));
      customSiteThemeView.put(themeId, resource, content, (err, response) => {
        console.log(err, response);
      });
      break;
    case 'unlink':
      print(chalk.green(`File Deleted ${resource}\n`));
      customSiteThemeView.destroy(themeId, resource, (err, response) => {
        console.log(err, response);
      });
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
    .on('add', (filename) => { if (ready) syncFile('add', themeId, themePath, filename); })
    .on('change', (filename) => { if (ready) syncFile('change', themeId, themePath, filename) })
    .on('unlink', (filename) => { if (ready) syncFile('unlink', themeId, themePath, filename) });
};

module.exports = {
  run,
};
