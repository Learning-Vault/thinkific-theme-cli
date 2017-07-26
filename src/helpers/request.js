const DOMAINS = {
  test: 'localhost:3000',
  local: 'school.lvh.me:3000',
  staging: 'api.thinkific-staging.com',
  production: 'api.thinkific.com',
}
const API_PREFIX = 'api/public';
const VERSION = 'v1';

const buildUrl = (env, endpoint) => {
  // raise exception if arguments are not passed
  if (typeof env === 'undefined' || typeof endpoint === 'undefined') {
    throw Error('Missing arguments for buildUrl function');
  }

  // raise exception the environment is invalid
  if (Object.keys(DOMAINS).indexOf(env) === -1) {
    throw Error('Invalid environment');
  }

  return `${(['local', 'test'].indexOf(env) !== -1) ? 'http' : 'https'}://${DOMAINS[env]}/${API_PREFIX}/${VERSION}/${endpoint}`;
}

module.exports = {
  buildUrl,
}
