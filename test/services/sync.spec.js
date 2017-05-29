const should = require('should');
const rewire = require('rewire');
const fixture = require('../fixtures/config-sample.json');

const service = rewire('../../src/services/sync');

describe('sync service', () => {
  let themeId;
  before((beforeCb) => {
    themeId = Object.keys(fixture.themes)[0];
    beforeCb();
  });

  describe('has a `run` function', () => {
    it('that throws an error if credentials are missing', () => {
      service.__set__('print', () => {});
      should.throws(() => {
        service.run();
      });
    });

    it('doesn\'t throw an error when theme id is passed', () => {
      service.__set__('configHelpers', {
        getConfigData: () => fixture,
        themeDirExistsSync: () => true,
      });
      should.doesNotThrow(() => {
        service.run(themeId);
      });
    });

    it('throws an error when theme id passed is invalid', () => {
      should.throws(() => {
        service.run(13);
      });
    });

    it('throws an error when theme id was not found', () => {
      should.throws(() => {
        service.run(13);
      });
    });
  });
});
