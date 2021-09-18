import { amazonMarketplaces, Recommendations } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${Recommendations.name}`, () => {
  it('should be able to query last updated time for recommendations', async () => {
    expect.assertions(1)

    const recommendations = new Recommendations(httpClient)

    const [response] = await recommendations.getLastUpdatedTimeForRecommendations({
      MarketplaceId: amazonMarketplaces.US.id,
    })

    expect(response).toBeDefined()
  })

  it('should be able to query service status', async () => {
    expect.assertions(1)

    const recommendations = new Recommendations(httpClient)

    const [response] = await recommendations.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
