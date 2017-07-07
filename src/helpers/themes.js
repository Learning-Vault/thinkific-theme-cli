const path = require('path');
const config = require('./config').getConfigData();

const getResourcePath = (themeId, filename) => {
  const themePath = path.resolve(config.path, config.themes[themeId]);
  return filename.replace(`${themePath}/`, '');
}

module.exports = {
  getResourcePath,
}
