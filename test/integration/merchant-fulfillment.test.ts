import { MerchantFulfillment } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${MerchantFulfillment.name}`, () => {
  it('should be able to query service status', async () => {
    expect.assertions(1)

    const merchantFulfillment = new MerchantFulfillment(httpClient)

    const [response] = await merchantFulfillment.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
