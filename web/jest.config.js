// eslint-disable-next-line no-undef
module.exports = {
    globals: {
        window: {},
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|gltf)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
        'google/model-viewer': '<rootDir>/__mocks__/fileMock.js',
    },
    roots: ['<rootDir>'],
    // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    // testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [`node_modules`],
};
