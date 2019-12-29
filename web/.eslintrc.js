module.exports =  {
    parser:  '@typescript-eslint/parser',
    plugins:['react', '@typescript-eslint', 'prettier'],
    env: {
        browser: true,
        jasmine: true,
        jest: true
    },
    extends:  [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],

    parserOptions:  {
        ecmaVersion:  2018,
        jsx: true,
        sourceType:  'module',
        project: "./tsconfig.json"
    },
    settings: {
        react: {
            pragma: "React",
            version: "detect"
        },
    },
    rules: {
        ignoreArrayIndexes: 0,
        '@typescript-eslint/no-unused-vars': ['error']
    }
};
