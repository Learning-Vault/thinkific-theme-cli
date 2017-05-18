const should = require('should');
const rewire = require('rewire');

const service = rewire('../../../src/core/services/themes.js');

describe('themes Service', () => {
  it('should retrieve a module', () => {
    should.exist(service);
  });

  it('with a get wrapper to get custom site themes', () => {
    const retrievedData = { custom_site_themes: { hello: 'world' } };
    const request = {
      get: (base, callback) => {
        base.should.equal('custom_site_themes');
        callback(null, retrievedData);
      },
    };
    service.__set__('request', request);
    service.get((err, data) => {
      should.not.exist(err);
      should(data).equal(retrievedData.custom_site_themes);
    });
  });

  describe('and a download function', () => {
    it('that throw an error if credentials are missing', () => {
      const helpers = {
        credentialsCreated: () => false,
      };
      service.__set__('helpers', helpers);
      should.throws(() => {
        service.download();
      });
    });
  });
});
