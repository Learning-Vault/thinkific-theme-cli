

let should = require('should');
let helpers = require('../../src/core/helpers');

describe('Helpers', () => {
  describe('has a build_url function', () => {
    let config_mock = {
      api_key: 'asjkdha98v7sdy9asv78bdydsan8dsaijo',
      'course_name': 'school',
      'path': '/tmp',
      env: 'local'
    }

    it('that exists', () => {
      should.exist(helpers.build_url);
    });

    it('fomulates a url properly', () => {
      helpers.build_url('local', 'hello/world').should.be.equal(
        'http://school.lvh.me:3000/api/public/v1/hello/world',
      )
    });

    it('raises an error if invalid env is passed', () => {
      should.throws(() => {
        helpers.build_url('invalid-env', 'hello/world');
      });
    });

    it('raises an error if no parameters has been passed', () => {
      should.throws(() => {
        helpers.build_url();
      });
    });
  });
});
