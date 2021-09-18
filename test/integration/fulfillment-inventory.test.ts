import { FulfillmentInventory, ListInventorySupplyRequestParameters } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${FulfillmentInventory.name}`, () => {
  it('should be able to get list of inventory supply', async () => {
    expect.assertions(1)

    const parameters: ListInventorySupplyRequestParameters = {
      QueryStartDateTime: new Date('2021-03-11'),
    }

    const fulfillmentInventory = new FulfillmentInventory(httpClient)

    const [marketplaceParticipations] = await fulfillmentInventory.listInventorySupply(parameters)

    expect(marketplaceParticipations).toBeDefined()
  })

  it('should be able to query service status', async () => {
    expect.assertions(1)

    const fulfillmentInventory = new FulfillmentInventory(httpClient)

    const [response] = await fulfillmentInventory.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
