import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { Orders } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${Orders.name}`, () => {
  it('should be able to query list orders', async () => {
    expect.assertions(1)

    const orders = new Orders(httpClient)
    const createdAfter = new Date()
    createdAfter.setFullYear(2017)

    const [listOrders] = await orders.listOrders({
      MarketplaceId: [amazonMarketplaces.CA.id],
      CreatedAfter: createdAfter,
    })

    expect(listOrders.Orders).toStrictEqual([])
  })

  it('should be able to query service status', async () => {
    expect.assertions(1)

    const orders = new Orders(httpClient)

    const [response] = await orders.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
