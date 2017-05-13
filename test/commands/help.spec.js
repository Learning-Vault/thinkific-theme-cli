'use strict'

var should = require('should');
var sinon = require('sinon');
var rewire = require('rewire');
var help = rewire('../../src/commands/help');

describe('help command', function() {

  it('should retrieve a module', function() {
    should.exist(help);
  });
});