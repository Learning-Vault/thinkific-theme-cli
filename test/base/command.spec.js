

const should = require('should');
const Command = require('../../src/base/command.js');

describe('Command', () => {
  it('throws an exception when no params are passed', () => {
    should.throws(() => {
      new Command();
    }, /Invalid Command instantiation parameters/);
  });

  it('throws an exception when a required param is missing', () => {
    should.throws(() => {
      new Command({});
    });
  });

  it('instantiation success depends on params', (testCb) => {
    should.doesNotThrow(() => {
      const c = new Command({
        command: 'test',
        commandSample: 'thinkcli test',
        description: 'print out help a help statement',
        run() {
          testCb();
        },
      });

      // this will run the test
      c.run();
    })
  });
});
