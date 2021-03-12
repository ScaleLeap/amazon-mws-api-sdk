import {
  amazonMarketplaces,
  HttpClient,
  HttpError,
  InvalidAddressError,
  InvalidParameterValueError,
  InvalidUPCIdentifierError,
  MWS,
  MWSError,
  ParsingError,
} from '../../src'
import { cleanParameters, Parameters, Resource } from '../../src/http'
import {
  canonicalizeParametersGetEligibleShippingServiceParameters,
  GetEligibleShippingServicesParameters,
  Item,
  SellerInputDataType,
  Weight,
} from '../../src/sections/merchant-fulfillment/type'
import { getFixture, httpConfig, mockMwsFail } from '../utils'

const httpClientThatThrows = (error: unknown) =>
  new HttpClient(
    {
      awsAccessKeyId: '',
      marketplace: amazonMarketplaces.CA,
      mwsAuthToken: '',
      secretKey: '',
      sellerId: '',
    },
    () => {
      throw error
    },
  )

const mockRequest = {
  resource: Resource.Sellers,
  version: '',
  action: 'GetServiceStatus',
  parameters: {},
} as const

describe('httpClient', () => {
  it('should throw a HttpError on failure', async () => {
    expect.assertions(1)

    const httpClient = httpClientThatThrows(getFixture('error_response'))

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
      new InvalidParameterValueError('GetServiceStatus request failed'),
    )
  })

  it('should throw a HttpError that can be handled', async () => {
    expect.assertions(7)

    const httpClient = httpClientThatThrows(getFixture('error_response'))

    let expectedError!: InvalidParameterValueError

    try {
      await httpClient.request('POST', mockRequest)
    } catch (error) {
      expectedError = error
    }

    expect(expectedError instanceof MWSError).toStrictEqual(true)
    expect(expectedError instanceof HttpError).toStrictEqual(true)
    expect(expectedError instanceof InvalidParameterValueError).toStrictEqual(true)
    expect(expectedError.code).toStrictEqual('InvalidParameterValue')
    expect(expectedError.type).toStrictEqual('Sender')
    expect(expectedError.requestId).toStrictEqual('e26147f9-30cc-4379-9fb5-bd4ad966c48b')
    expect(expectedError.mwsMessage).toStrictEqual(
      'CreatedAfter or LastUpdatedAfter must be specified',
    )
  })

  it('should propagate non-API errors', async () => {
    expect.assertions(1)

    const httpClient = httpClientThatThrows(new Error('Out of memory'))

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
      new Error('Out of memory'),
    )
  })

  it('should propagate API errors that are not valid', async () => {
    expect.assertions(1)

    const fixture = getFixture('invalid_error_response')
    const httpClient = httpClientThatThrows(fixture)

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(fixture)
  })

  it('should handle Invalid UPC identifier error', async () => {
    expect.assertions(1)

    const httpClient = new HttpClient(
      {
        awsAccessKeyId: '',
        marketplace: amazonMarketplaces.CA,
        mwsAuthToken: '',
        secretKey: '',
        sellerId: '',
      },
      () => Promise.resolve({ data: 'Invalid UPC identifier', headers: {} }),
    )

    const request = {
      resource: Resource.Products,
      version: '',
      action: 'GetMatchingProductForId',
      parameters: {},
    } as const

    await expect(() => httpClient.request('POST', request)).rejects.toStrictEqual(
      new InvalidUPCIdentifierError('GetMatchingProductForId request failed'),
    )
  })

  describe('default fetch', () => {
    it('returns only the XML response on failure', async () => {
      expect.assertions(1)

      const httpClient = new HttpClient({
        awsAccessKeyId: 'a',
        marketplace: amazonMarketplaces.CA,
        mwsAuthToken: 'b',
        secretKey: 'c',
        sellerId: 'd',
      })

      await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
        new InvalidAddressError('GetServiceStatus request failed'),
      )
    })
  })

  describe('cleanParameters', () => {
    it('should properly clean primitive parameters', () => {
      expect.hasAssertions()

      const parameters = {
        abc: ['a', 'b', 'c'],
        a: 'a',
        b: 'b',
        c: true,
      }

      const expectedResult = { 'abc.1': 'a', 'abc.2': 'b', 'abc.3': 'c', a: 'a', b: 'b', c: 'true' }

      expect(cleanParameters(parameters)).toStrictEqual(expectedResult)
    })

    const sqsUrl = 'https%3A%2F%2Fsqs.us-east-1.amazonaws.com%2F51471EXAMPLE%2Fmws_notifications'

    it('should properly clean parameters with array of objects', () => {
      expect.hasAssertions()

      const parameters = {
        'aabbc.ddcc': [
          {
            a: 'a',
          },
          {
            b: 'b',
          },
          {
            c: {
              d: 'd',
              c: 'c,',
            },
          },
        ],
      }

      const results = {
        'aabbc.ddcc.1.a': 'a',
        'aabbc.ddcc.2.b': 'b',
        'aabbc.ddcc.3.c.d': 'd',
        'aabbc.ddcc.3.c.c': 'c,',
      }

      expect(cleanParameters(parameters)).toStrictEqual(results)
    })

    it('should properly clean parameters with object arrays for attributes', () => {
      expect.hasAssertions()

      const parameters = {
        MarketplaceId: 'ATVPDKIKX0DER',
        Destination: {
          DeliveryChannel: 'SQS',
          'AttributeList.member': [
            {
              Key: 'sqsQueueUrl',
              Value: sqsUrl,
            },
          ],
        },
      }

      const results = {
        MarketplaceId: 'ATVPDKIKX0DER',
        'Destination.DeliveryChannel': 'SQS',
        'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Destination.AttributeList.member.1.Value': sqsUrl,
      }

      expect(cleanParameters(parameters)).toStrictEqual(results)
    })

    it('should properly clean parameters with object with an object arrays for attributes', () => {
      expect.hasAssertions()

      const parameters = {
        MarketplaceId: 'ATVPDKIKX0DER',
        Subscriptions: {
          NotificationType: 'AnyOfferChanged',
          Destination: {
            DeliveryChannel: 'SQS',
            'AttributeList.member': [
              {
                Key: 'sqsQueueUrl',
                Value: sqsUrl,
              },
              {
                Key: 'sqsQueueUrl',
                Value: `${sqsUrl}2`,
              },
            ],
          },
          IsEnabled: true,
        },
      }

      const results = {
        MarketplaceId: 'ATVPDKIKX0DER',
        'Subscriptions.NotificationType': 'AnyOfferChanged',
        'Subscriptions.Destination.DeliveryChannel': 'SQS',
        'Subscriptions.Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Subscriptions.Destination.AttributeList.member.1.Value': sqsUrl,
        'Subscriptions.Destination.AttributeList.member.2.Key': 'sqsQueueUrl',
        'Subscriptions.Destination.AttributeList.member.2.Value': `${sqsUrl}2`,
        'Subscriptions.IsEnabled': 'true',
      }

      expect(cleanParameters(parameters)).toStrictEqual(results)
    })

    it('should properly clean canonicalized parameters from merchant-fulfillment', () => {
      expect.assertions(1)

      const weight: Weight = {
        Value: 1,
        Unit: 'grams',
      }
      const testDate = 'Jul 03 2020 15:28:55 UTC+00:00'
      const expectedDate = '2020-07-03T15:28:55.000Z'

      const item = {
        OrderItemId: '1',
        Quantity: 1,
        ItemWeight: weight,
        ItemDescription: 'a',
        TransparencyCodeList: ['A', 'B'],
        ItemLevelSellerInputsList: [
          {
            AdditionalInputFieldName: 'FieldName',
            AdditionalSellerInput: {
              DataType: 'Timestamp' as SellerInputDataType,
              ValueAsTimestamp: new Date(testDate),
            },
          },
          {
            AdditionalInputFieldName: 'FieldName',
            AdditionalSellerInput: {
              DataType: 'Boolean' as SellerInputDataType,
              ValueAsBoolean: true,
            },
          },
        ],
      }

      const items: Item[] = [...Array.from({ length: 4 })].map((_, index) => ({
        ...item,
        OrderItemId: `ITEM${index + 1}`,
        ItemDescription: `This is item #${index + 1}`,
      }))

      /**
       * This uses all possible values in the request parameter, even the optional parameters
       */
      const parameters: GetEligibleShippingServicesParameters = {
        ShippingOfferingFilter: {
          IncludeComplexShippingOptions: true,
        },
        ShipmentRequestDetails: {
          AmazonOrderId: 'A',
          SellerOrderId: 'B',
          ItemList: items,
          ShipFromAddress: {
            Name: 'string',
            AddressLine1: 'string',
            AddressLine2: 'string',
            AddressLine3: 'string',
            DistrictOrCounty: 'string',
            Email: 'string',
            City: 'string',
            StateOrProvinceCode: 'string',
            PostalCode: 'string',
            CountryCode: 'string',
            Phone: 'string',
          },
          PackageDimensions: {
            PredefinedPackageDimensions: 'FedEx_Box_10kg',
          },
          Weight: weight,
          MustArriveByDate: new Date(testDate),
          ShipDate: new Date(testDate),
          ShippingServiceOptions: {
            DeliveryExperience: 'DeliveryConfirmationWithAdultSignature',
            DeclaredValue: {
              CurrencyCode: 'USD',
              Amount: 1,
            },
            CarrierWillPickUp: true,
            LabelFormat: 'A',
          },
          LabelCustomization: {
            CustomTextForLabel: 'B',
            StandardIdForLabel: 'C',
          },
        },
      }
      const canonicalized = canonicalizeParametersGetEligibleShippingServiceParameters(parameters)
      const output = {
        'ShippingOfferingFilter.IncludeComplexShippingOptions': 'true',
        'ShipmentRequestDetails.AmazonOrderId': 'A',
        'ShipmentRequestDetails.SellerOrderId': 'B',
        'ShipmentRequestDetails.ItemList.Item.1.OrderItemId': 'ITEM1',
        'ShipmentRequestDetails.ItemList.Item.1.Quantity': '1',
        'ShipmentRequestDetails.ItemList.Item.1.ItemWeight.Value': '1',
        'ShipmentRequestDetails.ItemList.Item.1.ItemWeight.Unit': 'grams',
        'ShipmentRequestDetails.ItemList.Item.1.ItemDescription': 'This is item #1',
        'ShipmentRequestDetails.ItemList.Item.1.transparencyCodeList.member.1': 'A',
        'ShipmentRequestDetails.ItemList.Item.1.transparencyCodeList.member.2': 'B',
        'ShipmentRequestDetails.ItemList.Item.1.ItemLevelSellerInputsList.member.1.AdditionalInputFieldName':
          'FieldName',
        'ShipmentRequestDetails.ItemList.Item.1.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.DataType':
          'Timestamp',
        'ShipmentRequestDetails.ItemList.Item.1.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.ValueAsTimestamp': expectedDate,
        'ShipmentRequestDetails.ItemList.Item.1.ItemLevelSellerInputsList.member.2.AdditionalInputFieldName':
          'FieldName',
        'ShipmentRequestDetails.ItemList.Item.1.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.DataType':
          'Boolean',

        'ShipmentRequestDetails.ItemList.Item.1.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.ValueAsBoolean':
          'true',

        'ShipmentRequestDetails.ItemList.Item.2.OrderItemId': 'ITEM2',
        'ShipmentRequestDetails.ItemList.Item.2.Quantity': '1',
        'ShipmentRequestDetails.ItemList.Item.2.ItemWeight.Value': '1',
        'ShipmentRequestDetails.ItemList.Item.2.ItemWeight.Unit': 'grams',
        'ShipmentRequestDetails.ItemList.Item.2.ItemDescription': 'This is item #2',
        'ShipmentRequestDetails.ItemList.Item.2.transparencyCodeList.member.1': 'A',
        'ShipmentRequestDetails.ItemList.Item.2.transparencyCodeList.member.2': 'B',
        'ShipmentRequestDetails.ItemList.Item.2.ItemLevelSellerInputsList.member.1.AdditionalInputFieldName':
          'FieldName',
        'ShipmentRequestDetails.ItemList.Item.2.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.DataType':
          'Timestamp',
        'ShipmentRequestDetails.ItemList.Item.2.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.ValueAsTimestamp': expectedDate,
        'ShipmentRequestDetails.ItemList.Item.2.ItemLevelSellerInputsList.member.2.AdditionalInputFieldName':
          'FieldName',
        'ShipmentRequestDetails.ItemList.Item.2.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.DataType':
          'Boolean',

        'ShipmentRequestDetails.ItemList.Item.2.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.ValueAsBoolean':
          'true',

        'ShipmentRequestDetails.ItemList.Item.3.OrderItemId': 'ITEM3',
        'ShipmentRequestDetails.ItemList.Item.3.Quantity': '1',
        'ShipmentRequestDetails.ItemList.Item.3.ItemWeight.Value': '1',
        'ShipmentRequestDetails.ItemList.Item.3.ItemWeight.Unit': 'grams',
        'ShipmentRequestDetails.ItemList.Item.3.ItemDescription': 'This is item #3',
        'ShipmentRequestDetails.ItemList.Item.3.transparencyCodeList.member.1': 'A',
        'ShipmentRequestDetails.ItemList.Item.3.transparencyCodeList.member.2': 'B',
        'ShipmentRequestDetails.ItemList.Item.3.ItemLevelSellerInputsList.member.1.AdditionalInputFieldName':
          'FieldName',
        'ShipmentRequestDetails.ItemList.Item.3.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.DataType':
          'Timestamp',

        'ShipmentRequestDetails.ItemList.Item.3.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.ValueAsTimestamp': expectedDate,
        'ShipmentRequestDetails.ItemList.Item.3.ItemLevelSellerInputsList.member.2.AdditionalInputFieldName':
          'FieldName',
        'ShipmentRequestDetails.ItemList.Item.3.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.DataType':
          'Boolean',

        'ShipmentRequestDetails.ItemList.Item.3.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.ValueAsBoolean':
          'true',
        'ShipmentRequestDetails.ItemList.Item.4.OrderItemId': 'ITEM4',
        'ShipmentRequestDetails.ItemList.Item.4.Quantity': '1',
        'ShipmentRequestDetails.ItemList.Item.4.ItemWeight.Value': '1',
        'ShipmentRequestDetails.ItemList.Item.4.ItemWeight.Unit': 'grams',
        'ShipmentRequestDetails.ItemList.Item.4.ItemDescription': 'This is item #4',
        'ShipmentRequestDetails.ItemList.Item.4.transparencyCodeList.member.1': 'A',
        'ShipmentRequestDetails.ItemList.Item.4.transparencyCodeList.member.2': 'B',
        'ShipmentRequestDetails.ItemList.Item.4.ItemLevelSellerInputsList.member.1.AdditionalInputFieldName':
          'FieldName',

        'ShipmentRequestDetails.ItemList.Item.4.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.ValueAsTimestamp': expectedDate,
        'ShipmentRequestDetails.ItemList.Item.4.ItemLevelSellerInputsList.member.1.AdditionalSellerInput.DataType':
          'Timestamp',
        'ShipmentRequestDetails.ItemList.Item.4.ItemLevelSellerInputsList.member.2.AdditionalInputFieldName':
          'FieldName',

        'ShipmentRequestDetails.ItemList.Item.4.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.ValueAsBoolean':
          'true',
        'ShipmentRequestDetails.ItemList.Item.4.ItemLevelSellerInputsList.member.2.AdditionalSellerInput.DataType':
          'Boolean',
        'ShipmentRequestDetails.ShipFromAddress.Name': 'string',
        'ShipmentRequestDetails.ShipFromAddress.AddressLine1': 'string',
        'ShipmentRequestDetails.ShipFromAddress.AddressLine2': 'string',
        'ShipmentRequestDetails.ShipFromAddress.AddressLine3': 'string',
        'ShipmentRequestDetails.ShipFromAddress.DistrictOrCounty': 'string',
        'ShipmentRequestDetails.ShipFromAddress.Email': 'string',
        'ShipmentRequestDetails.ShipFromAddress.City': 'string',
        'ShipmentRequestDetails.ShipFromAddress.StateOrProvinceCode': 'string',
        'ShipmentRequestDetails.ShipFromAddress.PostalCode': 'string',
        'ShipmentRequestDetails.ShipFromAddress.CountryCode': 'string',
        'ShipmentRequestDetails.ShipFromAddress.Phone': 'string',
        'ShipmentRequestDetails.PackageDimensions.PredefinedPackageDimensions': 'FedEx_Box_10kg',
        'ShipmentRequestDetails.Weight.Value': '1',
        'ShipmentRequestDetails.Weight.Unit': 'grams',
        'ShipmentRequestDetails.MustArriveByDate': expectedDate,
        'ShipmentRequestDetails.ShipDate': expectedDate,
        'ShipmentRequestDetails.ShippingServiceOptions.DeliveryExperience':
          'DeliveryConfirmationWithAdultSignature',
        'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue.CurrencyCode': 'USD',
        'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue.Amount': '1',
        'ShipmentRequestDetails.ShippingServiceOptions.CarrierWillPickUp': 'true',
        'ShipmentRequestDetails.ShippingServiceOptions.LabelFormat': 'A',
        'ShipmentRequestDetails.LabelCustomization.CustomTextForLabel': 'B',
        'ShipmentRequestDetails.LabelCustomization.StandardIdForLabel': 'C',
      }

      const cleaned = cleanParameters(canonicalized as Parameters)

      expect(cleaned).toStrictEqual(output)
    })

    it('should not include deep undefined in parameters', () => {
      expect.assertions(1)

      const parametersWithUndefined = {
        ShipmentId: '',
        InboundShipmentHeader: {
          ShipmentName: '',
          ShipFromAddress: {
            Name: '',
            AddressLine1: '',
            Email: '',
            City: '',
            PostalCode: '',
            CountryCode: '',
            Phone: '',
          },
          DestinationFulfillmentCenterId: '',
          LabelPrepPreference: 'SELLER_LABEL',
          ShipmentStatus: 'WORKING',
        },
        'InboundShipmentItems.member': [
          {
            ShipmentId: undefined,
            SellerSKU: '',
            FulfillmentNetworkSKU: undefined,
            QuantityShipped: 1,
            QuantityReceived: undefined,
            QuantityInCase: undefined,
            'PrepDetailsList.PrepDetails': undefined,
            ReleaseDate: undefined,
          },
        ],
      }

      const cleaned = cleanParameters(parametersWithUndefined)

      expect(cleaned['InboundShipmentItems.member.1.ReleaseDate']).toBeUndefined()
    })
  })

  describe('parseResponse', () => {
    it('throws a parse error when the XML a blank string', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.sellers.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError('Start tag expected.'),
      )
    })

    it('throws a parse error when the XML is missing closing tags', async () => {
      expect.assertions(1)

      const mockFXPValidationFail = new MWS(
        new HttpClient(httpConfig, () =>
          Promise.resolve({
            data: '<StartTagWithClosing><StartTagWithoutClosing></StartTagWithClosing>',
            headers: {},
          }),
        ),
      )
      await expect(() => mockFXPValidationFail.sellers.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(
          "Closing tag 'StartTagWithoutClosing' is expected inplace of 'StartTagWithClosing'.",
        ),
      )
    })
  })
})
