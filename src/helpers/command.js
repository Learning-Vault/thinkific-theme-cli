const path = require('path');
const fs = require('fs');

const commandPath = path.resolve(__dirname, '..', 'commands');

const runCommand = (command, args) => {
  const mod = require( // eslint-disable-line import/no-dynamic-require, global-require
    path.resolve(commandPath, command));
  const opts = mod.options;
  if (opts.validateArgs) {
    opts.validateArgs(args);
  }
  mod.run(args);
}
const validateCommand = command => fs.existsSync(path.resolve(commandPath, `${command}.js`));
const getAvailableCommandFiles = () => fs.readdirSync(commandPath);

module.exports = {
  validateCommand,
  runCommand,
  getAvailableCommandFiles,
}
