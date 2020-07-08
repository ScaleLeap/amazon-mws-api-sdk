import { ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('recommendations', () => {
  describe('getLastUpdatedTimeForRecommendations', () => {
    const parameters = {
      MarketplaceId: '',
    }

    it('returns last updated time for recommendations if succesful', async () => {
      expect.assertions(1)

      const mockGetLastUpdatedTimeForRecommendations = createMockHttpClient(
        'recommendations_get_last_updated_time_for_recommendations',
      )

      expect(
        await mockGetLastUpdatedTimeForRecommendations.recommendations.getLastUpdatedTimeForRecommendations(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.recommendations.getLastUpdatedTimeForRecommendations(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.recommendations.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.recommendations.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
