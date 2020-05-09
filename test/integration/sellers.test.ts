import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { HttpClient, Sellers } from '../../src'
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
describe(`${Sellers.name}`, () => {
  itci('should be able to query marketplace participation', async () => {
    expect.assertions(1)

    const sellers = new Sellers(httpClient)

    const [marketplaceParticipations] = await sellers.listMarketplaceParticipations()

    expect(marketplaceParticipations.ListMarketplaces.Marketplace).toContainEqual(
      expect.objectContaining({ MarketplaceId: amazonMarketplaces.CA.id }),
    )
  })

  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const sellers = new Sellers(httpClient)

    const [response] = await sellers.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
