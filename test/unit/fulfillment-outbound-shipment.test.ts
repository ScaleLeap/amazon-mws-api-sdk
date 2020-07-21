import { canonicalizeUpdateFulfillmentOrderParameters, NextToken, ParsingError } from '../../src'
import {
  canonicalizeGetFulfillmentPreviewParameters,
  CreateFulfillmentOrderParameters,
} from '../../src/sections/fulfillment-outbound-shipment/type'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

function mockEnum() {
  /**
   * Mock everything in purify-ts, restore it back to normal,
   *  except for `enumeration` which will be stubbed to accept
   * https://github.com/facebook/jest/issues/936#issuecomment-265074320
   */
  const original = jest.requireActual('purify-ts')

  return {
    ...original, // Pass down all the exported objects
    enumeration: <T extends Record<string, string | number>>(enumeration: T) => {
      const enumValues = Object.values(enumeration)

      return original.Codec.custom({
        decode: (input: string | number) => {
          if (typeof input !== 'string' && typeof input !== 'number') {
            return original.Left(`Expected enum, received ${input}`)
          }

          const enumIndex = enumValues.indexOf(input)

          return enumIndex !== -1 || input === 'String'
            ? original.Right((enumValues[enumIndex] as T[keyof T]) || 'String')
            : original.Left(`Expected enum, received ${input}`)
        },
        encode: original.identity,
        schema: () => ({ enum: enumValues }),
      })
    },
  }
}
jest.mock('purify-ts', () => mockEnum())

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

const mockGetFulfillmentPreviewItem = {
  SellerSKU: '',
  SellerFulfillmentOrderItemId: '',
  Quantity: 1,
}

describe('fulfillmentOutboundShipment', () => {
  describe('parameters', () => {
    describe('canonicalizeGetFulfillmentPreviewParameters', () => {
      it('should properly canonicalize GetFulfillmentPreviewParameters', () => {
        expect.assertions(1)

        const parameters = {
          Address: mockAddress,
          Items: [mockGetFulfillmentPreviewItem],
        }

        const output = canonicalizeGetFulfillmentPreviewParameters(parameters)

        expect(output['Items.member']).toStrictEqual(parameters.Items)
      })
    })

    describe('canonicalizeUpdateFulfillmentOrderParameters', () => {
      it('should properly canonicalize UpdateFulfillmentOrderParameters', () => {
        expect.assertions(2)

        const mockItem = {
          SellerFulfillmentOrderItemId: '',
          Quantity: 1,
        }

        const parameters = {
          SellerFulfillmentOrderId: '',
          NotificationEmailList: [''],
          Items: [mockItem],
        }

        const output = canonicalizeUpdateFulfillmentOrderParameters(parameters)

        expect(output['Items.member']).toStrictEqual(parameters.Items)
        expect(output['NotificationEmailList.member']).toStrictEqual(
          parameters.NotificationEmailList,
        )
      })
    })
  })

  describe('createFulfillmentReturn', () => {
    const mockCreateReturnItem = {
      SellerReturnItemId: '',
      SellerFulfillmentOrderItemId: '',
      AmazonShipmentId: '',
      ReturnReasonCode: '',
    }

    const parameters = {
      SellerFulfillmentOrderId: '',
      Items: [mockCreateReturnItem],
    }

    it('returns the list of invalid and valid items for return if succesful', async () => {
      expect.assertions(1)

      const mockCreateFulfillmentReturn = createMockHttpClient(
        'fulfillment_outbound_shipment_create_fulfillment_return',
      )

      expect(
        await mockCreateFulfillmentReturn.fulfillmentOutboundShipment.createFulfillmentReturn(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt  valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.createFulfillmentReturn(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listReturnReasonCodes', () => {
    const parameters = {
      SellerFulfillmentOrderId: '',
      SellerSKU: '',
    }

    it('returns a list of reason code details if succesful', async () => {
      expect.assertions(1)

      const mockListReturnReasonCodes = createMockHttpClient(
        'fulfillment_outbound_shipment_list_return_reason_codes',
      )

      expect(
        await mockListReturnReasonCodes.fulfillmentOutboundShipment.listReturnReasonCodes(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response  isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.listReturnReasonCodes(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('cancelFulfillmentOrder', () => {
    const parameters = { SellerFulfillmentOrderId: '' }

    it('returns the standard response if succesful', async () => {
      expect.assertions(1)

      const mockCancelFulfillmentOrder = createMockHttpClient(
        'fulfillment_outbound_shipment_cancel_fulfillment_order',
      )

      expect(
        await mockCancelFulfillmentOrder.fulfillmentOutboundShipment.cancelFulfillmentOrder(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response  isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.cancelFulfillmentOrder(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getPackageTrackingDetails', () => {
    const parameters = { PackageNumber: 0 }

    it('returns package tracking details if succesful', async () => {
      expect.assertions(1)

      const mockGetPackageTrackingDetails = createMockHttpClient(
        'fulfillment_outbound_shipment_get_package_tracking_details',
      )

      expect(
        await mockGetPackageTrackingDetails.fulfillmentOutboundShipment.getPackageTrackingDetails(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response i snt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.getPackageTrackingDetails(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listAllFulfillmentOrdersByNextToken', () => {
    const mockNextToken = new NextToken('ListAllFulfillmentOrders', '123')

    it('returns a list of fulfillment orders if succesful', async () => {
      expect.assertions(1)

      const mockListAllFulfillmentOrders = createMockHttpClient(
        'fulfillment_outbound_shipment_list_all_fulfillment_orders_nt',
      )

      expect(
        await mockListAllFulfillmentOrders.fulfillmentOutboundShipment.listAllFulfillmentOrdersByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response i snt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.listAllFulfillmentOrdersByNextToken(mockNextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getFulfillmentOrder', () => {
    const parameters = { SellerFulfillmentOrderId: '' }

    it('succesfully parses response structure, from c sharp', async () => {
      expect.assertions(1)

      const mockGetFulfillmentOrder = createMockHttpClient(
        'fulfillment_outbound_shipment_get_fulfillment_order_from_c_sharp',
      )

      expect(
        await mockGetFulfillmentOrder.fulfillmentOutboundShipment.getFulfillmentOrder(parameters),
      ).toMatchSnapshot()
    })

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
