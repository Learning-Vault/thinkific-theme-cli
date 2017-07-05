const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const customSiteThemeViewService = require('../services/custom-site-theme-view');
const assetService = require('../services/asset');
let print = require('../print'); // eslint-disable-line prefer-const
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const

const syncFile = (eventType, themeId, themePath, filename) => {
  const resource = filename.replace(`${themePath}/`, '');
  const content = (eventType !== 'unlink') ? fs.readFileSync(filename).toString('utf8') : '';
  const service = resource.startsWith("assets") ? assetService: customSiteThemeViewService;
  switch (eventType) {
    case 'add':
      print(chalk.green(`${resource}: Uploading File!\n`));
      service.post(themeId, resource, content, (err) => {
        if (err) {
          print(chalk.red(`${resource}: ${err}\n`));
        } else {
          print(chalk.green(`${resource}: File Created\n`));
        }
      });
      break;
    case 'change':
      print(chalk.green(`${resource}: Uploading changes\n`));
      service.put(themeId, resource, content, (err) => {
        if (err) {
          print(chalk.red(`${resource}: ${err}\n`));
        } else {
          print(chalk.green(`${resource}: File Changed\n`));
        }
      });
      break;
    case 'unlink':
      print(chalk.green(`${resource}: Deleting File\n`));
      service.destroy(themeId, resource, (err) => {
        if (err) {
          print(chalk.red(`${resource}: ${err}\n`));
        } else {
          print(chalk.green(`${resource}: File Deleted\n`));
        }
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
