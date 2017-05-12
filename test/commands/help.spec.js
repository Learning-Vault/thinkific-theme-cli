'use strict'

var should = require('should');
var help = require('../../src/commands/help');

describe('help command', function() {
  it('should retrieve a module', function() {
    should.exist(help);
  });
});