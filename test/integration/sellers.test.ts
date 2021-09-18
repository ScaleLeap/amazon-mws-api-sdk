import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { Sellers } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${Sellers.name}`, () => {
  it('should be able to query marketplace participation', async () => {
    expect.assertions(1)

    const sellers = new Sellers(httpClient)

    const [marketplaceParticipations] = await sellers.listMarketplaceParticipations()

    expect(marketplaceParticipations.ListMarketplaces).toContainEqual(
      expect.objectContaining({ MarketplaceId: amazonMarketplaces.CA.id }),
    )
  })

  it('should be able to query service status', async () => {
    expect.assertions(1)

    const sellers = new Sellers(httpClient)

    const [response] = await sellers.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
