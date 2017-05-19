const path = require('path');
const fs = require('fs');

const commandPath = path.resolve(__dirname, '..', 'commands');

const commandRunner = function (command, args) {
  const mod = require( // eslint-disable-line import/no-dynamic-require, global-require
    path.resolve(commandPath, command));
  const opts = mod.options;
  if (opts.validateArgs) {
    opts.validateArgs(args);
  }
  mod.run(args);
}

const validateCommand = function (command) {
  return fs.existsSync(path.resolve(commandPath, `${command}.js`));
};

const getAvailableCommandFiles = function () {
  return fs.readdirSync(commandPath);
};

module.exports = {
  validateCommand,
  commandRunner,
  getAvailableCommandFiles,
}
