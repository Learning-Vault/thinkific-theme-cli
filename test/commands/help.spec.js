const should = require('should');
const rewire = require('rewire');
const sinon = require('sinon');

const help = rewire('../../src/commands/help');

describe('help command', () => {
  it('should retrieve a module', () => {
    should.exist(help);
  });

  it('should call the print statement', () => {
    const print = sinon.spy();
    const helpers = {
      getAvailableCommandFiles: () => ['help.js'],
    }
    help.__set__('helpers', helpers);
    help.__set__('print', print);
    help.run();
    print.calledOnce.should.be.true();
  });

  it('should load the module when applicable', () => {
    const print = () => {};
    const loadModule = sinon.spy(() => ({
      options: {
        description: 'hello',
        commandSample: 'hello',
      },
    }));
    const helpers = {
      getAvailableCommandFiles: () => ['other-command.js'],
    }
    help.__set__('helpers', helpers);
    help.__set__('print', print);
    help.__set__('loadModule', loadModule);
    help.run();
    loadModule.calledOnce.should.be.true();
  });
});
