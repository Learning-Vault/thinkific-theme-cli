const should = require('should');
const rewire = require('rewire');
const path = require('path');
const confiSample = require('../fixtures/config-sample.json');
const configHelpers = rewire('../../src/helpers/config');

describe('command Helpers', () => {
  it('should load credentials if they exist', () => {
    const getConfigPath = () => path.resolve(__dirname, '../fixtures/config-sample.json');
    configHelpers.__set__('getConfigPath', getConfigPath);
    configHelpers.getConfigData().should.deepEqual(confiSample);
  });
  it('should load empty credentials path doesn\'t exist', () => {
    configHelpers.__set__('getConfigPath', () => ('invalid-path'));
    configHelpers.getConfigData().should.deepEqual({});
  });
});
