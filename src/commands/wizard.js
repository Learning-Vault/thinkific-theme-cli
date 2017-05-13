'use strict';

var Command = require('../core/command');

var wizard = new Command({
  description: 'Automated way to do various tasks with a wizard',
  command_sample: 'think.js wizard <command> <subcommand:setup>',
  validate_args: function(args) {
    if ( args.length == 0 ) {
      throw Error('subcommand definition is required');
    }
    if (-1 == args.indexOf('setup')) {
      throw Error('Invalid subcommands: ' + args.join(', '));
    }
  },
  run: function() {
    console.log('called');
  }
});

module.exports = wizard;