
const should = require('should');
const nock = require('nock');
const rewire = require('rewire');
const helpers = require('../../src/core/helpers');

const request = rewire('../../src/core/request');

describe('request', () => {
  describe('has a `get` function', () => {
    it('that exists', () => {
      should.exist(request.get);
    });

    it('knows how to handle GET requests', (callback) => {
      const url = 'hello/world';
      const responseData = { id: 1, name: 'hello world' };
      const headers = {
        headers: {
          'x-auth-api-key': () => true,
          'X-auth-subdomain': () => true,
        },
      };

      helpers.get_config_data = () => ({
        api_key: '1e8af83bf61d68de8d08a1f4dee08cdc',
        course_name: 'school',
        path: __dirname,
        env: 'test',
      });
      helpers.buildUrl = () => `http://school.lvh.me:3000/api/public/v1/${url}`
      request.__set__('helpers', helpers);

      nock('http://school.lvh.me:3000', headers)
        .get(`/api/public/v1/${url}`)
        .reply(200, responseData);

      request.get('hello/world', (err, data) => {
        should.not.exist(err);
        data.should.deepEqual(responseData);
        callback();
      });
    });
  });

  describe('has a `post` function', () => {
    it('knows how to handle POST requests', (callback) => {
      const url = 'hello/world';
      const responseData = { theme_id: 1, job_id: 'blah', url: 'http://localhost:3000/file' };
      const postData = { theme_id: responseData.theme_id };
      const headers = {
        headers: {
          'x-auth-api-key': () => true,
          'X-auth-subdomain': () => true,
        },
      };

      helpers.get_config_data = () => ({
        api_key: '1e8af83bf61d68de8d08a1f4dee08cdc',
        course_name: 'school',
        path: __dirname,
        env: 'test',
      });
      helpers.buildUrl = () => `http://school.lvh.me:3000/api/public/v1/${url}`
      request.__set__('helpers', helpers);

      nock('http://school.lvh.me:3000', headers)
        .post(`/api/public/v1/${url}`)
        .reply(200, responseData);

      request.post('hello/world', postData, (err, data) => {
        should.not.exist(err);
        data.should.deepEqual(responseData);
        callback();
      });
    });
  });
});
