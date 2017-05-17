'use strict'

var should = require('should');
var helpers = require('../../src/core/helpers');

describe('Helpers', function() {
  describe('has a build_url function', function() {

    var config_mock = {
      "api_key": "asjkdha98v7sdy9asv78bdydsan8dsaijo",
      "course_name": "school",
      "path": "/tmp",
      "env": "local"
    }

    it('that exists', function() {
      should.exist(helpers.build_url);
    });

    it('fomulates a url properly', function() {
      helpers.build_url('local', 'hello/world').should.be.equal(
        'http://school.lvh.me:3000/api/public/v1/hello/world'
      )
    });

    it('raises an error if invalid env is passed', function() {
      should.throws(function(){
        helpers.build_url('invalid-env', 'hello/world');
      });
    });

    it('raises an error if no parameters has been passed', function() {
      should.throws(function(){
        helpers.build_url();
      });
    });
  });
  
});