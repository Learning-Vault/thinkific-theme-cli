'use strict';

var Command = require('../core/command');
var chalk = require('chalk');
var print = require('../core/print');
var path = require('path');
var fs = require('fs');
var file_name = path.basename(__filename);

var output = `
Usage: ${chalk.bold('think.js <command>')}

  Commands:`;

var get_available_commands = function() {
  return fs.readdirSync(__dirname);
};

var help = new Command({
  description: 'prints out help a help statement',
  run: function() {

    // load all modules
    var files = get_available_commands();

    files.forEach(function(file) {
      var mod = ( module == file_name) ? help : require(
        path.resolve(__dirname, file));
      var cmd = file.replace('.js', '');
      var dsc = mod.options.description;
      output += `
    ${chalk.cyan('"think.js ' + cmd + '"')}\t${chalk.white(dsc)}`;
    }, this);

    print(output);
  }
});

module.exports = help;