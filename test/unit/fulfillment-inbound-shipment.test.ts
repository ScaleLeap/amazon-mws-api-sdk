import { ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('fulfillmentInboundShipment', () => {
  describe('createInboundShipmentPlan', () => {
    const mockAddress = {
      Name: '',
      AddressLine1: '',
      Email: '',
      City: '',
      PostalCode: '',
      CountryCode: '',
      Phone: '',
    }

    const mockInboundShipmentPlanRequestItem = {
      SellerSKU: '',
      Quantity: 1,
    }

    const parameters = {
      ShipFromAddress: mockAddress,
      InboundShipmetPlanRequestItems: [mockInboundShipmentPlanRequestItem],
    }

    it('returns inbound shipment plans if succesful', async () => {
      expect.assertions(1)

      const mockCreateInboundShipmentPlan = createMockHttpClient(
        'fulfillment_inbound_shipmet_create_inbound_shipment_plan',
      )

      expect(
        await mockCreateInboundShipmentPlan.fulfillmentInboundShipment.createInboundShipmentPlan(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.createInboundShipmentPlan(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getInboundGuidanceForAsin', () => {
    const parameters = {
      ASINList: [],
      MarketplaceId: '',
    }

    it('returns sku inbound guidance list if succesful', async () => {
      expect.assertions(1)

      const mockGetInboundGuidanceForSku = createMockHttpClient(
        'fulfillment_inbound_shipment_get_inbound_guidance_for_asin',
      )

      expect(
        await mockGetInboundGuidanceForSku.fulfillmentInboundShipment.getInboundGuidanceForAsin(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getInboundGuidanceForAsin(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getInboundGuidanceForSku', () => {
    const parameters = {
      SellerSKUList: [],
      MarketplaceId: '',
    }

    it('returns sku inbound guidance list if succesful', async () => {
      expect.assertions(1)

      const mockGetInboundGuidanceForSku = createMockHttpClient(
        'fulfillment_inbound_shipment_get_inbound_guidance_for_sku',
      )

      expect(
        await mockGetInboundGuidanceForSku.fulfillmentInboundShipment.getInboundGuidanceForSku(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getInboundGuidanceForSku(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsServiceStatus.fulfillmentInboundShipment.getServiceStatus(),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getServiceStatus(),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })
})
