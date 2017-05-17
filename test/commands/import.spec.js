

const should = require('should');
const helpers = require('../../src/core/helpers');

describe('All commands available', () => {
  let files;
  before((before_cb) => {
    files = helpers.get_available_command_files();
    before_cb();
  });

  it('should import without validation issues', (test_cb) => {
    should.doesNotThrow(() => {
      files.forEach((file) => {
        require(`../../src/commands/${file}`);
      });
      test_cb();
    });
  });
});
