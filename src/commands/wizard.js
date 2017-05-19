const Command = require('../core/command');
const helpers = require('../core/helpers')
const print = require('../core/print');
const chalk = require('chalk');
const readline = require('readline');
const async = require('async');
const fs = require('fs');

const getInputInterface = function () {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

const validateArgs = function (args) {
  if (args.length === 0) {
    throw Error('subcommand definition is required');
  }
  if (args.indexOf('setup') === -1) {
    throw Error(`Invalid subcommands: ${args.join(', ')}`);
  }
};

const setup = function () {
  const credentials = helpers.getConfigData();
  const readLine = getInputInterface();

  const questions = {};

// add questions to ask users
  const addQuestion = function (key, baseQuestion, validation) {
    let _question = '';
    _question += baseQuestion;
    if (Object.keys(credentials).length > 0) {
      _question += ` [current: ${credentials[key]}]`;
    }
    _question += '\n> ';
    questions[key] = function (callback) {
      readLine.question(chalk.cyan(_question), (input) => {
        let err = null;
        let _input = input;
        if (input === '') {
          _input = credentials[key];
        }
        if (_input === '') {
          err = 'Killing process, all values must be set!';
        }
        if (validation) {
          try {
            validation(_input);
          } catch (e) {
            err = e.message;
          }
        }
        callback(err, _input);
      });
    };
  };

  addQuestion('api_key', 'Type in API your API key:');
  addQuestion('course_name', 'Type in course name:');
  addQuestion('path', 'Type the path to your themes:', (input) => {
    if (!fs.existsSync(input)) {
      throw Error('Directory doesn\'t exist');
    }
  });

  // ask all questions in sequence
  async.series(questions, (err, responses) => {
    const _responses = responses;
    if (err) {
      print(chalk.red(err));
    } else {
      _responses.env = 'production';
      _responses.themes = credentials.themes || {};
      helpers.setConfigData(responses, () => {
        print(chalk.green('\nCredentials saved\n'));
      });
    }
    readLine.close();
  });
}

const run = function (args) {
  switch (args[0]) {
    case 'setup':
      setup();
      break;
    default:
      throw Error('Unrecognizeable subcommand');
  }
};

module.exports = new Command({
  description: 'Setup credentials',
  commandSample: 'think.js wizard <subcommand:setup>',
  validateArgs,
  run,
});
