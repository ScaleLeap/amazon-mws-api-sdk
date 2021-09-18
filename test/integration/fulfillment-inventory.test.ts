import { jestPollyConfigService } from '@scaleleap/jest-polly'

import { FulfillmentInventory, ListInventorySupplyRequestParameters } from '../../src'
import { Config } from './config'

jestPollyConfigService.config.matchRequestsBy = {
  ...jestPollyConfigService.config.matchRequestsBy,
  url: {
    query: false,
  },
}

const httpClient = new Config().createHttpClient()

describe(`${FulfillmentInventory.name}`, () => {
  it('should be able to get list of inventory supply', async () => {
    expect.assertions(1)

    const parameters: ListInventorySupplyRequestParameters = {
      SellerSkus: ['x'],
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
