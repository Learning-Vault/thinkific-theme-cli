const should = require('should');
const rewire = require('rewire');

const wizard = rewire('../../src/commands/wizard');

describe('wizard command', () => {
  it('should retrieve a module', () => {
    should.exist(wizard);
  });

  it('shouldn\' throw errors when valid subcommands are passed', () => {
    should.doesNotThrow(() => {
      wizard.options.validateArgs(['setup']);
    });
  });

  it('should throw errors when invalid subcommands are passed', () => {
    should.throws(() => {
      wizard.options.validateArgs(['invalid']);
    })
  });

  it('should throw errors when no subcommands are passed', () => {
    should.throws(() => {
      wizard.options.validateArgs([]);
    })
  });
});
