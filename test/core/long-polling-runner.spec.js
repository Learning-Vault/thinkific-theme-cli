const should = require('should');
const sinon = require('sinon');
const rewire = require('rewire');

const LongPollingRunner = rewire('../../src/core/long-polling-runner');

describe('LongPollingRunner', () => {
  it('should call the action at least once', () => {
    let integer = 0;
    const interval = 100;
    const executionTimes = 10;
    const action = sinon.spy(() => {
      integer += 1;
      return executionTimes === integer;
    });
    const runner = LongPollingRunner(interval, action);
    runner.then(() => {
      action.calledOnce.should.be.true();
      integer.should.equal(1);
    });
  });
});
