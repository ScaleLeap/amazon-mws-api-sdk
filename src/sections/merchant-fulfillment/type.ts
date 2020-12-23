export interface CanonicalizedAddtionalSellerInput {
  ValueAsString?: string
  ValueAsBoolean?: boolean
  ValueAsInteger?: number
  ValueAsAddress?: Address
  ValueAsWeight?: Weight
  ValueAsDimension?: PackageDimensions
  ValueAsCurrency?: CurrencyAmount
  ValueAsTimestamp?: string
  DataType: SellerInputDataType
  [key: string]:
    | string
    | boolean
    | number
    | Address
    | Weight
    | PackageDimensions
    | CurrencyAmount
    | string
    | undefined
}
export interface CanonicalizedSellerInputs {
  AdditionalInputFieldName: string
  AdditionalSellerInput: CanonicalizedAddtionalSellerInput
  [key: string]: string | CanonicalizedAddtionalSellerInput
}

export const canonicalizeAdditionalSellerInputs = (
  inputList: AdditionalSellerInputs[] | undefined,
): CanonicalizedSellerInputs[] | undefined =>
  inputList?.map((input) => {
    const { AdditionalInputFieldName, AdditionalSellerInput } = input
    const {
      ValueAsString,
      ValueAsBoolean,
      ValueAsInteger,
      ValueAsAddress,
      ValueAsWeight,
      ValueAsTimestamp,
      ValueAsDimension,
      ValueAsCurrency,
      DataType,
    } = AdditionalSellerInput

    return {
      AdditionalInputFieldName,
      AdditionalSellerInput: {
        DataType,
        ValueAsString,
        ValueAsBoolean,
        ValueAsInteger,
        ValueAsAddress,
        ValueAsWeight,
        ValueAsDimension,
        ValueAsCurrency,
        ValueAsTimestamp: ValueAsTimestamp?.toISOString(),
      },
    }
  })

export interface CanonicalizedItem {
  OrderItemId: string
  Quantity: number
  ItemWeight?: Weight
  ItemDescription?: string
  TransparencyCodeList?: string[]
  ItemLevelSellerInputsList?: CanonicalizedSellerInputs[]
  [key: string]: string | number | Weight | string[] | CanonicalizedSellerInputs[] | undefined
}

export interface CanonicalizedShipmentRequestDetails {
  AmazonOrderId: string
  SellerOrderId?: string
  'ItemList.Item': CanonicalizedItem[]
  ShipFromAddress: Address
  PackageDimensions: PackageDimensions
  Weight: Weight
  MustArriveByDate?: string
  ShipDate?: string
  ShippingServiceOptions: ShippingServiceOptions
  LabelCustomization?: LabelCustomization
  [key: string]:
    | string
    | CanonicalizedItem[]
    | Address
    | PackageDimensions
    | Weight
    | ShippingServiceOptions
    | LabelCustomization
    | undefined
}

// @todo unit test both of these
export const canonicalizeShipmentRequestDetails = (
  shipmentRequestDetails: ShipmentRequestDetails,
): CanonicalizedShipmentRequestDetails => {
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
  } = shipmentRequestDetails

  const itemsList = shipmentRequestDetails?.ItemList.map((item) => {
    const fixedInputsList = canonicalizeAdditionalSellerInputs(item.ItemLevelSellerInputsList)

    return {
      OrderItemId: item.OrderItemId,
      Quantity: item.Quantity,
      ItemWeight: item.ItemWeight,
      ItemDescription: item.ItemDescription,
      'transparencyCodeList.member': item.TransparencyCodeList, // Lower case 't' because that's what' in the C# lib
      'ItemLevelSellerInputsList.member': fixedInputsList,
    }
  })

  return {
    AmazonOrderId,
    SellerOrderId,
    'ItemList.Item': itemsList,
    ShipFromAddress,
    PackageDimensions,
    Weight,
    MustArriveByDate: MustArriveByDate?.toISOString(),
    ShipDate: ShipDate?.toISOString(),
    ShippingServiceOptions,
    LabelCustomization,
  }
}

/**
 * END common functions
 */

/**
 * START GetEligibleShippingServicesParameters
 */

export type WeightUnit = 'ounces' | 'grams'

export interface Weight {
  Value: number
  Unit: WeightUnit
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
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
export enum PredefinedPackageDimensionsEnum {
  FedEx_Box_10kg = 'FedEx_Box_10kg',
  FedEx_Box_25kg = 'FedEx_Box_25kg',
  FedEx_Box_Extra_Large_1 = 'FedEx_Box_Extra_Large_1',
  FedEx_Box_Extra_Large_2 = 'FedEx_Box_Extra_Large_2',
  FedEx_Box_Large_1 = 'FedEx_Box_Large_1',
  FedEx_Box_Large_2 = 'FedEx_Box_Large_2',
  FedEx_Box_Medium_1 = 'FedEx_Box_Medium_1',
  FedEx_Box_Medium_2 = 'FedEx_Box_Medium_2',
  FedEx_Box_Small_1 = 'FedEx_Box_Small_1',
  FedEx_Box_Small_2 = 'FedEx_Box_Small_2',
  FedEx_Envelope = 'FedEx_Envelope',
  FedEx_Padded_Pak = 'FedEx_Padded_Pak',
  FedEx_Pak_2 = 'FedEx_Pak_2',
  FedEx_Pak_1 = 'FedEx_Pak_1',
  FedEx_Tube = 'FedEx_Tube',
  FedEx_XL_Pak = 'FedEx_XL_Pak',
  UPS_Box_10kg = 'UPS_Box_10kg',
  UPS_Box_25kg = 'UPS_Box_25kg',
  UPS_Express_Box = 'UPS_Express_Box',
  UPS_Express_Box_Large = 'UPS_Express_Box_Large',
  UPS_Express_Box_Medium = 'UPS_Express_Box_Medium',
  UPS_Express_Box_Small = 'UPS_Express_Box_Small',
  UPS_Express_Envelope = 'UPS_Express_Envelope',
  UPS_Express_Hard_Pak = 'UPS_Express_Hard_Pak',
  UPS_Express_Legal_Envelope = 'UPS_Express_Legal_Envelope',
  UPS_Express_Pak = 'UPS_Express_Pak',
  UPS_Express_Tube = 'UPS_Express_Tube',
  UPS_Laboratory_Pak = 'UPS_Laboratory_Pak',
  UPS_Pad_Pak = 'UPS_Pad_Pak',
  UPS_Pallet = 'UPS_Pallet',
  USPS_Card = 'USPS_Card',
  USPS_Flat = 'USPS_Flat',
  USPS_FlatRateCardboardEnvelope = 'USPS_FlatRateCardboardEnvelope',
  USPS_FlatRateEnvelope = 'USPS_FlatRateEnvelope',
  USPS_FlatRateGiftCardEnvelope = 'USPS_FlatRateGiftCardEnvelope',
  USPS_FlatRateLegalEnvelope = 'USPS_FlatRateLegalEnvelope',
  USPS_FlatRatePaddedEnvelope = 'USPS_FlatRatePaddedEnvelope',
  USPS_FlatRateWindowEnvelope = 'USPS_FlatRateWindowEnvelope',
  USPS_LargeFlatRateBoardGameBox = 'USPS_LargeFlatRateBoardGameBox',
  USPS_LargeFlatRateBox = 'USPS_LargeFlatRateBox',
  USPS_Letter = 'USPS_Letter',
  USPS_MediumFlatRateBox1 = 'USPS_MediumFlatRateBox1',
  USPS_MediumFlatRateBox2 = 'USPS_MediumFlatRateBox2',
  USPS_RegionalRateBoxA1 = 'USPS_RegionalRateBoxA1',
  USPS_RegionalRateBoxA2 = 'USPS_RegionalRateBoxA2',
  USPS_RegionalRateBoxB1 = 'USPS_RegionalRateBoxB1',
  USPS_RegionalRateBoxB2 = 'USPS_RegionalRateBoxB2',
  USPS_RegionalRateBoxC = 'USPS_RegionalRateBoxC',
  USPS_SmallFlatRateBox = 'USPS_SmallFlatRateBox',
  USPS_SmallFlatRateEnvelope = 'USPS_SmallFlatRateEnvelope',
}
/* eslint-enable camelcase */

export type PredefinedPackageDimensions = keyof typeof PredefinedPackageDimensionsEnum

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
  ValueAsTimestamp?: Date
  ValueAsAddress?: Address
  ValueAsWeight?: Weight
  ValueAsDimension?: PackageDimensions
  ValueAsCurrency?: CurrencyAmount
  [key: string]: undefined | string | boolean | number | Date | Record<string, unknown>
}
export interface AdditionalSellerInputs {
  AdditionalInputFieldName: string
  AdditionalSellerInput: AdditionalSellerInput
  [key: string]: string | AdditionalSellerInput
}

export interface Item {
  OrderItemId: string
  Quantity: number
  ItemWeight?: Weight
  ItemDescription?: string
  TransparencyCodeList?: string[]
  ItemLevelSellerInputsList?: AdditionalSellerInputs[]
}

export type DeliveryExperience =
  | 'DeliveryConfirmationWithAdultSignature'
  | 'DeliveryConfirmationWithSignature'
  | 'DeliveryConfirmationWithoutSignature'
  | 'NoTracking'

export interface ShippingServiceOptions {
  DeliveryExperience: DeliveryExperience
  DeclaredValue?: CurrencyAmount
  CarrierWillPickUp: boolean
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

// @todo unit test
export const canonicalizeParametersGetEligibleShippingServiceParameters = (
  parameters: GetEligibleShippingServicesParameters,
) => {
  const { ShipmentRequestDetails, ShippingOfferingFilter } = parameters
  return {
    ShippingOfferingFilter: {
      IncludeComplexShippingOptions: ShippingOfferingFilter?.IncludeComplexShippingOptions,
    },
    ShipmentRequestDetails: canonicalizeShipmentRequestDetails(ShipmentRequestDetails),
  }
}

/**
 * END GetEligibleShippingServicesParameters
 */

export interface GetAdditionalSellerInputsParameters {
  OrderId: string
  ShippingServiceId: string
  ShipFromAddress: Address
  [key: string]: string | Address
}

/**
 * START CreateShipmentParameters
 */

export type HazmatType = 'None' | 'LQHazmat'

export interface LabelFormatOption {
  IncludePackingSlipWithLabel: boolean
  [key: string]: boolean
}
export interface CreateShipmentParameters {
  ShipmentRequestDetails: ShipmentRequestDetails
  ShippingServiceId: string
  ShippingServiceOfferId?: string
  HazmatType?: HazmatType
  LabelFormatOption?: LabelFormatOption
  ShipmentLevelSellerInputsList?: AdditionalSellerInputs[]
}

export interface CanonicalizedCreateShipmentParameters {
  ShipmentRequestDetails: CanonicalizedShipmentRequestDetails
  ShippingServiceId: string
  ShippingServiceOfferId?: string
  HazmatType?: HazmatType
  LabelFormatOption?: LabelFormatOption
  'ShipmentLevelSellerInputsList.member'?: CanonicalizedSellerInputs[]
  [key: string]:
    | CanonicalizedShipmentRequestDetails
    | string
    | HazmatType
    | LabelFormatOption
    | CanonicalizedSellerInputs[]
    | undefined
}

export const canonicalizeCreateShipmentParameters = (
  parameters: CreateShipmentParameters,
): CanonicalizedCreateShipmentParameters => {
  const {
    ShipmentRequestDetails,
    ShippingServiceId,
    ShippingServiceOfferId,
    HazmatType,
    LabelFormatOption,
    ShipmentLevelSellerInputsList,
  } = parameters
  return {
    ShipmentRequestDetails: canonicalizeShipmentRequestDetails(ShipmentRequestDetails),
    ShippingServiceId,
    ShippingServiceOfferId,
    HazmatType,
    LabelFormatOption,
    'ShipmentLevelSellerInputsList.member': canonicalizeAdditionalSellerInputs(
      ShipmentLevelSellerInputsList,
    ),
  }
}

/**
 * END CreateShipmentParameters
 */

export interface GetShipmentParameters {
  ShipmentId: string
}

export interface CancelShipmentParameters {
  ShipmentId: string
}
