module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/jest.setup.js', '@scaleleap/jest-polly', './test/polly.js'],
}
