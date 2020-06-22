/* eslint-disable eslint-comments/disable-enable-pair, jest/require-top-level-describe */
const { jestPollyConfigService } = require('@scaleleap/jest-polly')

beforeAll(() => {
  jestPollyConfigService.config = {
    secrets: ['AWS_ACCESS_KEY_ID', 'MWS_AUTH_TOKEN', 'SECRET_KEY', 'SELLER_ID'].map(
      (key) => process.env[key],
    ),
    matchRequestsBy: {
      headers: false,
    },
  }
})
