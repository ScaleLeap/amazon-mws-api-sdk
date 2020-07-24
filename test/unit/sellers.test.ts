import { NextToken } from '../../src/parsing'
import {
  createMockHttpClient,
  mockMwsServiceStatus,
  mockParsingError,
  parsingErrorRegex,
} from '../utils'

const mockMwsMarketplaceParticipations = createMockHttpClient(
  'sellers_list_marketplace_participations',
)

const mockMwsMarketplaceParticipationsNT = createMockHttpClient(
  'sellers_list_marketplace_participations_nt',
)

const mockNextToken = new NextToken('ListMarketplaceParticipations', '123')

describe('sellers', () => {
  describe('listMarketplaceParticipations', () => {
    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsMarketplaceParticipations.sellers.listMarketplaceParticipations(),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.sellers.listMarketplaceParticipations()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('listMarketplaceParticipationsByNextToken', () => {
    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsMarketplaceParticipationsNT.sellers.listMarketplaceParticipationsByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.sellers.listMarketplaceParticipationsByNextToken(mockNextToken),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.sellers.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.sellers.getServiceStatus()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })
})
