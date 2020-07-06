import { ParsingError } from '../../src'
import {
  GetEligibleShippingServicesParameters,
  ShippingServiceOptions as ShippingServiceOptionsInterface,
  Weight as WeightInterface,
} from '../../src/sections/merchant-fulfillment/type'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

const mockAddress = {
  Name: '',
  AddressLine1: '',
  Email: '',
  City: '',
  PostalCode: '',
  CountryCode: '',
  Phone: '',
}

const PackageDimensions = {
  PredefinePackageDimensions: 'FedEx_Box_10kg',
}

const Weight: WeightInterface = {
  Value: 1,
  Unit: 'ounces',
}

const ShippingServiceOptions: ShippingServiceOptionsInterface = {
  DeliveryExperience: 'DeliveryConfirmationWithAdultSignature',
  CarrierWillPickUp: false,
}

const mockShipmentRequestDetails = {
  AmazonOrderId: '',
  SellerOrderId: '',
  ItemList: [],
  ShipFromAddress: mockAddress,
  PackageDimensions,
  Weight,
  MustArriveByDate: new Date(),
  ShipDate: new Date(),
  ShippingServiceOptions,
}

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
            ? original.Right(enumValues[enumIndex] as T[keyof T])
            : original.Left(`Expected enum, received ${input}`)
        },
        encode: original.identity,
        schema: () => ({ enum: enumValues }),
      })
    },
  }
}
jest.mock('purify-ts', () => mockFunctions())

describe('merchant-fulfillment', () => {
  describe('getShipment', () => {
    const parameters = { ShipmentId: '' }

    it('should properly return shipment if succesful', async () => {
      expect.assertions(1)

      const mockGetShipment = createMockHttpClient('merchant_fulfillment_get_shipment')

      expect(await mockGetShipment.merchantFulfillment.getShipment(parameters)).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.merchantFulfillment.getShipment(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getAdditionalSellerInputs', () => {
    const parameters = {
      OrderId: '',
      ShippingServiceId: '',
      ShipFromAddress: mockAddress,
    }

    it('should properly match complete response structure from c#', async () => {
      expect.assertions(1)

      const mockGetAdditionalSellerInputs = createMockHttpClient(
        'merchant_fulfillment_get_additional_seller_inputs_from_c_sharp',
      )

      expect(
        await mockGetAdditionalSellerInputs.merchantFulfillment.getAddtionalSellerInputs(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('returns shipment level fields and item level fields if succesful', async () => {
      expect.assertions(1)

      const mockGetAdditionalSellerInputs = createMockHttpClient(
        'merchant_fulfillment_get_additional_seller_inputs',
      )

      expect(
        await mockGetAdditionalSellerInputs.merchantFulfillment.getAddtionalSellerInputs(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the status response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.merchantFulfillment.getAddtionalSellerInputs(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('createShipment', () => {
    const parameters = {
      ShipmentRequestDetails: mockShipmentRequestDetails,
      ShippingServiceId: '',
    }

    it('returns details of the shipment if succesful', async () => {
      expect.assertions(1)

      const mockCreateShipment = createMockHttpClient('merchant_fulfillment_create_shipment')

      expect(
        await mockCreateShipment.merchantFulfillment.createShipment(parameters),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the status response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.merchantFulfillment.createShipment(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getEligibleShippingServices', () => {
    const parameters: GetEligibleShippingServicesParameters = {
      ShipmentRequestDetails: mockShipmentRequestDetails,
    }

    it('returns lists of shipping services if succesful with test from C# mocks', async () => {
      expect.assertions(1)

      const mockGetEligibleShippingServices = createMockHttpClient(
        'merchant_fulfillment_get_eligible_shipping_services_from_c_sharp',
      )

      expect(
        await mockGetEligibleShippingServices.merchantFulfillment.getEligibleShippingServices(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('returns lists of shipping services if succesful with no additional input', async () => {
      expect.assertions(1)

      const mockGetEligibleShippingServices = createMockHttpClient(
        'merchant_fulfillment_get_eligible_shipping_services_no_additional_input',
      )

      expect(
        await mockGetEligibleShippingServices.merchantFulfillment.getEligibleShippingServices(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('returns lists of shipping services if succesful with additional input', async () => {
      expect.assertions(1)

      const mockGetEligibleShippingServices = createMockHttpClient(
        'merchant_fulfillment_get_eligible_shipping_services_additional_input',
      )

      expect(
        await mockGetEligibleShippingServices.merchantFulfillment.getEligibleShippingServices(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.merchantFulfillment.getEligibleShippingServices(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.merchantFulfillment.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.merchantFulfillment.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
