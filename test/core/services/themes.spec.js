

const should = require('should');
const service = require('../../src/core/services/themes');
const helpers = require('../../src/core/helpers');

describe('themes Service', () => {
  it('should retrieve a module', () => {
    should.exist(service);
  });

  it('should handle custom site theme retrievals', () => {
    console.log('done', body);
    service.get((body) => {
      console.log('done', body);
    });
  });
});
