module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**', '!**/src/infra/database/**', '!**/src/infra/models/**', '!**/src/logger/**']
}
