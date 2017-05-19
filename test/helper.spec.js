const should = require('should');
const helpers = require('../src/helpers');

describe('Helpers', () => {
  describe('has a buildUrl function', () => {
    it('that exists', () => {
      should.exist(helpers.buildUrl);
    });

    it('fomulates a url properly', () => {
      helpers.buildUrl('local', 'hello/world').should.be.equal(
        'http://school.lvh.me:3000/api/public/v1/hello/world');
    });

    it('raises an error if invalid env is passed', () => {
      should.throws(() => {
        helpers.buildUrl('invalid-env', 'hello/world');
      });
    });

    it('raises an error if no parameters has been passed', () => {
      should.throws(() => {
        helpers.buildUrl();
      });
    });
  });
});
