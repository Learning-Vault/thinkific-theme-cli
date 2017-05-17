

const should = require('should');
const sinon = require('sinon');
const rewire = require('rewire');
const help = rewire('../../src/commands/help');

describe('help command', () => {
  it('should retrieve a module', () => {
    should.exist(help);
  });
});
