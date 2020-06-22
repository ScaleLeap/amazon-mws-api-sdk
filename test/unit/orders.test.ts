import { ParsingError } from '../../src'
import { NextToken } from '../../src/parsing'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('orders', () => {
  describe('listOrders', () => {
    const parameters = { CreatedAfter: new Date(), MarketplaceId: [] }

    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      const mockMwsListOrders = createMockHttpClient('orders_list_orders')

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
    const mockNextTokenOrders = new NextToken('ListOrders', '123')

    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      const mockMwsListOrdersNT = createMockHttpClient('orders_list_orders_nt')

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

      const mockMwsGetOrder = createMockHttpClient('orders_get_order')

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

      const mockMwsListOrderItems = createMockHttpClient('orders_list_order_items')

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
    const mockNextTokenOrderItems = new NextToken('ListOrderItems', '123')

    it('returns an array of order items when the response is valid', async () => {
      expect.assertions(1)

      const mockMwsListOrderItemsNT = createMockHttpClient('orders_list_order_items_nt')

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
