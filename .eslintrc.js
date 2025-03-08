module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        arrowParens: 'always',
        printWidth: 100,
      },
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
