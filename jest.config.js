let path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    setupTestFrameworkScriptFile: './tests/unit/setup.js', // 该方法在 jest@23.x 中使用 若升级至 24.x 请使用 setupFilesAfterEnv
    coverageDirectory: resolve('./tests/unit/report'),
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^api': '<rootDir>/src/api',
        '^utils$': '@souche-f2e/souche-util',
        '^const/(.*)$': '<rootDir>/src/utils/const',
        '^spec/(.*)$': '<rootDir>/tests/unit/spec/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    testEnvironment: 'jest-environment-jsdom-global',
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/',
    timers: 'fake'
};
