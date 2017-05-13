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
    var helpers = {
      validate_command: function(){
        return false;
      },
      command_runner: function(command){
        command.should.be.equal('help');
      }
    }
    think.__set__('helpers', helpers);
    
    // should try to load the help function
    think(['wrong-command']);
  });

  it('calls appropriate command', function(){
    var command = 'hello-world'
    var helpers = {
      validate_command: function(){
        return true;
      },
      command_runner: function(command){
        command.should.be.equal(command);
      }
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think([command]);
  });

  it('calls help if no command was passed', function(){
    
    // overwrite runner
    var helpers = {
      command_runner: sinon.spy()
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think([]);
    
    // should try to load the help function
    helpers.command_runner.calledWithExactly('help');
  });

});