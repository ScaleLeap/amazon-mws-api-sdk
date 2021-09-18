import { Feeds, GetFeedSubmissionResultParameters } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Feeds.name}`, () => {
  const feeds = new Feeds(httpClient)

  it('should be able to get XML string from get submission result', async () => {
    expect.assertions(1)

    const parameters: GetFeedSubmissionResultParameters = {
      FeedSubmissionId: '51793018437',
      format: 'xml',
    }

    const [response] = await feeds.getFeedSubmissionResult(parameters)

    expect(typeof response).toBe('string')
  })

  it('should be able to get an XML string and parse it to JSON from get submission result', async () => {
    expect.assertions(1)

    const parameters: GetFeedSubmissionResultParameters = {
      FeedSubmissionId: '51793018437',
      format: 'json',
    }

    const [response] = await feeds.getFeedSubmissionResult(parameters)

    expect(typeof response).toBe('object')
  })

  it('should be able to list feed recently submitted', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionList()

    expect(response.FeedSubmissionInfo).toBeDefined()
  })

  it('should succesfully get count of feeds', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionCount()

    expect(typeof response.Count).toBe('number')
  })

  it('should be able to list feed submission list', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionList()

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
