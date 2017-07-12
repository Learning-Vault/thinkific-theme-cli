const path = require('path');
const config = require('./config').getConfigData();

const getResourcePath = (themeId, filename) => {
  const themePath = path.resolve(config.path, config.themes[themeId]);
  return filename.replace(`${themePath}/`, '');
}

/**
 * A file is hidden if it's in a hidden directory
 * or if it's a hidden file
 */
const isHiddenFile = resource => resource.split('/').some(word => word.match(/^\.[^\/]/));

module.exports = {
  getResourcePath,
  isHiddenFile,
}
