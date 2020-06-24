import { readFileSync } from 'fs'
import { join } from 'path'

import { Feeds, SubmitFeedParameters } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Feeds.name}`, () => {
  const feeds = new Feeds(httpClient)

  itci('should be able to submit sample feed', async () => {
    expect.assertions(1)

    const parameters: SubmitFeedParameters = {
      FeedContent: readFileSync(
        join(__dirname, `/__fixtures__/submit_feed_sample_feed_content.xml`),
        { encoding: 'utf8' },
      ),
      FeedType: '_POST_PRODUCT_DATA_',
    }

    const [response] = await feeds.submitFeed(parameters)

    expect(response).toBeDefined()
  })

  itci('should be able to list feed submission list', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionList()

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
