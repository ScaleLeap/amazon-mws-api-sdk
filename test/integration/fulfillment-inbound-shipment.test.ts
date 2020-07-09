import { FulfillmentInboundShipment } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${FulfillmentInboundShipment.name}`, () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const fulfillmentInboundShipment = new FulfillmentInboundShipment(httpClient)

    const [response] = await fulfillmentInboundShipment.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
