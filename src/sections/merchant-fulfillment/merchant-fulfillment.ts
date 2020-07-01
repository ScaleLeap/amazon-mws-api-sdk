import { boolean, Codec, enumeration, GetInterface, optional, string } from 'purify-ts'

import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { ensureArray, ensureString, mwsDate } from '../../parsing'
import { CurrencyAmount } from '../codec'
import { getServiceStatusByResource } from '../shared'
import {
  canonicalizeParametersGetEligibleShippingServiceParameters,
  GetEligibleShippingServicesParameters,
} from './type'

const MERCHANT_FULFILLMENT_API_VERSION = '2015-06-01'

const TemporarilyUnavailableCarrier = Codec.interface({
  CarrierName: string,
})

const RejectedShippingService = Codec.interface({
  CarrierName: string,
  ShippingServiceId: string,
  RejectionReasonCode: string,
  RejectionReasonMessage: string,
  ShippingServiceName: string,
})

enum DeliveryExperienceEnum {
  DeliveryConfirmationWithAdultSignature = 'DeliveryConfirmationWithAdultSignature',
  DeliveryConfirmationWithSignature = 'DeliveryConfirmationWithSignature',
  DeliveryConfirmationWithoutSignature = 'DeliveryConfirmationWithoutSignature',
  NoTracking = 'NoTracking',
}

const DeliveryExperience = enumeration(DeliveryExperienceEnum)

const ShippingServiceOptions = Codec.interface({
  DeliveryExperience,
  DeclaredValue: optional(CurrencyAmount),
  CarrierWillPickUp: boolean,
  LabelFormat: optional(string),
})

const ShippingService = Codec.interface({
  ShippingServiceName: string,
  CarrierName: string,
  ShippingServiceId: ensureString,
  ShippingServiceOfferId: ensureString,
  ShipDate: mwsDate,
  EarliestEstimatedDeliveryDate: optional(mwsDate),
  LatestEstimatedDeliveryDate: optional(mwsDate),
  Rate: CurrencyAmount,
  ShippingServiceOptions,
  AvailableLabelFormats: optional(ensureArray('LabelFormat', string)),
  RequiresAdditionalSellerInputs: boolean,
})

const GetEligibleShippingServices = Codec.interface({
  ShippingServiceList: ensureArray('ShippingService', ShippingService),
  RejectedShippingServiceList: ensureArray('RejectedShippingService', RejectedShippingService),
  TemporarilyUnavailableCarrierList: ensureArray(
    'TemporarilyUnavailableCarrier',
    TemporarilyUnavailableCarrier,
  ),
  TermsAndConditionsNotAcceptedCarrierList: ensureArray(
    'TermsAndConditionsNotAcceptedCarrier',
    TemporarilyUnavailableCarrier,
  ),
})

type GetEligibleShippingServices = GetInterface<typeof GetEligibleShippingServices>

const GetEligibleShippingServicesResponse = Codec.interface({
  GetEligibleShippingServicesResponse: Codec.interface({
    GetEligibleShippingServicesResult: GetEligibleShippingServices,
  }),
})

export class MerchantFulfillment {
  constructor(private httpClient: HttpClient) {}

  async getEligibleShippingServices(
    parameters: GetEligibleShippingServicesParameters,
  ): Promise<[GetEligibleShippingServices, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.MerchantFulfillment,
      version: MERCHANT_FULFILLMENT_API_VERSION,
      action: 'GetEligibleShippingServices',
      parameters: canonicalizeParametersGetEligibleShippingServiceParameters(parameters),
    })

    return GetEligibleShippingServicesResponse.decode(response).caseOf({
      Right: (x) => [x.GetEligibleShippingServicesResponse.GetEligibleShippingServicesResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.MerchantFulfillment,
      MERCHANT_FULFILLMENT_API_VERSION,
    )
  }
}
