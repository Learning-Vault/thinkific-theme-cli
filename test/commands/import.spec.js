

const should = require('should');
const helpers = require('../../src/core/helpers');

describe('All commands available', () => {
  let files;
  before((beforeCb) => {
    files = helpers.getAvailableCommandFiles();
    beforeCb();
  });

  it('should import without validation issues', (testCb) => {
    should.doesNotThrow(() => {
      files.forEach((file) => {
        require( // eslint-disable-line import/no-dynamic-require, global-require
          `../../src/commands/${file}`);
      });
      testCb();
    });
  });
});
