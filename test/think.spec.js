'use strict';

var should = require('should');
var rewire = require('rewire');
var think = rewire('../think');

describe('think.js', function() {
  it('can be exported', function() {
    should.exist(think);
  });
});