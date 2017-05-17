

const should = require('should');
const readline = require('readline');
const rewire = require('rewire');
const wizard = rewire('../../src/commands/wizard');
const helpers = require('../../src/core/helpers');

describe('wizard command', () => {
  it('should retrieve a module', () => {
    should.exist(wizard);
  });

  it('shouldn\' throw errors when valid subcommands are passed', () => {
    should.doesNotThrow(() => {
      wizard.options.validate_args(['setup']);
    });
  });

  it('should throw errors when invalid subcommands are passed', () => {
    should.throws(() => {
      wizard.options.validate_args(['invalid']);
    })
  });

  it('should throw errors when no subcommands are passed', () => {
    should.throws(() => {
      wizard.options.validate_args([]);
    })
  });
});
