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

const mockMwsListOrders = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_list_orders'),
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

const mockMwsListOrdersNT = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_list_orders_nt'),
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

const mockNextToken = new NextToken('ListOrders', '123')

const parsingError = 'Expected an object, but received a string with value ""'

describe('sellers', () => {
  describe('listMarketplaceParticipations', () => {
    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsListOrders.orders.listOrders({ MarketplaceId: [] })).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.orders.listOrders({ MarketplaceId: [] }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listMarketplaceParticipationsByNextToken', () => {
    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsListOrdersNT.orders.listOrdersByNextToken(mockNextToken, {
          MarketplaceId: [],
        }),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.orders.listOrdersByNextToken(mockNextToken, {
          MarketplaceId: [],
        }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.orders.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.orders.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
