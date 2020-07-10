import { amazonMarketplaces, Recommendations } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Recommendations.name}`, () => {
  itci('should be able to query last updated time for recommendations', async () => {
    expect.assertions(1)

    const recommendations = new Recommendations(httpClient)

    const [response] = await recommendations.getLastUpdatedTimeForRecommendations({
      MarketplaceId: amazonMarketplaces.US.id,
    })

    expect(response).toBeDefined()
  })
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const recommendations = new Recommendations(httpClient)

    const [response] = await recommendations.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
