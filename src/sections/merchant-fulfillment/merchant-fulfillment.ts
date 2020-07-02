import { boolean, Codec, enumeration, GetInterface, number, optional, string } from 'purify-ts'

import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { ensureArray, ensureString, mwsDate } from '../../parsing'
import { CurrencyAmount } from '../codec'
import { getServiceStatusByResource } from '../shared'
import {
  canonicalizeParametersGetEligibleShippingServiceParameters,
  GetAdditionalSellerInputsParameters,
  GetEligibleShippingServicesParameters,
  PredefinedPackageDimensionsEnum,
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

enum DataTypeEnum {
  String = 'String',
  Boolean = 'Boolean',
  Integer = 'Integer',
  Timestamp = 'Timestamp',
  Address = 'Address',
  Weight = 'Weight',
  Dimension = 'Dimension',
  Currency = 'Currency',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  INTEGER = 'INTEGER',
  TIMESTAMP = 'TIMESTAMP',
  ADDRESS = 'ADDRESS',
  WEIGHT = 'WEIGHT',
  DIMENSION = 'DIMENSION',
  CURRENCY = 'CURRENCY',
}

const DataType = enumeration(DataTypeEnum)

const Constraints = Codec.interface({
  ValidationRegEx: string,
  ValidationString: string,
})

enum InputTargetEnum {
  ITEM_LEVEL = 'ITEM_LEVEL',
  SHIPMENT_LEVEL = 'SHIPMENT_LEVEL',
}

const InputTarget = enumeration(InputTargetEnum)

const Address = Codec.interface({
  Name: string,
  AddressLine1: string,
  AddressLine2: optional(string),
  AddressLine3: optional(string),
  DistrictOrCounty: optional(string),
  Email: string,
  City: string,
  StateOrProvinceCode: optional(string),
  PostalCode: string,
  CountryCode: string,
  Phone: string,
})

const Weight = Codec.interface({
  Value: number,
  Unit: string,
})

const PredefinedPackageDimensions = enumeration(PredefinedPackageDimensionsEnum)

enum DimensionsUnitEnum {
  inches = 'inches',
  centimeters = 'centimeters',
}

const DimensionsUnit = enumeration(DimensionsUnitEnum)

const PackageDimensions = Codec.interface({
  Length: optional(number),
  Width: optional(number),
  Height: optional(number),
  Unit: optional(DimensionsUnit),
  PredefinedPackageDimensions: optional(PredefinedPackageDimensions),
})

const StoredValue = Codec.interface({
  DataType,
  ValueAsString: optional(ensureString),
  ValueAsBoolean: optional(boolean),
  ValueAsInteger: optional(number),
  ValueAsTimeStamp: optional(mwsDate),
  ValueAsAddress: optional(Address),
  ValueAsWeight: optional(Weight),
  ValueAsDimension: optional(PackageDimensions),
  ValueAsCurrency: optional(CurrencyAmount),
})

const SellerInputDefinition = Codec.interface({
  IsRequired: boolean,
  DataType,
  Constraints: ensureArray('member', Constraints),
  InputDisplayText: string,
  InputTarget: optional(InputTarget),
  // This is 'required' in docs, but it's not present in some examples
  StoredValue: optional(StoredValue),
  RestrictedSetValues: optional(ensureArray('member', string)),
})

enum AdditionalInputFieldNameEnum {
  NON_DELIVERABLE_INSTRUCTIONS = 'NON_DELIVERABLE_INSTRUCTIONS',
  SENDER_ADDRESS_TRANSLATED = 'SENDER_ADDRESS_TRANSLATED',
}

const AdditionalInputFieldName = enumeration(AdditionalInputFieldNameEnum)

const ShipmentLeveFields = Codec.interface({
  AdditionalInputFieldName: optional(AdditionalInputFieldName),
  SellerInputDefinition: optional(SellerInputDefinition),
})

const AdditionalInputs = Codec.interface({
  AdditionalInputFieldName: string,
  SellerInputDefinition,
})

const ItemLevelFields = Codec.interface({
  Asin: string,
  AdditionalInputs: ensureArray('member', AdditionalInputs),
})

const GetAdditionalSellerInputs = Codec.interface({
  ShipmentLevelFields: ensureArray('member', ShipmentLeveFields),
  ItemLevelFieldsList: ensureArray('member', ItemLevelFields),
})
type GetAdditionalSellerInputs = GetInterface<typeof GetAdditionalSellerInputs>

const GetAdditionalSellerInputsResponse = Codec.interface({
  GetAdditionalSellerInputsResponse: Codec.interface({
    GetAdditionalSellerInputsResult: GetAdditionalSellerInputs,
  }),
})
export class MerchantFulfillment {
  constructor(private httpClient: HttpClient) {}

  async getAddtionalSellerInputs(
    parameters: GetAdditionalSellerInputsParameters,
  ): Promise<[GetAdditionalSellerInputs, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.MerchantFulfillment,
      version: MERCHANT_FULFILLMENT_API_VERSION,
      action: 'GetAdditionalSellerInputs',
      parameters,
    })

    return GetAdditionalSellerInputsResponse.decode(response).caseOf({
      Right: (x) => [x.GetAdditionalSellerInputsResponse.GetAdditionalSellerInputsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

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
