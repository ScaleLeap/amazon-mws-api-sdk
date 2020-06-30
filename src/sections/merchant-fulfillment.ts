import { record, string, unknown } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const MERCHANT_FULFILLMENT_API_VERSION = '2015-06-01'

export interface Weight {
  Value: number
  Unit: 'ounces' | 'grams'
  [key: string]: string | number
}

export type SellerInputDataType =
  | 'String'
  | 'Boolean'
  | 'Integer'
  | 'Timestamp'
  | 'Address'
  | 'Weight'
  | 'Dimension'
  | 'Currency'

export interface Address {
  Name: string
  AddressLine1: string
  AddressLine2?: string
  AddressLine3?: string
  DistrictOrCounty?: string
  Email: string
  City: string
  StateOrProvinceCode?: string
  PostalCode: string
  CountryCode: string
  Phone: string
  [key: string]: string | undefined
}

export type PredefinedPackageDimensions =
  | 'FedEx_Box_10kg'
  | 'FedEx_Box_25kg'
  | 'FedEx_Box_Extra_Large_1'
  | 'FedEx_Box_Extra_Large_2'
  | 'FedEx_Box_Large_1'
  | 'FedEx_Box_Large_2'
  | 'FedEx_Box_Medium_1'
  | 'FedEx_Box_Medium_2'
  | 'FedEx_Box_Small_1'
  | 'FedEx_Box_Small_2'
  | 'FedEx_Envelope'
  | 'FedEx_Padded_Pak'
  | 'FedEx_Pak_1'
  | 'FedEx_Pak_2'
  | 'FedEx_Tube'
  | 'FedEx_XL_Pak'
  | 'UPS_Box_10kg'
  | 'UPS_Box_25kg'
  | 'UPS_Express_Box'
  | 'UPS_Express_Box_Large'
  | 'UPS_Express_Box_Medium'
  | 'UPS_Express_Box_Small'
  | 'UPS_Express_Envelope'
  | 'UPS_Express_Hard_Pak'
  | 'UPS_Express_Legal_Envelope'
  | 'UPS_Express_Pak'
  | 'UPS_Express_Tube'
  | 'UPS_Laboratory_Pak'
  | 'UPS_Pad_Pak'
  | 'UPS_Pallet'
  | 'USPS_Card'
  | 'USPS_Flat'
  | 'USPS_FlatRateCardboardEnvelope'
  | 'USPS_FlatRateEnvelope'
  | 'USPS_FlatRateGiftCardEnvelope'
  | 'USPS_FlatRateLegalEnvelope'
  | 'USPS_FlatRatePaddedEnvelope'
  | 'USPS_FlatRateWindowEnvelope'
  | 'USPS_LargeFlatRateBoardGameBox'
  | 'USPS_LargeFlatRateBox'
  | 'USPS_Letter'
  | 'USPS_MediumFlatRateBox1'
  | 'USPS_MediumFlatRateBox2'
  | 'USPS_RegionalRateBoxA1'
  | 'USPS_RegionalRateBoxA2'
  | 'USPS_RegionalRateBoxB1'
  | 'USPS_RegionalRateBoxB2'
  | 'USPS_RegionalRateBoxC'
  | 'USPS_SmallFlatRateBox'
  | 'USPS_SmallFlatRateEnvelope'

export interface PackageDimensions {
  Length?: number
  Width?: number
  Height?: number
  Unit?: 'inches' | 'centimeters'
  PredefinedPackageDimensions?: PredefinedPackageDimensions
  [key: string]: string | number | undefined
}

export interface CurrencyAmount {
  CurrencyCode: string
  Amount: number
  [key: string]: string | number
}
export interface AdditionalSellerInput {
  DataType: SellerInputDataType
  ValueAsString?: string
  ValueAsBoolean?: boolean
  ValueAsInteger?: number
  // @todo
  // ValueAsTimestamp?: Date // this needs an issue. "parameters should be able to handle Date objects"
  ValueAsTimestamp?: string
  ValueAsAddress?: Address
  ValueAsWeight?: Weight
  ValueAsDimension?: PackageDimensions
  ValueAsCurrency?: CurrencyAmount
}

interface AdditionalSellerInputs {
  AdditionalInputFieldName: string
  AdditionalSellerInput: AdditionalSellerInput
}

/**
 * Needs clarification
 * @todo
 * http://docs.developer.amazonservices.com/en_CA/merch_fulfill/MerchFulfill_Datatypes.html#ItemLevelSellerInputs
 */
export interface ItemLevelSellerInputsList {
  AdditionalSellerInputs: AdditionalSellerInputs[]
}

export interface Item {
  OrderItemId: string
  Quantity: number
  ItemWeight?: Weight
  ItemDescription?: string
  TransparencyCodeList?: string[]
  // ItemLevelSellerInputsList?: ItemLevelSellerInputsList // Need to do more research on this
}

export type DeliveryExperience =
  | 'DeliveryConfirmationWithAdultSignature'
  | 'DeliveryConfirmationWithSignature'
  | 'DeliveryConfirmationWithoutSignature'
  | 'NoTracking'

export interface ShippingServiceOptions {
  DeliveryExperience: DeliveryExperience
  DeclaredValue?: CurrencyAmount
  CarrierWillPickup: boolean
  LabelFormat?: string
  [key: string]: string | boolean | undefined | DeliveryExperience | CurrencyAmount
}

export interface LabelCustomization {
  CustomTextForLabel?: string
  StandardIdForLabel?: string
  [key: string]: string | undefined
}
export interface ShipmentRequestDetails {
  AmazonOrderId: string
  SellerOrderId?: string
  ItemList: Item[]
  ShipFromAddress: Address
  PackageDimensions: PackageDimensions
  Weight: Weight
  MustArriveByDate?: Date
  ShipDate?: Date
  ShippingServiceOptions: ShippingServiceOptions
  LabelCustomization?: LabelCustomization
}

export interface ShippingOfferingFilter {
  IncludeComplexShippingOptions?: boolean
}
export interface GetEligibleShippingServicesParameters {
  ShipmentRequestDetails: ShipmentRequestDetails
  ShippingOfferingFilter?: ShippingOfferingFilter
}

const canonicalizeParametersGetEligibleShippingServiceParameters = (
  parameters: GetEligibleShippingServicesParameters,
) => {
  const { ShipmentRequestDetails, ShippingOfferingFilter } = parameters
  const {
    AmazonOrderId,
    SellerOrderId,
    ShipFromAddress,
    PackageDimensions,
    Weight,
    MustArriveByDate,
    ShipDate,
    ShippingServiceOptions,
    LabelCustomization,
  } = ShipmentRequestDetails
  const ItemsList = ShipmentRequestDetails?.ItemList.map((item) => ({
    ...item,
    TransparencyCodeList: undefined,
    'TransparemcyCodeList.TransparencyCode': item.TransparencyCodeList,
  }))
  return {
    ShippingOfferingFilter: {
      IncludeComplexShippingOptions: ShippingOfferingFilter?.IncludeComplexShippingOptions,
    },
    ShipmentRequestDetails: {
      AmazonOrderId,
      SellerOrderId,
      'ItemList.Item': ItemsList,
      ShipFromAddress,
      PackageDimensions,
      Weight,
      MustArriveByDate: MustArriveByDate?.toISOString(),
      ShipDate: ShipDate?.toISOString(),
      ShippingServiceOptions,
      LabelCustomization,
    },
  }
}

// @todo
const GetEligibleShippingServicesResponse = record(string, unknown)

export class MerchantFulfillment {
  constructor(private httpClient: HttpClient) {}

  async getEligibleShippingServices(parameters: GetEligibleShippingServicesParameters) {
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
