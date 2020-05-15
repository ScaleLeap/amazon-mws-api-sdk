import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { HttpClient, Orders } from '../../src'
import { Config } from './config'
import { itci } from './it'

const config = new Config()

const httpClient = new HttpClient({
  marketplace: amazonMarketplaces.CA,
  awsAccessKeyId: config.AWS_ACCESS_KEY_ID,
  mwsAuthToken: config.MWS_AUTH_TOKEN,
  secretKey: config.SECRET_KEY,
  sellerId: config.SELLER_ID,
})

/* eslint-disable jest/no-standalone-expect */
describe(`${Orders.name}`, () => {
  itci('should be able to query list orders', async () => {
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

  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const orders = new Orders(httpClient)

    const [response] = await orders.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
