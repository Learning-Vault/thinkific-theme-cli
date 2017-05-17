'use strict'

var should = require('should');
var service = require('../../src/core/services/themes');
var helpers = require('../../src/core/helpers');

describe('themes Service', function() {

  it('should retrieve a module', function() {
    should.exist(service);
  });

  it('should handle custom site theme retrievals', function() {
    console.log('done', body);
    service.get(function(body) {
      console.log('done', body);
    });
  });

});