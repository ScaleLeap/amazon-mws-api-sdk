import { NextToken, ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

function mockEnum() {
  /**
   * Mock everything in purify-ts, restore it back to normal,
   *  except for `enumeration` which will be stubbed to accept
   * https://github.com/facebook/jest/issues/936#issuecomment-265074320
   */
  const original = jest.requireActual('purify-ts')

  return {
    ...original, // Pass down all the exported objects
    enumeration: <T extends Record<string, string | number>>(enumeration: T) => {
      const enumValues = Object.values(enumeration)

      return original.Codec.custom({
        decode: (input: string | number) => {
          if (typeof input !== 'string' && typeof input !== 'number') {
            return original.Left(`Expected enum, received ${input}`)
          }

          const enumIndex = enumValues.indexOf(input)

          return enumIndex !== -1 || input === 'String'
            ? original.Right((enumValues[enumIndex] as T[keyof T]) || 'String')
            : original.Left(`Expected enum, received ${input}`)
        },
        encode: original.identity,
        schema: () => ({ enum: enumValues }),
      })
    },
  }
}
jest.mock('purify-ts', () => mockEnum())

describe('recommendations', () => {
  describe('listRecommendationsByNextToken', () => {
    const mockNextToken = new NextToken('ListRecommendations', '123')

    it('returns a list of recommendations if next token is valid', async () => {
      expect.assertions(1)

      const mockListRecommendationsNT = createMockHttpClient(
        'recommendations_list_recommendations_nt',
      )

      expect(
        await mockListRecommendationsNT.recommendations.listRecommendationsByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.recommendations.listRecommendationsByNextToken(mockNextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listRecommendations', () => {
    const parameters = {
      MarketplaceId: '',
    }

    it('returns a list of recommendations if succesful', async () => {
      expect.assertions(1)

      const mockListRecommendations = createMockHttpClient('recommendations_list_recommendations')

      expect(
        await mockListRecommendations.recommendations.listRecommendations(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.recommendations.listRecommendations(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

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
