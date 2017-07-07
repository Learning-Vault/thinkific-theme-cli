const should = require('should');
const configHelpers = require('../../src/helpers/themes.js');

console.log(configHelpers);

describe('theme Helpers', () => {
  describe('isHiddenFile', () => {
    it('considers .dir/file hidden', () => {
      should(configHelpers.isHiddenFile('.dir/file')).be.true();
    });

    it('considers dir/.dir/file hidden', () => {
      should(configHelpers.isHiddenFile('dir/.dir/file')).be.true();
    });

    it('considers dir/.file hidden', () => {
      should(configHelpers.isHiddenFile('dir/.file')).be.true();
    });

    it('considers dir/dir/.file hidden', () => {
      should(configHelpers.isHiddenFile('dir/dir/.file')).be.true();
    });

    it('considers ./dir/file not hidden', () => {
      should(configHelpers.isHiddenFile('./dir/file')).be.false();
    });
  });
});
