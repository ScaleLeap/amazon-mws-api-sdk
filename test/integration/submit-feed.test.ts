import { jestPollyConfigService } from '@scaleleap/jest-polly'
import { readFileSync } from 'fs'
import { join } from 'path'

import { Feeds, SubmitFeedParameters } from '../../src'
import { Config } from './config'
import { itci } from './it'

/**
 * `submitFeed` modifies URL for each request which normally
 * triggers Polly to re-record, this is a workaround to that
 */
jestPollyConfigService.config = {
  matchRequestsBy: {
    url: false,
  },
}

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`submit-feed`, () => {
  const feeds = new Feeds(httpClient)
  itci('should be able to submit sample feed', async () => {
    expect.assertions(1)

    const parameters: SubmitFeedParameters = {
      FeedContent: readFileSync(join(__dirname, `/submit_feed_sample_feed_content.xml`), {
        encoding: 'utf8',
      }),
      FeedType: '_POST_PRODUCT_DATA_',
    }

    const [response] = await feeds.submitFeed(parameters)

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
