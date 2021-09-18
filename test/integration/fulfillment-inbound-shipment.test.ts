import { FulfillmentInboundShipment } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${FulfillmentInboundShipment.name}`, () => {
  it('should be able to query service status', async () => {
    expect.assertions(1)

    const fulfillmentInboundShipment = new FulfillmentInboundShipment(httpClient)

    const [response] = await fulfillmentInboundShipment.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
