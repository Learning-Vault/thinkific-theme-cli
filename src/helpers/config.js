const path = require('path');
const fs = require('fs');

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

module.exports = {
  getConfigPath,
  getConfigData,
  setConfigData,
}
