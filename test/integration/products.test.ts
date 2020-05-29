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
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const products = new Products(httpClient)

    const [response] = await products.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
