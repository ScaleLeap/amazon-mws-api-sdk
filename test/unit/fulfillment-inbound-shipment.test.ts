import {
  CreateInboundShipmentParameters,
  GetPackageLabelsParameters,
  GetUniquePackageLabelsParameters,
  InboundShipmentHeader,
  NextToken,
  PageType,
  ParsingError,
  PartneredSmallParcelPackageInput,
} from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

function mockFunctions() {
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
jest.mock('purify-ts', () => mockFunctions())

const mockAddress = {
  Name: '',
  AddressLine1: '',
  Email: '',
  City: '',
  PostalCode: '',
  CountryCode: '',
  Phone: '',
}

const mockInboundShipmentItem = {
  SellerSKU: '',
  QuantityShipped: 1,
}

const mockInboundShipmentHeader: InboundShipmentHeader = {
  ShipmentName: '',
  ShipFromAddress: mockAddress,
  DestinationFulfillmentCenterId: '',
  LabelPrepPreference: 'SELLER_LABEL',
  ShipmentStatus: 'WORKING',
}

const mockPageType: PageType = 'PackageLabel_Letter_2'

describe('fulfillmentInboundShipment', () => {
  describe('listInboundShipmentItemsByNextToken', () => {
    const mockNextToken = new NextToken('ListInboundShipmentItems', '123')

    it('returns a list of inbound shipment item data if succesful', async () => {
      expect.assertions(1)

      const mockListInboundShipmentItemsByNextToken = createMockHttpClient(
        'fulfillment_inbound_shipment_list_inbound_shipment_items_nt',
      )

      expect(
        await mockListInboundShipmentItemsByNextToken.fulfillmentInboundShipment.listInboundShipmentItemsByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error  when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.listInboundShipmentItemsByNextToken(mockNextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listInboundShipmentItems', () => {
    const parameters = {
      ShipmentId: '',
    }

    it('returns list of item data if succesful', async () => {
      expect.assertions(1)

      const mockListInboundShipmentItems = createMockHttpClient(
        'fulfillment_inbound_shipment_list_inbound_shipment_items',
      )

      expect(
        await mockListInboundShipmentItems.fulfillmentInboundShipment.listInboundShipmentItems(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when  the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.listInboundShipmentItems(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listInboundShipmentsByNextToken', () => {
    const mockNextToken = new NextToken('ListInboundShipments', '123')

    it('returns shipment data if succesful', async () => {
      expect.assertions(1)

      const mockListInboundShipmentsNT = createMockHttpClient(
        'fulfillment_inbound_shipment_list_inbound_shipments_nt',
      )

      expect(
        await mockListInboundShipmentsNT.fulfillmentInboundShipment.listInboundShipmentsByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when  the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.listInboundShipmentsByNextToken(mockNextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listInboundShipments', () => {
    const parameters = {
      ShipmentStatusList: ['WORKING'],
      ShipmentIdList: [''],
    }

    it('returns the correct structure succesfully', async () => {
      expect.assertions(1)

      const mockListInboundShipments = createMockHttpClient(
        'fulfillment_inbound_shipment_list_inbound_shipments_from_c_sharp',
      )

      expect(
        await mockListInboundShipments.fulfillmentInboundShipment.listInboundShipments(parameters),
      ).toMatchSnapshot()
    })

    it('returns shipment data if succesful', async () => {
      expect.assertions(1)

      const mockListInboundShipments = createMockHttpClient(
        'fulfillment_inbound_shipment_list_inbound_shipments',
      )

      expect(
        await mockListInboundShipments.fulfillmentInboundShipment.listInboundShipments(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the  status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.listInboundShipments(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getBillOfLading', () => {
    const parameters = {
      ShipmentId: '',
    }

    it('returns PDF document data if succesful', async () => {
      expect.assertions(1)

      const mockGetBillOfLading = createMockHttpClient(
        'fulfillment_inbound_shipment_get_bill_of_lading',
      )

      expect(
        await mockGetBillOfLading.fulfillmentInboundShipment.getBillOfLading(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the  status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getBillOfLading(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getPalletLabels', () => {
    const parameters = {
      ShipmentId: '',
      PageType: mockPageType,
      NumberOfPallets: 1,
    }

    it('returns PDF document data if succesful', async () => {
      expect.assertions(1)

      const mockGetPalletLabels = createMockHttpClient(
        'fulfillment_inbound_shipment_get_pallet_labels',
      )

      expect(
        await mockGetPalletLabels.fulfillmentInboundShipment.getPalletLabels(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status  response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getPalletLabels(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getUniquePackageLabels', () => {
    const parameters: GetUniquePackageLabelsParameters = {
      ShipmentId: '',
      PageType: mockPageType,
      PackageLabelsToPrint: [''],
    }

    it('returns the transport document if succesful', async () => {
      expect.assertions(1)

      const mockGetUniquePackageLabels = createMockHttpClient(
        'fulfillment_inbound_shipment_get_unique_package_labels',
      )

      expect(
        await mockGetUniquePackageLabels.fulfillmentInboundShipment.getUniquePackageLabels(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status  response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getUniquePackageLabels(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getPackageLabels', () => {
    const parameters: GetPackageLabelsParameters = {
      ShipmentId: '',
      PageType: mockPageType,
    }

    it('returns the transport document if succesful', async () => {
      expect.assertions(1)

      const mockGetPackageLabels = createMockHttpClient(
        'fulfillment_inbound_shipment_get_package_labels',
      )

      expect(
        await mockGetPackageLabels.fulfillmentInboundShipment.getPackageLabels(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is  not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getPackageLabels(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('voidTransportRequest', () => {
    const parameters = {
      ShipmentId: '',
    }

    it('returns the transport result if voiding is succesful', async () => {
      expect.assertions(1)

      const mockVoidTransportRequest = createMockHttpClient(
        'fulfillment_inbound_shipment_void_transport_request',
      )

      expect(
        await mockVoidTransportRequest.fulfillmentInboundShipment.voidTransportRequest(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is  not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.voidTransportRequest(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('confirmTransportRequest', () => {
    const parameters = {
      ShipmentId: '',
    }

    it('returns the transport result if succesful', async () => {
      expect.assertions(1)

      const mockConfirmTransportRequest = createMockHttpClient(
        'fulfillment_inbound_shipment_confirm_transport_request',
      )

      expect(
        await mockConfirmTransportRequest.fulfillmentInboundShipment.confirmTransportRequest(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response  is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.confirmTransportRequest(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getTransportContent', () => {
    const parameters = {
      ShipmentId: '',
    }

    it('returns the transport content for LTL if succesful', async () => {
      expect.assertions(1)

      const mockGetTransportContent = createMockHttpClient(
        'fulfillment_inbound_shipment_get_transport_content_ltl',
      )

      expect(
        await mockGetTransportContent.fulfillmentInboundShipment.getTransportContent(parameters),
      ).toMatchSnapshot()
    })

    it('returns the transport content if succesful', async () => {
      expect.assertions(1)

      const mockGetTransportContent = createMockHttpClient(
        'fulfillment_inbound_shipment_get_transport_content',
      )

      expect(
        await mockGetTransportContent.fulfillmentInboundShipment.getTransportContent(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response  is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getTransportContent(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('estimateTransportRequest', () => {
    const parameters = {
      ShipmentId: '',
    }

    it('returns the workflow status for a shipment if succesful', async () => {
      expect.assertions(1)

      const mockEstimateTransportRequest = createMockHttpClient(
        'fulfillment_inbound_shipment_estimate_transport_request',
      )

      expect(
        await mockEstimateTransportRequest.fulfillmentInboundShipment.estimateTransportRequest(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response i snt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.estimateTransportRequest(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('putTransportContent', () => {
    const mockPartneredSmallParcelPackageInput: PartneredSmallParcelPackageInput = {
      Dimensions: {
        Unit: 'inches',
        Length: 1,
        Width: 1,
        Height: 1,
      },
      Weight: {
        Unit: 'pounds',
        Value: 1,
      },
    }

    const mockTransportDetailInput = {
      PartneredSmallParcelData: {
        CarrierName: '',
        PackageList: [mockPartneredSmallParcelPackageInput],
      },
    }

    const parameters = {
      ShipmentId: '',
      IsPartnered: true,
      ShipmentType: 'SP',
      TransportDetails: mockTransportDetailInput,
    }

    it('returns tranport result if succesful', async () => {
      expect.assertions(1)

      const mockPutTransportContent = createMockHttpClient(
        'fulfillment_inbound_shipment_put_transport_content',
      )

      expect(
        await mockPutTransportContent.fulfillmentInboundShipment.putTransportContent(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response i snt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.putTransportContent(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getPrepInstructionsForAsin', () => {
    const parameters = {
      ASINList: [''],
      ShipToCountryCode: 'US',
    }

    it('returns list of prep instructions if succesful', async () => {
      expect.assertions(1)

      const mockGetPrepInstructionsForAsin = createMockHttpClient(
        'fulfillment_inbound_shipment_get_prep_instructions_for_asin',
      )

      expect(
        await mockGetPrepInstructionsForAsin.fulfillmentInboundShipment.getPrepInstructionsForAsin(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is nt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getPrepInstructionsForAsin(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getPrepInstructionsForSku', () => {
    const parameters = {
      SellerSKUList: [],
      ShipToCountryCode: 'US',
    }

    it('returns prep instructions list if succesful', async () => {
      expect.assertions(1)

      const mockGetPrepInstructionsForSku = createMockHttpClient(
        'fulfillment_inbound_shipment_get_prep_instructions_for_sku',
      )

      expect(
        await mockGetPrepInstructionsForSku.fulfillmentInboundShipment.getPrepInstructionsForSku(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is nt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getPrepInstructionsForSku(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('confirmPreorder', () => {
    const parameters = {
      ShipmentId: '',
      NeedByDate: new Date(),
    }

    it('returns confirmed dates if succesful', async () => {
      expect.assertions(1)

      const mockConfirmPreorder = createMockHttpClient(
        'fulfillment_inbound_shipment_confirm_preorder',
      )

      expect(
        await mockConfirmPreorder.fulfillmentInboundShipment.confirmPreorder(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.confirmPreorder(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getPreorderInfo', () => {
    const parameters = { ShipmentId: '' }

    it('returns preorderinfo if succesful', async () => {
      expect.assertions(1)

      const mockGetPreorderInfo = createMockHttpClient(
        'fulfillment_inbound_shipment_get_preorder_info',
      )

      expect(
        await mockGetPreorderInfo.fulfillmentInboundShipment.getPreorderInfo(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.getPreorderInfo(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('updateInboundShipment', () => {
    const parameters = {
      ShipmentId: '',
      InboundShipmentHeader: mockInboundShipmentHeader,
      InboundShipmentItems: [mockInboundShipmentItem],
    }

    it('return the shipment id if succesful', async () => {
      expect.assertions(1)

      const mockUpdateInboundShipment = createMockHttpClient(
        'fulfillment_inbound_shipment_update_inbound_shipment',
      )

      expect(
        await mockUpdateInboundShipment.fulfillmentInboundShipment.updateInboundShipment(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the status response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.updateInboundShipment(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('createInboundShipment', () => {
    const parameters: CreateInboundShipmentParameters = {
      ShipmentId: '',
      InboundShipmentHeader: mockInboundShipmentHeader,
      InboundShipmentItems: [mockInboundShipmentItem],
    }

    it('returns the shipment ID if succesful', async () => {
      expect.assertions(1)

      const mockCreateInboundShipment = createMockHttpClient(
        'fulfillment_inbound_shipment_create_inbound_shipment',
      )

      expect(
        await mockCreateInboundShipment.fulfillmentInboundShipment.createInboundShipment(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the status response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentInboundShipment.createInboundShipment(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('createInboundShipmentPlan', () => {
    const mockInboundShipmentPlanRequestItem = {
      SellerSKU: '',
      Quantity: 1,
    }

    const parameters = {
      ShipFromAddress: mockAddress,
      InboundShipmentPlanRequestItems: [mockInboundShipmentPlanRequestItem],
    }

    it('returns inbound shipment plans if succesful', async () => {
      expect.assertions(1)

      const mockCreateInboundShipmentPlan = createMockHttpClient(
        'fulfillment_inbound_shipment_create_inbound_shipment_plan',
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
