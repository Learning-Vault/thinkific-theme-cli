'use strict';

var Command = require('../core/command');
var chalk = require('chalk');
var print = require('../core/print');
var path = require('path');
var fs = require('fs');
var file_name = path.basename(__filename);
var helpers = require('../core/helpers');

var output = `
Usage: ${chalk.bold('think.js <command>')}

  Commands:`;

var help = new Command({
  description: 'prints out help a help statement',
  command_sample: '"think.js help <command>',
  run: function() {

    // load all modules
    var files = helpers.get_available_command_files();

    files.forEach(function(file) {
      var mod = ( module == file_name) ? help : require(
        path.resolve(__dirname, file));
      var cmd = file.replace('.js', '');
      var dsc = mod.options.description;
      var smpl = mod.options.command_sample;
      output += `
    ${chalk.cyan(smpl)}\t${chalk.white(dsc)}`;
    }, this);
    print(output);
  }
});

module.exports = help;