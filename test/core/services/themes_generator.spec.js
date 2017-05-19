const should = require('should');
const rewire = require('rewire');

const service = rewire('../../../src/core/services/theme_generator');

describe('themes generator service', () => {
  it('should retrieve a module', () => {
    should.exist(service);
  });

  describe('and a download function', () => {
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
  });
});
