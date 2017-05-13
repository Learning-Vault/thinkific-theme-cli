'use strict';

var should = require('should');
var rewire = require('rewire');
var sinon = require('sinon');
var think = rewire('../think');

describe('think.js', function() {

  before(function(before_cb){
    think.__set__('print', function(){});
    before_cb();
  });
  
  it('can be exported', function() {
    should.exist(think);
  });

  it('calls help if no command is understood', function(){
    var validate_command = function(){
      return false;
    }
    think.__set__('validate_command', validate_command);
    think.__set__('command_runner', function(command){
      command.should.be.equal('help');
    });
    
    // should try to load the help function
    think(['wrong-command']);
  });

  it('calls appropriate command', function(){
    var validate_command = function(){
      return true;
    }
    var command = 'hello-world'
    think.__set__('validate_command', validate_command);
    think.__set__('command_runner', function(command){
      command.should.be.equal(command);
    });
    
    // should try to load the help function
    think([command]);
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

});