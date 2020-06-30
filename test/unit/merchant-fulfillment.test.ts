import { ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('merchant-fulfillment', () => {
  describe('getEligiblShippingServices', () => {
    const Address = {
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

    const Weight = {
      Value: 1,
      Unit: '',
    }

    // const CurrencyAmount = {
    //   CurrencyCode: 'PHP',
    //   Amount: 1,
    // }

    const ShippingServiceOptions = {
      DeliveryExperience: 'DeliveryConfirmationWithAdultSignature',
      CarrierWillPickup: false,
    }

    const ShipmentRequestDetails = {
      AmazonOrderId: '',
      SellerOrderId: '',
      ItemList: [],
      ShipFromAddress: Address,
      PackageDimensions,
      Weight,
      MustArriveByDate: new Date(),
      ShipDate: new Date(),
      ShippingServiceOptions,
    }

    const parameters = {
      ShipmentRequestDetails,
    }

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
        mockMwsFail.merchantFulfillment.getEligibleShippingServices(),
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
