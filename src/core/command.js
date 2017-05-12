'use strict';

/**
 * Validate options passed to class
 */
var validate_params = function(params) {

  if(!Boolean(params)) throw Error('Invalid Command instantiation parameters');

  var required_params = ['command', 'description'];
  required_params.forEach(function(required_param){
    if( !params.hasOwnProperty(required_param) ) {
      throw Error(required_param + ' is required');
    }
  });
}

var Command = function(params) {
  
  validate_params(params);

}

module.exports = Command;