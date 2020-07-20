import { ParsingError } from '../../src'
import { CreateFulfillmentOrderParameters } from '../../src/sections/fulfillment-outbound-shipment/type'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

const mockAddress = {
  Name: '',
  Line1: '',
  Line2: '',
  Line3: '',
  DistrictOrCounty: '',
  City: '',
  StateOrProvinceCode: '',
  CountryCode: '',
  PostalCode: '',
  PhoneNumber: '',
}

const mockCreateFulfillmentOrderItem = {
  SellerSKU: '',
  SellerFulfillmentOrderItemId: '',
  Quantity: 1,
}

describe('fulfillmentOutboundShipment', () => {
  describe('getFulfillmentOrder', () => {
    const parameters = { SellerFulfillmentOrderId: '' }

    it('returns a fulfillment order based on a SellerFulfillmentOrderId if succesful', async () => {
      expect.assertions(1)

      const mockGetFulfillmentOrder = createMockHttpClient(
        'fulfillment_outbound_shipment_get_fulfillment_order',
      )

      expect(
        await mockGetFulfillmentOrder.fulfillmentOutboundShipment.getFulfillmentOrder(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is nt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.getFulfillmentOrder(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listAllFulfillmentOrders', () => {
    it('returns a list of fulfillment orders if succesful', async () => {
      expect.assertions(1)

      const mockListAllFulfillmentOrders = createMockHttpClient(
        'fulfillment_outbound_shipment_list_all_fulfillment_orders',
      )

      expect(
        await mockListAllFulfillmentOrders.fulfillmentOutboundShipment.listAllFulfillmentOrders(),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is nt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.listAllFulfillmentOrders(),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('updateFulfillmentOrder', () => {
    const parameters = {
      SellerFulfillmentOrderId: '',
    }

    it('returns the standard response elements if succesful', async () => {
      expect.assertions(1)

      const mockUpdateFulfillmentOrder = createMockHttpClient(
        'fulfillment_outbound_shipment_update_fulfillment_order',
      )

      expect(
        await mockUpdateFulfillmentOrder.fulfillmentOutboundShipment.updateFulfillmentOrder(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.updateFulfillmentOrder(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('createFulfillmentOrder', () => {
    const parameters: CreateFulfillmentOrderParameters = {
      SellerFulfillmentOrderId: '',
      DisplayableOrderId: '',
      DisplayableOrderDateTime: new Date(),
      DisplayableOrderComment: '',
      ShippingSpeedCategory: 'Priority',
      DestinationAddress: mockAddress,
      Items: [mockCreateFulfillmentOrderItem],
    }

    it('returns the standard response elements if succesful', async () => {
      expect.assertions(1)

      const mockCreateFulfillmentOrder = createMockHttpClient(
        'fulfillment_outbound_shipment_create_fulfillment_order',
      )

      expect(
        await mockCreateFulfillmentOrder.fulfillmentOutboundShipment.createFulfillmentOrder(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.createFulfillmentOrder(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getFulfillmentPreview', () => {
    const mockGetFulfillmentPreviewItem = {
      SellerSKU: '',
      SellerFulfillmentOrderItemId: '',
      Quantity: 1,
    }
    const parameters = {
      Address: mockAddress,
      Items: [mockGetFulfillmentPreviewItem],
    }

    it('returns a list of fulfillment previews if succesful', async () => {
      expect.assertions(1)

      const mockGetFulfillmentPreview = createMockHttpClient(
        'fulfillment_outbound_shipment_get_fulfillment_preview',
      )

      expect(
        await mockGetFulfillmentPreview.fulfillmentOutboundShipment.getFulfillmentPreview(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.getFulfillmentPreview(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsServiceStatus.fulfillmentOutboundShipment.getServiceStatus(),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.getServiceStatus(),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })
})
