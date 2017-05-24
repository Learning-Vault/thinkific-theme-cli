const chokidar = require('chokidar');
const path = require('path');
const print = require('../print');
const chalk = require('chalk');
let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const

// const syncFile = (eventType, themePath, filename) => {
//   const resource = filename.replace(`${filename}/`, '');
//   switch (eventType) {
//     case 'add':
//       print(chalk.green(`File Created ${resource}\n`));
//       break;
//     case 'change':
//       print(chalk.green(`File Changed ${resource}\n`));
//       break;
//     case 'unlink':
//       print(chalk.green(`File Deleted ${resource}\n`));
//       break;
//     default:
//       print(chalk.red(`didn't understand ${resource} event\n`));
//       break;
//   }
// };

const run = (themeId) => {
  const config = configHelpers.getConfigData();
  if (!themeId) throw Error('Missing theme id');
  if (!config.themes[themeId]) throw Error('Invalid theme id!');
  if (!configHelpers.themeDirExistsSync(config.themes[themeId])) {
    throw Error('Theme doesn\'t exist!');
  }
  const themePath = path.resolve(config.path, config.themes[themeId]);
  print(`Watching File Structure: ${chalk.bold(themePath)}!!\n`);
  print('Go and make Magic!\n');
  print('------------------\n');
  chokidar.watch(themePath, {
    filter: /\.liquid$/,
    recursive: true,
  })
  // }).on('add', filename => syncFile('add', themePath, filename))
  //   .on('change', filename => syncFile('change', themePath, filename))
  //   .on('unlink', filename => syncFile('unlink', themePath, filename))
    .on('raw', (event, filePath, details) => {
      console.log(`
Raw event info:
---------------

Event: ${event}
File Path: ${filePath}
Details:
{
   "path": "${details.path}",
   "event":"${details.event}",
   "type":"${details.file}",
   "changes":{
      "inode": ${details.changes.inode},
      "finder": ${details.changes.finder},
      "access": ${details.changes.access},
      "xattrs": ${details.changes.xattrs}
   },
   "flags": ${details.flags}
}
`);
    });
};

module.exports = {
  run,
};
