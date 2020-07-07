import { ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('shipmentInvoicing', () => {
  describe('getFbaOutboundShipmentDetail', () => {
    const parameters = {
      MarketplaceId: '',
      AmazonShipmenId: '',
    }

    it('returns the shipment detail if succesful', async () => {
      expect.assertions(1)

      const mockGetFbaOutboundShipmentDetail = createMockHttpClient(
        'shipment_invoicing_get_fba_outbound_shipment_detail',
      )

      expect(
        await mockGetFbaOutboundShipmentDetail.shipmentInvoicing.getFbaOutboundShipmentDetail(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.shipmentInvoicing.getFbaOutboundShipmentDetail(parameters),
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

      await expect(() => mockMwsFail.shipmentInvoicing.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
