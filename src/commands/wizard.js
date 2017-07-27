const Command = require('../base/command');
const configHelpers = require('../helpers/config');
const print = require('../print');
const chalk = require('chalk');
const readline = require('readline');
const async = require('async');
const fs = require('fs');

const getInputInterface = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validateArgs = (args) => {
  if (args.length === 0) {
    throw Error('subcommand definition is required');
  }
  if (args.indexOf('setup') === -1) {
    throw Error(`Invalid subcommands: ${args.join(', ')}`);
  }
};

const setup = () => {
  const credentials = configHelpers.getConfigData();
  const readLine = getInputInterface();

  const questions = {};

// add questions to ask users
  const addQuestion = (key, baseQuestion, validation) => {
    let _question = '';
    _question += baseQuestion;
    if (Object.keys(credentials).length > 0) {
      _question += ` [current: ${credentials[key]}]`;
    }
    _question += '\n> ';
    questions[key] = (callback) => {
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
  addQuestion('subdomain', 'Type in subdomain name:');
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
      _responses.recreate_manifests = false;
      _responses.themes = credentials.themes || {};
      configHelpers.setConfigData(responses, () => {
        print(chalk.green('\nCredentials saved\n'));
      });
    }
    readLine.close();
  });
}

const run = (args) => {
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
  commandSample: 'thinkcli wizard <subcommand:setup>',
  validateArgs,
  run,
});
