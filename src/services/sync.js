let configHelpers = require('../helpers/config'); // eslint-disable-line prefer-const

const run = (themeId) => {
  const config = configHelpers.getConfigData();
  if (!themeId) throw Error('Missing theme id');
  if (!config.themes[themeId]) throw Error('Invalid theme id!');
  if (!configHelpers.themeDirExistsSync(config.themes[themeId])) {
    throw Error('Theme doesn\'t exist!');
  }
};

module.exports = {
  run,
};
