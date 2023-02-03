// redwood-app/.eslintrc.js
module.exports = {
  extends: ['@redwoodjs/eslint-config'],
  root: true,
  rules: {
    'import/order': 'off', // Conflicts with Webstorm's optimize imports
    'prettier/prettier': 'off', // Annoying, handled by IDE
    '@typescript-eslint/no-unused-vars': 'off', // Annoying, handled by IDE
    '@typescript-eslint/no-non-null-assertion': 'off', // Occasionally useful
    'react/prop-types': 'off', // False positives, handled by TS
  },
}
