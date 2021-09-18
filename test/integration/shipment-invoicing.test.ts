import { ShipmentInvoicing } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${ShipmentInvoicing.name}`, () => {
  it('should be able to query service status', async () => {
    expect.assertions(1)

    const shipmentInvoicing = new ShipmentInvoicing(httpClient)

    const [response] = await shipmentInvoicing.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
