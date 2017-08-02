const should = require('should');
const rewire = require('rewire');

const service = rewire('../../src/services/themes.js');

describe('themes service', () => {
  it('should retrieve a module', () => {
    should.exist(service);
  });

  it('provides a get wrapper to get custom site themes', () => {
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

  it('provides a put wrapper to update a custom site theme', () => {
    const themeId = '123';
    const filename = 'pages/home_landing_page.liquid';
    const retrievedData = { custom_site_theme: { hello: 'world' } };
    const fs = {
      readFileSync: (filenameReceived) => {
        filenameReceived.should.equal(filename);
        return 'MANIFEST SCHEMA';
      },
    };
    const request = {
      put: (base, formData, callback) => {
        base.should.equal('custom_site_themes/' + themeId);
        let expectedFormData = {
          form: {
            recreate_manifests: true,
            theme_id: themeId,
            manifest_schema: 'MANIFEST SCHEMA',
          }
        };
        should(formData == expectedFormData).be.ok;
        callback(null, retrievedData);
      },
    };
    service.__set__('fs', fs);
    service.__set__('request', request);
    service.put(themeId, filename, (err, data) => {
      should.not.exist(err);
      should(data).equal(retrievedData);
    });
  });

});
