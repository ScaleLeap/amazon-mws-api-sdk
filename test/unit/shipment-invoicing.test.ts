import { ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('shipmentInvoicing', () => {
  describe('getFbaOutboundShipmentInvoiceStatus', () => {
    const parameters = {
      MarketplaceId: '',
      AmazonShipmentId: '',
    }

    it('returns a list of shipments if request is succesful', async () => {
      expect.assertions(1)

      const mockGetFbaOutboundShipmentInvoiceStatus = createMockHttpClient(
        'shipment_invoicing_get_fba_outbount_shipment_invoice_status',
      )

      expect(
        await mockGetFbaOutboundShipmentInvoiceStatus.shipmentInvoicing.getFbaOutboundShipmentInvoiceStatus(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.shipmentInvoicing.getFbaOutboundShipmentInvoiceStatus(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('submitFbaOutboundShipmentInvoice', () => {
    const parameters = {
      MarketplaceId: '',
      AmazonShipmentId: '',
      InvoiceContent: '<XML></XML>',
    }

    it('returns the statndard response if succesful', async () => {
      expect.assertions(1)

      const mockSubmitFbaOutboundShipmentInvoice = createMockHttpClient(
        'shipment_invoicing_submit_fba_outbound_shipment_invoice',
      )

      expect(
        await mockSubmitFbaOutboundShipmentInvoice.shipmentInvoicing.submitFbaOutboundShipmentInvoice(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.shipmentInvoicing.submitFbaOutboundShipmentInvoice(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getFbaOutboundShipmentDetail', () => {
    const parameters = {
      MarketplaceId: '',
      AmazonShipmentId: '',
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
