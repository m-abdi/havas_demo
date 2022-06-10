module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
  },
};
