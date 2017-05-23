/**
 * Validate options passed to class
 */
const validateParams = (params) => {
  if (!params) throw Error('Invalid Command instantiation parameters');

  const requiredParams = ['run', 'description', 'commandSample'];
  requiredParams.forEach((requiredParam) => {
    if (!params[requiredParam]) {
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
