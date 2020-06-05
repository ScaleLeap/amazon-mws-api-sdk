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

const headers = {
  'x-mws-request-id': '0',
  'x-mws-timestamp': '2020-05-06T09:22:23.582Z',
  'x-mws-quota-max': '1000',
  'x-mws-quota-remaining': '999',
  'x-mws-quota-resetson': '2020-04-06T10:22:23.582Z',
}

const mockMwsListOrders = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_list_orders'),
      headers,
    }),
  ),
)

const mockMwsListOrdersNT = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_list_orders_nt'),
      headers,
    }),
  ),
)

const mockMwsGetOrder = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_get_order'),
      headers,
    }),
  ),
)

const mockMwsListOrderItems = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_list_order_items'),
      headers,
    }),
  ),
)

const mockMwsListOrderItemsNT = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('orders_list_order_items_nt'),
      headers,
    }),
  ),
)

const mockMwsServiceStatus = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('get_service_status'),
      headers,
    }),
  ),
)

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

const mockNextTokenOrders = new NextToken('ListOrders', '123')
const mockNextTokenOrderItems = new NextToken('ListOrderItems', '123')

const parsingError = 'Expected an object, but received a string with value ""'

describe('orders', () => {
  describe('listOrders', () => {
    const parameters = { CreatedAfter: new Date(), MarketplaceId: [] }

    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)
      expect(await mockMwsListOrders.orders.listOrders(parameters)).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.orders.listOrders(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('listOrdersByNextToken', () => {
    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsListOrdersNT.orders.listOrdersByNextToken(mockNextTokenOrders),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.orders.listOrdersByNextToken(mockNextTokenOrders),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getOrder', () => {
    it('returns an array of orders when the response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsGetOrder.orders.getOrder({ AmazonOrderId: [] })).toMatchSnapshot()
    })

    it('throws an error when the response is invalid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.orders.getOrder({ AmazonOrderId: [] })).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('listOrderItems', () => {
    it('returns an array of order items when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsListOrderItems.orders.listOrderItems({ AmazonOrderId: '' }),
      ).toMatchSnapshot()
    })

    it('throws an error when the response is invalid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.orders.listOrderItems({ AmazonOrderId: '' }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listOrderItemsByNextToken', () => {
    it('returns an array of order items when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsListOrderItemsNT.orders.listOrderItemsByNextToken(mockNextTokenOrderItems),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is invalid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.orders.listOrderItemsByNextToken(mockNextTokenOrderItems),
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
