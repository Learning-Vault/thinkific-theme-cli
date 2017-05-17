const should = require('should');
const rewire = require('rewire');

const themes = rewire('../../src/commands/themes');

describe('themes command', () => {
  it('should retrieve a module', () => {
    should.exist(themes);
  });

  it('shouldn\' throw errors when valid subcommands are passed', () => {
    should.doesNotThrow(() => {
      themes.options.validateArgs(['list']);
    });
  });

  it('should throw errors when invalid subcommands are passed', () => {
    should.throws(() => {
      themes.options.validateArgs(['invalid']);
    })
  });

  it('should throw errors when no subcommands are passed', () => {
    should.throws(() => {
      themes.options.validateArgs([]);
    })
  });
});
