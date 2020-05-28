// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-var-requires, jest/require-top-level-describe, no-param-reassign */
const { jestPollyConfigService, jestPollyContext } = require('@scaleleap/jest-polly')

beforeAll(() => {
  jestPollyConfigService.config = {
    matchRequestsBy: {
      headers: false,
    },
  }
})

function replaceAll(string, search, replace) {
  return string.split(search).join(replace)
}

const SECRET_KEYS = ['AWS_ACCESS_KEY_ID', 'MWS_AUTH_TOKEN', 'SECRET_KEY', 'SELLER_ID']

beforeEach(() => {
  // removes secrets from stored recordings
  jestPollyContext.polly.server.any().on('beforePersist', (_request, rec) => {
    let text = JSON.stringify(rec)

    SECRET_KEYS.forEach((key) => {
      text = replaceAll(text, process.env[key], 'x')
    })

    Object.assign(rec, JSON.parse(text))
  })
})
