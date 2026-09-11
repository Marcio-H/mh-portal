// @ts-check
const eslint = require('@eslint/js');
const angular = require('angular-eslint');
const { defineConfig } = require('eslint/config');
const prettier = require('eslint-config-prettier');
const { importX } = require('eslint-plugin-import-x');
const prettierPlugin = require('eslint-plugin-prettier/recommended');
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: { parserOptions: { projectService: true } },
    extends: [
      angular.configs.tsRecommended,
      eslint.configs.recommended,
      prettier,
      prettierPlugin,
      tseslint.configs.recommended,
      tseslint.configs.stylistic
    ],
    plugins: { 'import-x': importX },
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

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/prefer-as-const': 'error',

      'import-x/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
            orderImportKind: 'asc'
          },
          groups: [
            'builtin', // Módulos do Node.js (ex: fs, path)
            'external', // Pacotes do npm (ex: react, lodash)
            'internal', // Módulos internos (configurados via aliases)
            ['parent', 'sibling'], // Arquivos de pastas superiores ou da mesma pasta
            'index', // Arquivo index do diretório atual
            'object', // Importações de objetos (ex: import _ = require('mod'))
            'type' // Importações de tipos (TypeScript)
          ],
          named: { enabled: true, require: true, types: 'types-last' },
          'newlines-between': 'always',
          sortTypesGroup: true
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      prettier,
      prettierPlugin
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
