const should = require('should');
const rewire = require('rewire');
const sinon = require('sinon');
const fixture = require('../fixtures/config-sample.json');

const service = rewire('../../src/services/theme_generator');

describe('themes generator service', () => {
  describe('has a download function', () => {
    it('that throws an error if credentials are missing', () => {
      const helpers = {
        getConfigData: () => {},
      };
      service.__set__('helpers', helpers);
      should.throws(() => {
        service.download();
      });
    });

    it('throws an error if the workspace doesn\'t exist', () => {
      const helpers = {
        getConfigData: () => ({ path: 'invalid-path' }),
      };
      service.__set__('helpers', helpers);
      should.throws(() => {
        service.download();
      });
    });

    it('hits the server to get the generation started', (testCb) => {
      const expectedResponse = { hello: 'world' };
      const request = {
        post: (base, data, callback) => {
          callback(null, expectedResponse);
        },
      };
      const fs = {
        existsSync: () => false,
      }
      service.__set__('request', request);
      service.__set__('print', () => {});
      service.__set__('fs', fs);
      service.__get__('generateTheme')(12, (err, response) => {
        should.not.exist(err);
        should(response).deepEqual(expectedResponse);
        testCb()
      });
    });

    it('theme generation fails if the theme has already been downloaded', () => {
      const expectedResponse = { hello: 'world' };
      const request = {
        post: (base, data, callback) => {
          callback(null, expectedResponse);
        },
      };
      const fs = {
        existsSync: () => true,
      }
      service.__set__('request', request);
      service.__set__('print', () => {});
      service.__set__('fs', fs);

      should.throws(() => {
        service.__get__('generateTheme')(12, () => {});
      });
    });

    it('hits the server until server has finished generating the theme', (testCb) => {
      const data = {
        theme_id: 123,
        theme_name: 'Lovely Theme',
        job_id: 'hello-world',
        url: 'https://hello.world',
      };
      let themeGenerated = false;
      const request = {
        get: sinon.spy((base, callback) => {
          // this logic will make the checkThemeGeneration function
          // call the request twice
          if (!themeGenerated) {
            themeGenerated = true;
            callback(null, { status: 'processing' });
          } else {
            callback(null, { status: 'complete' });
          }
        }),
      };
      service.__set__('request', request);
      service.__set__('print', () => {});
      service.__get__('checkThemeGeneration')(data, (err) => {
        should.not.exist(err);
        should(request.get.calledTwice).be.true();
        testCb();
      });
    });

    it('extracts the theme into workspace', (testCb) => {
      const data = {
        tmp: 'hello-world',
      };
      const configHelpers = { getConfigData: () => fixture };
      const extract = (tmp, opts, callback) => {
        tmp.should.equal(data.tmp);
        callback();
      };

      service.__set__('extract', extract);
      service.__set__('configHelpers', configHelpers);
      service.__set__('configHelpers', configHelpers);

      service.__get__('extractTheme')(data, (err) => {
        should.not.exist(err);
        testCb();
      });
    });
  });
});
