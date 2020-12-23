import { boolean, Codec, enumeration, GetType, number, optional, string } from 'purify-ts'

import { ASIN, ensureArray, ensureString, mwsDate } from '../../parsing'
import { PredefinedPackageDimensionsEnum } from './type'

export const TemporarilyUnavailableCarrier = Codec.interface({
  CarrierName: string,
})

const CurrencyAmount = Codec.interface({
  CurrencyCode: string,
  Amount: number,
})

export const RejectedShippingService = Codec.interface({
  CarrierName: string,
  ShippingServiceId: ensureString,
  RejectionReasonCode: string,
  RejectionReasonMessage: string,
  ShippingServiceName: string,
})

export enum DeliveryExperienceEnum {
  DeliveryConfirmationWithAdultSignature = 'DeliveryConfirmationWithAdultSignature',
  DeliveryConfirmationWithSignature = 'DeliveryConfirmationWithSignature',
  DeliveryConfirmationWithoutSignature = 'DeliveryConfirmationWithoutSignature',
  NoTracking = 'NoTracking',
  // Adding this in because it has been in two mock requests from Amazon, but is not in the docs
  DELIVERY_CONFIRMATION = 'DELIVERY_CONFIRMATION',
}

const DeliveryExperience = enumeration(DeliveryExperienceEnum)

const ShippingServiceOptions = Codec.interface({
  DeliveryExperience,
  DeclaredValue: optional(CurrencyAmount),
  CarrierWillPickUp: boolean,
  LabelFormat: optional(string),
})

export const ShippingService = Codec.interface({
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
  RequiresAdditionalSellerInputs: optional(boolean),
})

export const GetEligibleShippingServices = Codec.interface({
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

export type GetEligibleShippingServices = GetType<typeof GetEligibleShippingServices>

export const GetEligibleShippingServicesResponse = Codec.interface({
  GetEligibleShippingServicesResponse: Codec.interface({
    GetEligibleShippingServicesResult: GetEligibleShippingServices,
  }),
})

export enum DataTypeEnum {
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

export const DataType = enumeration(DataTypeEnum)

export const Constraints = Codec.interface({
  ValidationRegEx: string,
  ValidationString: string,
})

export enum InputTargetEnum {
  ITEM_LEVEL = 'ITEM_LEVEL',
  SHIPMENT_LEVEL = 'SHIPMENT_LEVEL',
}

export const InputTarget = enumeration(InputTargetEnum)

const Address = Codec.interface({
  Name: string,
  AddressLine1: string,
  AddressLine2: optional(string),
  AddressLine3: optional(string),
  DistrictOrCounty: optional(string),
  Email: string,
  City: string,
  StateOrProvinceCode: optional(string),
  PostalCode: ensureString,
  CountryCode: string,
  Phone: ensureString,
})

const Weight = Codec.interface({
  Value: number,
  Unit: string,
})

const PredefinedPackageDimensions = enumeration(PredefinedPackageDimensionsEnum)

export enum DimensionsUnitEnum {
  inches = 'inches',
  centimeters = 'centimeters',
}

export const DimensionsUnit = enumeration(DimensionsUnitEnum)

const PackageDimensions = Codec.interface({
  Length: optional(number),
  Width: optional(number),
  Height: optional(number),
  Unit: optional(DimensionsUnit),
  PredefinedPackageDimensions: optional(PredefinedPackageDimensions),
})

export const StoredValue = Codec.interface({
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

export const SellerInputDefinition = Codec.interface({
  IsRequired: boolean,
  DataType,
  Constraints: ensureArray('member', Constraints),
  InputDisplayText: string,
  InputTarget: optional(InputTarget),
  // This is 'required' in docs, but it's not present in some examples
  StoredValue: optional(StoredValue),
  RestrictedSetValues: optional(ensureArray('member', string)),
})

export enum AdditionalInputFieldNameEnum {
  NON_DELIVERABLE_INSTRUCTIONS = 'NON_DELIVERABLE_INSTRUCTIONS',
  SENDER_ADDRESS_TRANSLATED = 'SENDER_ADDRESS_TRANSLATED',
}

export const AdditionalInputFieldName = enumeration(AdditionalInputFieldNameEnum)

export const ShipmentLeveFields = Codec.interface({
  AdditionalInputFieldName: optional(AdditionalInputFieldName),
  SellerInputDefinition: optional(SellerInputDefinition),
})

export const AdditionalInputs = Codec.interface({
  AdditionalInputFieldName: string,
  SellerInputDefinition,
})

export const ItemLevelFields = Codec.interface({
  Asin: ASIN,
  AdditionalInputs: ensureArray('member', AdditionalInputs),
})

export const GetAdditionalSellerInputs = Codec.interface({
  ShipmentLevelFields: ensureArray('member', ShipmentLeveFields),
  ItemLevelFieldsList: ensureArray('member', ItemLevelFields),
})
export type GetAdditionalSellerInputs = GetType<typeof GetAdditionalSellerInputs>

export const GetAdditionalSellerInputsResponse = Codec.interface({
  GetAdditionalSellerInputsResponse: Codec.interface({
    GetAdditionalSellerInputsResult: GetAdditionalSellerInputs,
  }),
})

export enum MerchantFulfillmentStatusEnum {
  Purchase = 'Purchased',
  RefundPending = 'RefundPending',
  RefundRejected = 'RefundRejected',
  RefundApplied = 'RefundApplied ',
}

const ItemLevelSellerInputsList = Codec.interface({
  DataType,
  ValueAsString: optional(string),
  ValueAsBoolean: optional(boolean),
  ValueAsInteger: optional(number),
  ValueAsTimestamp: optional(mwsDate),
  ValueAsAddress: optional(Address),
  ValueAsWeight: optional(Weight),
  ValueAsDimension: optional(PackageDimensions),
  ValueAsCurrency: optional(CurrencyAmount),
})

const Status = enumeration(MerchantFulfillmentStatusEnum)
const Item = Codec.interface({
  OrderItemId: ensureString,
  Quantity: number,
  ItemWeight: optional(Weight),
  ItemDescription: optional(string),
  transparencyCodeList: optional(ensureArray('member', string)),
  ItemLevelSellerInputsList: optional(ensureArray('member', ItemLevelSellerInputsList)),
})

const LabelDimensions = Codec.interface({
  Length: number,
  Width: number,
  Unit: DimensionsUnit,
})

const FileContents = Codec.interface({
  Contents: string,
  FileType: string,
  Checksum: string,
})

const Label = Codec.interface({
  CustomTextForLabel: optional(string),
  Dimensions: LabelDimensions,
  FileContents,
  LabelFormat: optional(string),
  StandardIdForLabel: optional(string),
})

export const Shipment = Codec.interface({
  ShipmentId: ensureString,
  AmazonOrderId: ensureString,
  SellerOrderId: optional(ensureString),
  ItemList: ensureArray('Item', Item),
  ShipFromAddress: Address,
  ShipToAddress: Address,
  PackageDimensions,
  Weight,
  Insurance: CurrencyAmount,
  ShippingService,
  Label,
  Status,
  TrackingId: optional(ensureString),
  CreatedDate: mwsDate,
  LastUpdatedDate: optional(mwsDate),
})

export const CreateShipment = Codec.interface({
  Shipment,
})

export type CreateShipment = GetType<typeof CreateShipment>

export const CreateShipmentResponse = Codec.interface({
  CreateShipmentResponse: Codec.interface({
    CreateShipmentResult: CreateShipment,
  }),
})

export const GetShipment = Codec.interface({
  Shipment,
})

export type GetShipment = GetType<typeof GetShipment>

export const GetShipmentResponse = Codec.interface({
  GetShipmentResponse: Codec.interface({
    GetShipmentResult: GetShipment,
  }),
})

export const CancelShipment = Codec.interface({
  Shipment,
})

export type CancelShipment = GetType<typeof CancelShipment>

export const CancelShipmentResponse = Codec.interface({
  CancelShipmentResponse: Codec.interface({
    CancelShipmentResult: CancelShipment,
  }),
})
