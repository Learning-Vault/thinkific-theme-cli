const should = require('should');
const rewire = require('rewire');

const service = rewire('../../src/core/services/themes');


describe('themes Service', () => {
  it('should retrieve a module', () => {
    should.exist(service);
  });

  it('with a get wrapper to get custom site themes', () => {
    const retrievedData = { hello: 'world' };
    const request = (base, callback) => {
      base.should.equal('custom_site_themes');
      callback(null, retrievedData);
    }
    service.__set__('request', request);
    service.get((err, data) => {
      should.not.exist(err);
      data.should.equal(retrievedData);
    });
  });
});
