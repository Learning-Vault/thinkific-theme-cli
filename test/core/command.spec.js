'use strict';

var should = require('should');
var Command = require('../../src/core/command.js');

describe('Command', function() {
  
  it('throws an exception when no params are passed', function() {
    should.throws(function() {
      new Command();
    }, /Invalid Command instantiation parameters/);
  });
  it('throws an exception when a required param is missing', function() {
    should.throws(function() {
      new Command({});
    });
  });
  
  it('instantiation success depends on params', function(test_cb) {
    should.doesNotThrow(function(){
      var c = new Command({
        command: 'test',
        command_sample: 'think.js test',
        description: 'print out help a help statement',
        run: function(){
          test_cb();
        }
      });
      
      // this will run the test
      c.run();
    })
  });

});