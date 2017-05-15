'use strict'

var should = require('should');
var rewire = require('rewire');
var wizard = rewire('../../src/commands/wizard');

describe('wizard command', function() {
  it('should retrieve a module', function() {
    should.exist(wizard);
  });

  it('shouldn\' throw errors when valid subcommands are passed', function() {
    should.doesNotThrow(function(){
      wizard.options.validate_args(['setup'])
    });
  });

  it('should throw errors when invalid subcommands are passed', function() {
    should.throws(function(){
      wizard.options.validate_args(['invalid']);
    })
  });

  it('should throw errors when no subcommands are passed', function() {
    should.throws(function(){
      wizard.options.validate_args([]);
    })
  });
});