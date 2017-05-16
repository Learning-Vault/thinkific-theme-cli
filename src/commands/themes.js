'use strict';

var Command = require('../core/command');
var helpers = require('../core/helpers')
var chalk = require('chalk');

var get_input_interface = function() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

var validate_args = function(args) {
  if ( 0 == args.length ) {
    throw Error('subcommand definition is required');
  }
  if (-1 == ['list'].indexOf(args[0])) {
    throw Error('Invalid subcommands: ' + args[0]);
  }
};

var list = () => {
}

var run = function (args) {
  switch(args[0]){
    case 'list':
      list();
      break;
  }
};

module.exports = new Command({
  description: 'Downloads and syncs views with thinkific',
  command_sample: 'think.js themes <subcommand:list>',
  validate_args: validate_args,
  run: run
});