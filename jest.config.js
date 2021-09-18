// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv/config')

const testPathIgnorePatterns = ['/node_modules/']

// skips integration tests if the required env vars aren't set
// this can happen:
//
//  - in CI, during a PR
//  - locally during development, when .env was not set
if (
  !(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.MWS_AUTH_TOKEN &&
    process.env.SECRET_KEY &&
    process.env.SELLER_ID
  )
) {
  testPathIgnorePatterns.push('/test/integration/')
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/jest.setup.js', '@scaleleap/jest-polly', './test/polly.js'],
  testPathIgnorePatterns,
}
