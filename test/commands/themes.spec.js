

const should = require('should');
const readline = require('readline');
const rewire = require('rewire');
const themes = rewire('../../src/commands/themes');
const helpers = require('../../src/core/helpers');

describe('themes command', () => {
  it('should retrieve a module', () => {
    should.exist(themes);
  });

  it('shouldn\' throw errors when valid subcommands are passed', () => {
    should.doesNotThrow(() => {
      themes.options.validate_args(['list']);
    });
  });

  it('should throw errors when invalid subcommands are passed', () => {
    should.throws(() => {
      themes.options.validate_args(['invalid']);
    })
  });

  it('should throw errors when no subcommands are passed', () => {
    should.throws(() => {
      themes.options.validate_args([]);
    })
  });
});
