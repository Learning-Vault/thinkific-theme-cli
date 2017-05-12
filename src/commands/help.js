'use strict';

var Command = require('../core/command')

var print = function(content) {
  console.log(content);
};

var help = new Command({
  command: 'help',
  description: 'prints out help a help statement',
  run: function() {
    print('hello world');
  }
});

module.exports = help;