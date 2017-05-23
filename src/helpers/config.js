const path = require('path');
const fs = require('fs');

const configFile = '.thinkific_config';

let getConfigPath = function () { // eslint-disable-line prefer-const
  return path.resolve(process.env.HOME, configFile);
}

const getConfigData = function () {
  // load previous credentials (if applicable)
  try {
    return JSON.parse(fs.readFileSync(getConfigPath(), 'utf8'));
  } catch (e) {
    return {}
  }
}

const setConfigData = function (data, callback) {
  fs.writeFile(getConfigPath(), JSON.stringify(data), callback);
};

const themeDirExistsSync = (themeName) => {
  const config = getConfigData();
  const themePath = `${config.path}/${themeName}`;
  return fs.existsSync(themePath);
};

module.exports = {
  getConfigPath,
  getConfigData,
  setConfigData,
  themeDirExistsSync,
}
