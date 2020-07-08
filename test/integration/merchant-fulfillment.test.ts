import { MerchantFulfillment } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${MerchantFulfillment.name}`, () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const merchantFulfillment = new MerchantFulfillment(httpClient)

    const [response] = await merchantFulfillment.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
