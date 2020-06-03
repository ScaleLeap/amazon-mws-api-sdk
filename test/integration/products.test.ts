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
  const MarketplaceId = amazonMarketplaces.CA.id
  const ASINList = ['B00D6CMT12', 'B07L1G4YKT', 'B00J8NCVX4']
  const SKUList = ['SPATULA-MWS-TEST', 'PRESS001', 'B00J8NCVX4']
  const InvalidASINList = ['PRESS001', 'B07L1G4YKT', 'B00J8NCVX4']

  itci('should be able to handle invalid and valid asins', async () => {
    expect.assertions(1)

    const [getMatchingProductResponse] = await products.getMatchingProduct({
      ASINList: InvalidASINList,
      MarketplaceId,
    })

    expect(Array.isArray(getMatchingProductResponse)).toBe(true)
  })

  // itci('should be able to handle invalid and valid asins', async () => {
  //   expect.assertions(1)

  //   const [getMatchingProductResponse] = await products.getMatchingProductForId({
  //     IdList: InvalidASINList,
  //     MarketplaceId,
  //     IdType: 'ASIN',
  //   })

  //   expect(Array.isArray(getMatchingProductResponse)).toBe(true)
  // })

  /**
   * @todo: improve assertions
   */
  itci('should get competitive pricing for asin if succesful', async () => {
    expect.assertions(1)

    const [getCompetitivePricingForAsinResponse] = await products.getCompetitivePricingForAsin({
      MarketplaceId,
      ASINList,
    })

    expect(Array.isArray(getCompetitivePricingForAsinResponse)).toBe(true)
  })

  itci('should get competitive pricing for sku if succesful', async () => {
    expect.assertions(1)

    const [getCompetitivePricingForSkuResponse] = await products.getCompetitivePricingForSku({
      MarketplaceId,
      SellerSKUList: SKUList,
    })

    expect(Array.isArray(getCompetitivePricingForSkuResponse)).toBe(true)
  })

  itci('should get matching products of more than one sku', async () => {
    expect.assertions(1)

    const [getMatchingProductResponse] = await products.getMatchingProductForId({
      IdList: SKUList,
      MarketplaceId,
      IdType: 'SellerSKU',
    })

    expect(Array.isArray(getMatchingProductResponse)).toBe(true)
  })

  itci('should get matching products of more than one asin', async () => {
    expect.assertions(1)

    const [getMatchingProductResponse] = await products.getMatchingProduct({
      ASINList,
      MarketplaceId,
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
