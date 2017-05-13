'use strict';

var Command = require('../core/command');

var wizard = new Command({
  description: 'Automated way to do various tasks with a wizard',
  command_sample: '"think.js wizard <command>',
  run: function() {}
});

module.exports = wizard;