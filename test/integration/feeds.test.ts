import { Feeds } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Feeds.name}`, () => {
  const feeds = new Feeds(httpClient)

  itci('should be able to list feed submission list', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionList()

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
