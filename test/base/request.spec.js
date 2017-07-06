
const should = require('should');
const nock = require('nock');
const rewire = require('rewire');

const request = rewire('../../src/base/request');

describe('request', () => {
  let configHelpers;
  let requestHelpers;
  let url;

  before((callback) => {
    url = 'hello/world';
    configHelpers = {
      getConfigData: () => ({
        api_key: '1e8af83bf61d68de8d08a1f4dee08cdc',
        subdomain: 'school',
        path: __dirname,
        env: 'test',
      }),
    }
    requestHelpers = {
      buildUrl: () => `http://school.lvh.me:3000/api/public/v1/${url}`,
    }
    request.__set__('configHelpers', configHelpers);
    request.__set__('requestHelpers', requestHelpers);
    callback();
  });

  describe('has a `get` function', () => {
    it('knows how to handle GET requests', (callback) => {
      const responseData = { id: 1, name: 'hello world' };
      const headers = {
        headers: {
          'x-auth-api-key': () => true,
          'X-auth-subdomain': () => true,
        },
      };
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
      const responseData = { theme_id: 1, job_id: 'blah', url: 'http://localhost:3000/file' };
      const postData = { theme_id: responseData.theme_id };
      const headers = {
        headers: {
          'x-auth-api-key': () => true,
          'X-auth-subdomain': () => true,
        },
      };

      nock('http://school.lvh.me:3000', headers)
        .post(`/api/public/v1/${url}`)
        .reply(200, responseData);

      request.post('hello/world', postData, false, (err, data) => {
        should.not.exist(err);
        data.should.deepEqual(responseData);
        callback();
      });
    });
  });
});
