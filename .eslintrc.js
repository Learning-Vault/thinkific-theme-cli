module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'airbnb',
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true
  },
  rules: {
    semi: [0, 'never'],
    'import/no-extraneous-dependencies': [ 0 ],
    'import/no-unresolved': [ 0 ],
    'import/no-named-as-default-member': [ 0 ],
    'func-names': [ 0 ],
    'no-underscore-dangle': [ 0 ],
    'prefer-rest-params': [ 0 ],
  },
  globals: {
      moment: true,
  }
}
