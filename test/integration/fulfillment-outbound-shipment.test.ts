import { FulfillmentOutboundShipment } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${FulfillmentOutboundShipment.name}`, () => {
  it('should be able to query service status', async () => {
    expect.assertions(1)

    const fos = new FulfillmentOutboundShipment(httpClient)

    const [response] = await fos.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
