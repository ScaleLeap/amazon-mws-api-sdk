import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
import { NextToken } from '../../src/parsing'
import { getFixture } from '../utils'

const httpConfig = {
  awsAccessKeyId: '',
  marketplace: amazonMarketplaces.CA,
  mwsAuthToken: '',
  secretKey: '',
  sellerId: '',
}

const mockMwsMarketplaceParticipations = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('sellers_list_marketplace_participations'),
      headers: {
        'x-mws-request-id': '0',
        'x-mws-timestamp': '2020-05-06T09:22:23.582Z',
        'x-mws-quota-max': '1000',
        'x-mws-quota-remaining': '999',
        'x-mws-quota-resetson': '2020-04-06T10:22:23.582Z',
      },
    }),
  ),
)

const mockMwsMarketplaceParticipationsNT = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('sellers_list_marketplace_participations_nt'),
      headers: {
        'x-mws-request-id': '0',
        'x-mws-timestamp': '2020-05-06T08:22:23.582Z',
        'x-mws-quota-max': '1000',
        'x-mws-quota-remaining': '999',
        'x-mws-quota-resetson': '2020-05-06T10:22:23.582Z',
      },
    }),
  ),
)

const mockMwsServiceStatus = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('get_service_status'),
      headers: {
        'x-mws-request-id': '0',
        'x-mws-timestamp': '2020-05-06T08:22:23.582Z',
        'x-mws-quota-max': '1000',
        'x-mws-quota-remaining': '999',
        'x-mws-quota-resetson': '2020-05-06T10:22:23.582Z',
      },
    }),
  ),
)

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

const mockNextToken = new NextToken('ListMarketplaceParticipations', '123')

const parsingError = 'Expected an object, but received a string with value ""'

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

      await expect(() => mockMwsFail.sellers.listMarketplaceParticipations()).rejects.toStrictEqual(
        new ParsingError(parsingError),
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
        mockMwsFail.sellers.listMarketplaceParticipationsByNextToken(mockNextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.sellers.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.sellers.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
