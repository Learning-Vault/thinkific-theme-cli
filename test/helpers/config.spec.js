const should = require('should');
const rewire = require('rewire');
const path = require('path');
const confiSample = require('../fixtures/config-sample.json');

const configHelpers = rewire('../../src/helpers/config');

describe('command Helpers', () => {
  it('should load credentials if they exist', () => {
    const getConfigPath = () => path.resolve(__dirname, '../fixtures/config-sample.json');
    configHelpers.__set__('getConfigPath', getConfigPath);
    should(configHelpers.getConfigData()).deepEqual(confiSample);
  });

  it('should load empty credentials path doesn\'t exist', () => {
    configHelpers.__set__('getConfigPath', () => ('invalid-path'));
    should(configHelpers.getConfigData()).deepEqual({});
  });

  it('should serialize credentials upon write execution', () => {
    const expectedPath = path.resolve(__dirname, '../fixtures/config-sample.json');
    const expectedData = { hello: 'world' };
    const fs = {
      writeFile: (configPath, data) => {
        should(configPath).be.equal(expectedPath);
        should(data).be.equal(expectedData);
      },
    }
    const getConfigPath = () => expectedPath;
    configHelpers.__set__('getConfigPath', getConfigPath);
    configHelpers.__set__('fs', fs);
    should(configHelpers.setConfigData(expectedData, () => {}))
  });
});
