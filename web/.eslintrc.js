module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ],
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
        project: "./tsconfig.json"
    },
    settings: {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect"
        },
    },
    rules: {
        ignoreArrayIndexes: 0
    }
};
