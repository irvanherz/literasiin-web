module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: [
    'react', 
    '@typescript-eslint/eslint-plugin',
    'formatjs'
  ],
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  root: true,
  env: {
    browser: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': [2, 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/jsx-indent-props': [2, 2],
    "formatjs/no-offset": "error",
    semi: ['error', 'never']
  },
  globals: {
    "google": "readonly"
  }
}
