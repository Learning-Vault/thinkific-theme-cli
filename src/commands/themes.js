'use strict';

var Command = require('../core/command');
var theme_service = require('../core/services/themes');
var print = require('../core/print');
var chalk = require('chalk');

var validate_args = function(args) {
  if ( 0 == args.length ) {
    throw Error('subcommand definition is required');
  }
  if (-1 == ['list'].indexOf(args[0])) {
    throw Error('Invalid subcommands: ' + args[0]);
  }
};

var list = () => {
  theme_service.get(function(err, body){
    if (err) {
      print(chalk.red('Something went bananas: ' + err.message));
    }
    var content = `
${chalk.bold('Themes found in your account:')}

`;
    content += chalk.grey(`\tID:\tName\n`);
    content += `\t---\t----\n`;
    body.forEach(function(theme){
      content += `\t${theme.id}\t${theme.name}`
    });
    print(content + '\n');
  });
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