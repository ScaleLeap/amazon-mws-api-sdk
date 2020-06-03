import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { HttpClient, Products } from '../../src'
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
describe(`products`, () => {
  const products = new Products(httpClient)
  const ASINList = ['B00D6CMT12', 'B07L1G4YKT', 'B00J8NCVX4']
  const SKUList = ['SPATULA-MWS-TEST', 'B07L1G4YKT', 'B00J8NCVX4']

  itci('should get matching products of more than one sku', async () => {
    expect.assertions(1)

    const [getMatchingProductResponse] = await products.getMatchingProductForId({
      IdList: SKUList,
      MarketplaceId: amazonMarketplaces.CA.id,
      IdType: 'SKU',
    })

    expect(Array.isArray(getMatchingProductResponse)).toBe(true)
  })

  itci('should get matching products of more than one asin', async () => {
    expect.assertions(1)

    const [getMatchingProductResponse] = await products.getMatchingProduct({
      ASINList,
      MarketplaceId: amazonMarketplaces.CA.id,
    })

    expect(Array.isArray(getMatchingProductResponse)).toBe(true)
  })

  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const [response] = await products.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
