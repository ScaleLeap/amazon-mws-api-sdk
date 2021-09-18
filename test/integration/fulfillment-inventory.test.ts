import { FulfillmentInventory, ListInventorySupplyRequestParameters } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${FulfillmentInventory.name}`, () => {
  it('should be able to get list of inventory supply', async () => {
    expect.assertions(1)

    const date = new Date(Date.now() - 150 * 24 * 60 * 60 * 1000) // Date from 150 days ago

    const parameters: ListInventorySupplyRequestParameters = {
      QueryStartDateTime: date,
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
/* eslint-enable jest/no-standalone-expect */
