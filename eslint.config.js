// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: { parserOptions: { projectService: true } },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/contextual-decorator': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/inject-at-top': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/no-uncalled-signals': ['error'],
      '@angular-eslint/require-lifecycle-on-prototype': 'error',
      '@angular-eslint/sort-keys-in-type-decorator': [
        'error',
        {
          Component: [
            'selector',
            'imports',
            'standalone',
            'templateUrl',
            'styleUrl',
            'encapsulation',
            'changeDetection'
          ]
        }
      ],
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',

      '@typescript-eslint/consistent-type-imports': ['error'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/prefer-as-const': 'error'
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility
    ],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'TEMPLATE_REFERENCE',
            'STRUCTURAL_DIRECTIVE',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING',
            'OUTPUT_BINDING',
            'TWO_WAY_BINDING'
          ]
        }
      ],
      '@angular-eslint/template/banana-in-box': 'error'
    }
  }
]);
