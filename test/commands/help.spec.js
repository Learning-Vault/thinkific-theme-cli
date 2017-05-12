'use strict'

var should = require('should');
var sinon = require('sinon');
var rewire = require('rewire');
var help = rewire('../../src/commands/help');

describe('help command', function() {

  it('should retrieve a module', function() {
    should.exist(help);
  });

  it('should retrieve a module', function() {
    var spy = sinon.spy();
    help.__set__('print', spy);
    should.exist(help);
    help.run();
    spy.calledOnce.should.be.true();
  });
});