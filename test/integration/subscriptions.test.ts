import { Subscriptions } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe('subscriptions', () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const subscriptions = new Subscriptions(httpClient)

    const [response] = await subscriptions.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
