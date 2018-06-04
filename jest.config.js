module.exports = {
  testMatch: [
    '<rootDir>/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/container/**',
    '!src/start.js'
  ],
  coverageReporters: [
    'jest-junit', 'lcov', 'text', 'text-summary'
  ],
  testEnvironment: 'node',
  verbose: true
}
