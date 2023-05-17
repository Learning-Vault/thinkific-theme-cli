const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');
const themeService = require('../services/themes');
const customSiteThemeViewService = require('../services/custom-site-theme-view');
const assetService = require('../services/asset');
const themesHelpers = require('../helpers/themes');
//let fs = require('fs'); // eslint-disable-line prefer-const
let print = require('../print'); // eslint-disable-line prefer-const
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const

const syncFile = (eventType, themeId, themePath, filename) => {

  const resource = filename.replace(`${themePath}/`, '');
  if ( themesHelpers.isHiddenFile(resource) ) {
    print(chalk.yellow(`${resource}: Ignoring hidden file\n`));
    return;
  }
  const service = fetchService(resource);
  switch (eventType) {
    case 'add':
      print(chalk.green(`${resource}: Creating File!\n`));

      service.post(themeId, filename, (err) => {
        if (err) {
          print(chalk.red(`${resource}: ${err}\n`));
        } else {
          print(chalk.green(`${resource}: File Created\n`));
        }
      });
      break;
    case 'change':
      print(chalk.green(`${resource}: Uploading changes\n`));

      service.put(themeId, filename, (err) => {
        if (err) {
          print(chalk.red(`${resource}: ${err}\n`));
        } else {
          print(chalk.green(`${resource}: File Changed\n`));
        }
      });
      break;
    case 'unlink':
      print(chalk.green(`${resource}: Deleting File\n`));

      service.destroy(themeId, filename, (err) => {
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

const fetchService = (resource) => {
  if (resource == 'manifest.json') {
    return themeService;
  } else if (resource.startsWith('assets')) {
    return assetService;
  } else {
    return customSiteThemeViewService;
  }
}

const run = (themeId) => {
  print(`\nUsing Config File: ${chalk.green(configHelpers.getConfigPath())}\n`);
  

  const config = configHelpers.getConfigData();

  print(`Subdomain: ${chalk.green(config.subdomain)}\n`);
  print(`Path: ${chalk.green(config.path)}\n`);
  
  if (!themeId) throw Error('Missing theme id');
  if (!config.themes[themeId]) throw Error('Invalid theme id!');
  if (!configHelpers.themeDirExistsSync(config.themes[themeId])) {
    throw Error('Theme doesn\'t exist!');
  }
  const themePath = path.resolve(config.path, config.themes[themeId]);
  let ready = false;

  print(`Watching File Structure: ${chalk.green(themePath)}\n\n`);
  

  // print(`${process.env.PWD}: PWD!\n`);
  // print(`${process.env.HOME}: HOME!\n`);
  // print(`${process.env.NODE_ENV}: NODE_ENV!\n`);
  print('Warming Up...\n');
  chokidar.watch(themePath, {
     filter: /\.liquid$/,
     recursive: true,
     usePolling: true,
     interval: 2,
     ignored: ['**/.git']
  }).on('ready', () => {
      ready = true;
      print('Go and make Magic!\n');
      print('------------------\n');
    })
    .on('add', (filename) => { if (ready) syncFile('add', themeId, themePath, filename); })
    .on('change', (filename) => { if (ready) syncFile('change', themeId, themePath, filename) })
    .on('unlink', (filename) => { if (ready) syncFile('unlink', themeId, themePath, filename) });
};

module.exports = {
  run,
};
