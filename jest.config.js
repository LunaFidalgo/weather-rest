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
    'lcov', 'text', 'text-summary'
  ],
  testEnvironment: 'node',
  verbose: true
}
