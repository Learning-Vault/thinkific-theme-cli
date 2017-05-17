

/**
 * Validate options passed to class
 */
const validateParams = function (params) {
  if (!params) throw Error('Invalid Command instantiation parameters');

  const requiredParams = ['run', 'description', 'command_sample'];
  requiredParams.forEach((requiredParam) => {
    if (!params.requiredParam) {
      throw Error(`${requiredParam} is required`);
    }
  });
}

const Command = function (params) {
  validateParams(params);
  this.options = params;

  // setup function that will execute function
  this.run = this.options.run;
}

module.exports = Command;
