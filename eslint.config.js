module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-empty': 'error',
      'no-multiple-empty-lines': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];
