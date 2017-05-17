'use strict'

var should = require('should');
var nock = require('nock');
var rewire = require('rewire');
var helpers = require('../../src/core/helpers');
var request = rewire('../../src/core/request');

describe('request', function() {
  
  describe('has a get function', function() {

    var config_mock = {
      "api_key": "asjkdha98v7sdy9asv78bdydsan8dsaijo",
      "course_name": "school",
      "path": "/tmp",
      "env": "local"
    }

    it('that exists', function() {
      should.exist(request.get);
    });

    it('knows how to handle GET requests', function(callback) {
      
      var url = 'hello/world';
      var data = {id: 1, name: 'hello world'};
      var headers = {headers: {
          'x-auth-api-key': () => {return true},
          'X-auth-subdomain': () => {return true}
        }
      };
      
      helpers.get_config_data = () => {
        return {
          'api_key': '1e8af83bf61d68de8d08a1f4dee08cdc',
          'course_name': 'school',
          'path': __dirname,
          'env': 'test'
        };
      };

      helpers.build_url = () => {
        return 'http://school.lvh.me:3000/api/public/v1/' + url;
      }

      request.__set__('helpers', helpers);
      
      var server = nock('http://school.lvh.me:3000', headers)
        .get('/api/public/v1/' + url)
        .reply(200, data);
      
      request.get('hello/world', (err, data) => {
        data.should.deepEqual(data);
        callback();
      });
    });
  });
  
});