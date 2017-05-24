const path = require('path');
let fs = require('fs'); // eslint-disable-line prefer-const

const configFile = '.thinkific_config';

let getConfigPath = () =>  // eslint-disable-line prefer-const
   path.resolve(process.env.HOME, configFile)

const getConfigData = () => {
  // load previous credentials (if applicable)
  try {
    return JSON.parse(fs.readFileSync(getConfigPath(), 'utf8'));
  } catch (e) {
    return {}
  }
}

const setConfigData = (data, callback) => {
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
