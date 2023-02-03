// redwood-app/.eslintrc.js
module.exports = {
  plugins: ['security', 'unicorn', 'compat'],
  extends: [
    '@redwoodjs/eslint-config',
    'plugin:security/recommended',
    'plugin:no-unsanitized/DOM',
  ],
  env: {
    browser: true,
    node: true,
  },
  root: true,
  rules: {
    // Override extended configs - Should have justification
    'import/order': 'off', // Conflicts with Webstorm's optimize imports
    'prettier/prettier': 'off', // Handled by IDE
    '@typescript-eslint/no-unused-vars': 'off', // Handled by IDE
    '@typescript-eslint/no-non-null-assertion': 'off', // Occasionally useful to be able to do this
    'react/prop-types': 'off', // False positives, handled by TS
    'security/detect-object-injection': 'off', // Too many false positives
    // Additional rules
    'import/no-extraneous-dependencies': ['error', {}],
    'no-var': 'error',
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: false },
    ],
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/import-index': 'error',
    'unicorn/import-style': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-fn-reference-in-iterator': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-dataset': 'error',
    'unicorn/prefer-event-key': 'error',
    'unicorn/prefer-flat-map': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-node-append': 'error',
    'unicorn/prefer-node-remove': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-replace-all': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-text-content': 'error',
    'unicorn/prefer-trim-start-end': 'error',
    'unicorn/throw-new-error': 'error',
    'react/self-closing-comp': 'error',
    'react/destructuring-assignment': 'error',
    'react/boolean-prop-naming': 'error',
    'compat/compat': 'error',
    'no-restricted-syntax': [
      'error',
      {
        message:
          'JSON.stringify will fail with circular references, errors and undefined. Try a safer method such as convertToString from helpers.',
        selector: 'MemberExpression > Identifier[name="stringify"]',
      },
    ],
  },
}
