'use strict';

var Command = require('../core/command')

var help = new Command({
  command: 'help',
  description: 'prints out help a help statement',
  run: function() {

  }
});

module.exports = help;