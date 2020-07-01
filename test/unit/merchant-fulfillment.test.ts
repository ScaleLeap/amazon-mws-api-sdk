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

describe('merchant-fulfillment', () => {
  describe('getAdditionalSellerInputs', () => {
    const parameters = {
      OrderId: '',
      ShippingServiceId: '',
      ShipFromAddress: mockAddress,
    }

    it('returns shipment level fields and item level fields if succesful', async () => {
      expect.assertions(1)

      const mockGetAdditionalSellerInputs = createMockHttpClient(
        'merchant_get_additional_seller_inputs',
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

  describe('getEligiblShippingServices', () => {
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

    const ShipmentRequestDetails = {
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

    const parameters: GetEligibleShippingServicesParameters = {
      ShipmentRequestDetails,
    }

    it('returns lists of shipping services if succesful with test from C# mocks', async () => {
      expect.assertions(1)

      const mockGetEligibleShippingServices = createMockHttpClient(
        'merchant_fulfillment_get_eligible_shipping_services_no_from_c_sharp',
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
