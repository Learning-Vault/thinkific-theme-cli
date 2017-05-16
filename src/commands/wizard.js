'use strict';

var Command = require('../core/command');
var helpers = require('../core/helpers')
var chalk = require('chalk');
var readline = require('readline');
var async = require('async');
var fs = require('fs');

var get_input_interface = function() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

var validate_args = function(args) {
  if ( args.length == 0 ) {
    throw Error('subcommand definition is required');
  }
  if (-1 == args.indexOf('setup')) {
    throw Error('Invalid subcommands: ' + args.join(', '));
  }
};

var setup = function() {
  var credentials = helpers.get_config_data();
  var read_line = get_input_interface();

  var questions = {};

// add questions to ask users
var add_question = function(credentials, key, question, validation) {
  if ( Object.keys(credentials).length > 0 ) {
    question += ' [' + credentials[key] + ']';
  }
  question += '\n> ';
  questions[key] = function(callback){
    read_line.question(chalk.cyan(question), (input) => {
      var err = null;
      if (input == '') {
        input = credentials[key];
      }
      if (input == '') {
        err = 'Killing process, all values must be set!';
      }
      if (Boolean(validation)) {
        try {
          validation(input);
        } catch (e) {
          err = e.message;
        }
      }
      callback(err, input);
    });
  };
};

  add_question(credentials, 'api_key', 'Type in API your API key:');
  add_question(credentials, 'course_name', 'Type in course name:');
  add_question(credentials, 'path', 'Type the path to your themes:', function (input) {
    if (!fs.existsSync(input)) {
      throw Error('Directory doesn\'t exist');
    }
  });

  // ask all questions in sequence
  async.series(questions, function(err, responses){
    if (err) {
      console.log(chalk.red(err));
    } else {
      responses['env'] = 'production';
      helpers.set_config_data(responses, function(){
        console.log(chalk.green('\nCredentials saved\n'));
      });
    }
    read_line.close();
  });
}

var run = function (args) {
  switch(args[0]){
    case 'setup':
      setup();
      break;
  }
};

module.exports = new Command({
  description: 'Automated way to do various tasks with a wizard',
  command_sample: 'think.js wizard <command> <subcommand:setup>',
  validate_args: validate_args,
  run: run
});