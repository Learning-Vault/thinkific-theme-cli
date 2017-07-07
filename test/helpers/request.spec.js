const should = require('should');
const requestHelpers = require('../../src/helpers/request');

describe('request Helpers', () => {
  describe('has a buildUrl function', () => {
    it('that exists', () => {
      should.exist(requestHelpers.buildUrl);
    });

    it('fomulates a url properly', () => {
      requestHelpers.buildUrl('local', 'hello/world').should.be.equal(
        'http://school.lvh.me:3000/api/public/v1/hello/world');
    });

    it('raises an error if invalid env is passed', () => {
      should.throws(() => {
        requestHelpers.buildUrl('invalid-env', 'hello/world')
      });
    });

    it('raises an error if no parameters has been passed', () => {
      should.throws(() => {
        requestHelpers.buildUrl();
      });
    });
  });
});
