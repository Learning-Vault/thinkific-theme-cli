'use strict'

var should = require('should');
var wizard = rewire('../../src/commands/wizard');

describe('wizard command', function() {

  it('should retrieve a module', function() {
    should.exist(wizard);
  });

});