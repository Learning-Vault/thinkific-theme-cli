#!/usr/bin/env node

'use strict';

 var path = require('path');

 var command_path = path.resolve(__dirname, 'src', 'commands')

var command_runner = function (command) {
  var module = require(path.resolve(command_path, command));
  module.run();
}

var get_available_commands = function() {
  
};

var is_command_valid = function() {
  
};

var main = function (args) {

  // run help if no argument was passed
  if( 0 == args.length ) {
    command_runner('help');
    // console.log(require('./src/commands/help'));
    // var command = require('./src/commands/help');
    // command();
    return;
  }

  // get a list of valid commands
  // validate arguments
  // if command has been identified, call it,
  // call help command otherwise
};

if (require.main === module) {
  var args = process.argv.splice(2);
  main(args);
}

module.exports = main;