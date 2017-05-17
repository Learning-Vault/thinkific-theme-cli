
const should = require('should');
const nock = require('nock');
const rewire = require('rewire');
const helpers = require('../../src/core/helpers');

const request = rewire('../../src/core/request');

describe('request', () => {
  describe('has a get function', () => {
    it('that exists', () => {
      should.exist(request.get);
    });

    it('knows how to handle GET requests', (callback) => {
      const url = 'hello/world';
      const data = { id: 1, name: 'hello world' };
      const headers = { headers: {
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

      helpers.build_url = () => `http://school.lvh.me:3000/api/public/v1/${url}`

      request.__set__('helpers', helpers);

      const server = nock('http://school.lvh.me:3000', headers)
        .get(`/api/public/v1/${url}`)
        .reply(200, data);

      request.get('hello/world', (err, data) => {
        data.should.deepEqual(data);
        callback();
      });
    });
  });
});
