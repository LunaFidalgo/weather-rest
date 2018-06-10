module.exports = {
  testMatch: [
    '<rootDir>/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/container/**',
    '!src/start.js',
    '!src/input_interfaces/http/__tests__/mock_operation.js'
  ],
  coverageReporters: [
    'lcov', 'text', 'text-summary'
  ],
  testEnvironment: 'node',
  verbose: true
}
