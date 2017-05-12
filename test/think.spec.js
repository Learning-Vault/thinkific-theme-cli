'use strict';

var should = require('should');
var rewire = require('rewire');
var sinon = require('sinon');
var think = rewire('../think');

describe('think.js', function() {
  it('can be exported', function() {
    should.exist(think);
  });

  it('understands available commands', function(){

  });

  it('validates commands according to what\'s available', function(){
    
  });

  it('calls help if no command was passed', function(){
    
    // overwrite runner
    var command_runner = sinon.spy();
    think.__set__('command_runner', command_runner);
    
    // should try to load the help function
    think([]);
    
    // should try to load the help function
    command_runner.calledWithExactly('help');
  });

  it('calls appropriate command', function(){
    
  });
});