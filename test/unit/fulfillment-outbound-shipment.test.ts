import { ParsingError } from '../../src'
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
  describe('createFulfillmentOrder', () => {
    const parameters = {
      SellerFulfillmentOrderItemId: '',
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
