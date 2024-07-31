module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended', 'plugin:storybook/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'ulbi-tv-plugin',
        'unused-imports',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'unused-imports/no-unused-imports': 'error',
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'no-mixed-operators': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',
        'import/extensions': 'off',
        split: 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [
            'off',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'as',
                    'role',
                    'data-testid',
                    'to',
                    'target',
                    'justify',
                    'align',
                    'border',
                    'direction',
                    'gap',
                    'tag',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 125 }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/alt-text': 'off',
        'react-hooks/rules-of-hooks': 'off', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 1, // Checks effect dependencies,
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'react/button-has-type': 'off',
        'arrow-body-style': 'off',
        'linebreak-style': 'off'
        // 'ulbi-tv-plugin/path-checker': ['error', { alias: '@' }],
        // 'ulbi-tv-plugin/layer-imports': [
        //     'error',
        //     {
        //         alias: '@',
        //         ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
        //     },
        // ],
        // 'ulbi-tv-plugin/public-api-imports': [
        //     'error',
        //     {
        //         alias: '@',
        //         testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
        //     },
        // ],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
