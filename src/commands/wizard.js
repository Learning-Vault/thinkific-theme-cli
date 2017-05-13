'use strict';

var Command = require('../core/command');
var helpers = require('../core/helpers')
var chalk = require('chalk');
var readline = require('readline');
var async = require('async');
var fs = require('fs');

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
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var questions = {};

  // add questions to ask users
  var add_question = function(key, question, validation) {
    if ( Boolean(credentials) ) {
      question += ' [' + credentials[key] + ']';
    }
    question += '\n> ';
    questions[key] = function(callback){
      rl.question(chalk.cyan(question), (input) => {
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

  add_question('api_key', 'Type in API your API key:');
  add_question('course_name', 'Type in course name:');
  add_question('path', 'Type the path to your themes:', function (input) {
    if (!fs.existsSync(input)) {
      throw Error('Directory doesn\'t exist');
    }
  });

  // ask all questions in sequence
  async.series(questions, function(err, responses){
    if (err) {
      console.log(chalk.red(err));
    } else {
      helpers.set_config_data(responses, function(){
        console.log(chalk.green('\nCredentials saved\n'));
      });
    }
    rl.close();
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