'use strict';

var should = require('should');
var helpers = require('../../src/core/helpers');

describe('All commands available', function() {

  var files;
  before(function(before_cb) {
    files = helpers.get_available_command_files();
    before_cb();
  });
  
  it('should import without validation issues', function(test_cb) {
    should.doesNotThrow(function(){
      
      files.forEach(function(file) {
        require('../../src/commands/' + file);
      });
      test_cb();
    });
  });

});