// eslint-disable-next-line no-undef
module.exports = {
    env: {
        'react-native/react-native': true,
        es2021: true,
    },
    root: true,
    globals: {
        JSX: true,
        NodeJS: true,
    },
    extends: [
        'plugin:@nx/react',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        '../../.eslintrc.json',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'prettier',
        'react',
        'import',
        'eslint-plugin-node',
        'unused-imports',
        'react-native',
    ],
    ignorePatterns: [
        '!**/*', // Ważne, aby zachować zgodność z libs
        'public',
        '.cache',
        'node_modules',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            rules: {
                'linebreak-style': 'off',
                'end-of-line': 'off',
                camelcase: 'off',
                'react/jsx-no-literals': 'off',
                'react/react-in-jsx-scope': 'off',
                'no-empty-pattern': 'off',
                'no-eval': 'error',
                'import/first': 'error',
                '@typescript-eslint/explicit-function-return-type': 'off',
                'react-hooks/exhaustive-deps': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                'no-unused-vars': 'off',

                'unused-imports/no-unused-imports': 'error',
                'react-native/no-inline-styles': 'warn',
        'unused-imports/no-unused-vars': [
                    'warn',
                    {
                        vars: 'all',
                        varsIgnorePattern: '^_',
                        args: 'after-used',
                        argsIgnorePattern: '^_',
                    },
                ],
                'react/prop-types': 'off',
                'no-console': [
                    'off',
                    {
                        allow: ['warn', 'error', 'info'],
                    },
                ],
                'no-debugger': 'off',
                'import/order': [
                    'error',
                    {
                        groups: [
                            'builtin',
                            'external',
                            ['internal', 'unknown'],
                            'parent',
                            ['sibling', 'index'],
                        ],
                        'newlines-between': 'always',
                    },
                ],
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'linebreak-style': 'off',
                'end-of-line': 'off',
            },
        },
        {
            files: ['*.js', '*.jsx'],
            rules: {
                'linebreak-style': 'off',
                'end-of-line': 'off',
            },
        },
    ],
};
