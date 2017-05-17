

const should = require('should');
const rewire = require('rewire');
const sinon = require('sinon');
const think = rewire('../think');

describe('think.js', () => {
  before((before_cb) => {
    think.__set__('print', () => {});
    before_cb();
  });

  it('can be exported', () => {
    should.exist(think);
  });

  it('calls help if no command is understood', () => {
    const helpers = {
      validate_command() {
        return false;
      },
      command_runner(command) {
        command.should.be.equal('help');
      },
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think(['wrong-command']);
  });

  it('calls appropriate command', () => {
    const command = 'hello-world'
    const helpers = {
      validate_command() {},
      command_runner(command) {
        command.should.be.equal(command);
      },
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think([command]);
  });

  it('calls help if no command was passed', () => {
    // overwrite runner
    const helpers = {
      command_runner: sinon.spy(),
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think([]);

    // should try to load the help function
    helpers.command_runner.calledWithExactly('help');
  });

  it('handles exceptions gracefully when ', () => {
    const helpers = {
      validate_command() {
        throw Error('Something went wrong');
      },
      command_runner() {},
    }
    think.__set__('helpers', helpers);
    should.throws(() => {
      think(['some-command']);
    });
  });
});
