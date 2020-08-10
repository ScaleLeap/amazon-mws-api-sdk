import { Feeds } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Feeds.name}`, () => {
  const feeds = new Feeds(httpClient)

  itci('should be able to get XML string from get submission result', async () => {
    expect.assertions(1)

    const parameters = {
      FeedSubmissionId: '51793018437',
      format: 'xml',
    }

    const [response] = await feeds.getFeedSubmissionResult(parameters)

    expect(typeof response).toBe('string')
  })

  itci(
    'should be able to get an XML string and parse it to JSON from get submission result',
    async () => {
      expect.assertions(1)

      const parameters = {
        FeedSubmissionId: '51793018437',
        format: 'json',
      }

      const [response] = await feeds.getFeedSubmissionResult(parameters)

      expect(typeof response).toBe('object')
    },
  )

  itci('should be able to list feed recently submitted', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionList()

    expect(response.FeedSubmissionInfo).toBeDefined()
  })

  itci('should succesfully get count of feeds', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionCount()

    expect(typeof response.Count).toBe('number')
  })

  itci('should be able to list feed submission list', async () => {
    expect.assertions(1)

    const [response] = await feeds.getFeedSubmissionList()

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
