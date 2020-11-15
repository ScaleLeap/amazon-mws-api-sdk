import { boolean, Codec, enumeration, GetType, number, optional, string } from 'purify-ts'

import { ensureArray, ensureString, mwsDate, nextToken as nextTokenCodec } from '../../parsing'
import {
  FISFeeTypesEnum,
  FISWeightUnitEnum,
  FulfillmentActionEnum,
  FulfillmentPolicyEnum,
  ShippingSpeedCategoryEnum,
} from './type'

const ShippingSpeedCategory = enumeration(ShippingSpeedCategoryEnum)

const FISWeightUnit = enumeration(FISWeightUnitEnum)

const FISWeight = Codec.interface({
  Unit: FISWeightUnit,
  Value: ensureString,
})

const FISFeeTypes = enumeration(FISFeeTypesEnum)

const FISCurrency = Codec.interface({
  CurrencyCode: string,
  Value: ensureString,
})

const FISFee = Codec.interface({
  Name: FISFeeTypes,
  Amount: FISCurrency,
})

const FulfillmentPreviewItem = Codec.interface({
  SellerSKU: string,
  SellerFulfillmentOrderItemId: ensureString,
  Quantity: number,
  EstimatedShippingWeight: optional(FISWeight),
  ShippingWeightCalculationMethod: string,
})

const FulfillmentPreviewShipment = Codec.interface({
  EarliestShipDate: mwsDate,
  LatestShipDate: mwsDate,
  EarliestArrivalDate: mwsDate,
  LatestArrivalDate: mwsDate,
  FulfillmentPreviewItems: ensureArray('member', FulfillmentPreviewItem),
})

const UnfulfillablePreviewItem = Codec.interface({
  SellerSKU: string,
  SellerFulfillmentOrderItemId: string,
  Quantity: number,
  ItemUnfulfillableReasons: ensureArray('member', string),
})

const DeliveryWindow = Codec.interface({
  StartDateTime: mwsDate,
  EndDateTime: mwsDate,
})

const ScheduledDeliveryInfo = Codec.interface({
  DeliveryTimeZone: string,
  DeliveryWindows: ensureArray('member', DeliveryWindow),
})

const FulfillmentPreview = Codec.interface({
  ShippingSpeedCategory,
  IsFulfillable: boolean,
  IsCODCapable: boolean,
  MarketplaceId: optional(string),
  EstimatedShippingWeight: optional(FISWeight),
  EstimatedFees: optional(ensureArray('member', FISFee)),
  FulfillmentPreviewShipments: optional(ensureArray('member', FulfillmentPreviewShipment)),
  UnfulfillablePreviewItems: optional(ensureArray('member', UnfulfillablePreviewItem)),
  OrderUnfulfillableReasons: optional(ensureArray('member', string)),
  ScheduledDeliveryInfo: optional(ScheduledDeliveryInfo),
})

export const GetFulfillmentPreview = Codec.interface({
  FulfillmentPreviews: ensureArray('member', FulfillmentPreview),
})

export type GetFulfillmentPreview = GetType<typeof GetFulfillmentPreview>

export const GetFulfillmentPreviewResponse = Codec.interface({
  GetFulfillmentPreviewResponse: Codec.interface({
    GetFulfillmentPreviewResult: GetFulfillmentPreview,
  }),
})

const StandardResponse = Codec.interface({
  /**
   * This part of the response is usually ignored but, this response returns exactly nothing
   * This is just here to make sure the response is parsed correctly
   */
  ResponseMetadata: Codec.interface({
    RequestId: string,
  }),
})

export const CreateFulfillmentOrderResponse = Codec.interface({
  CreateFulfillmentOrderResponse: StandardResponse,
})

export const UpdateFulfillmentOrderResponse = Codec.interface({
  UpdateFulfillmentOrderResponse: StandardResponse,
})

const FOSAddress = Codec.interface({
  Name: string,
  Line1: string,
  Line2: optional(string),
  Line3: optional(string),
  DistrictOrCounty: optional(string),
  City: optional(string),
  StateOrProvinceCode: string,
  CountryCode: string,
  PostalCode: optional(ensureString),
  PhoneNumber: optional(string),
})

export enum FulfillmentOrderStatusEnum {
  'RECEIVED',
  'INVALID',
  'PLANNING',
  'PROCESSING',
  'CANCELLED',
  'COMPLETE',
  'COMPLETE_PARTIALLED',
  'UNFULFILLABLE',
}

const FulfillmentPolicy = enumeration(FulfillmentPolicyEnum)

const FulfillmentAction = enumeration(FulfillmentActionEnum)

const FulfillmentOrderStatus = enumeration(FulfillmentOrderStatusEnum)

const CODSettings = Codec.interface({
  IsCODRequired: optional(boolean),
  CODCharge: optional(FISCurrency),
  CODChargeTax: optional(FISCurrency),
  ShippingCharge: optional(FISCurrency),
  ShippingChargeTax: optional(FISCurrency),
})

const FulfillmentOrder = Codec.interface({
  SellerFulfillmentOrderId: string,
  MarketplaceId: optional(string),
  DisplayableOrderId: ensureString,
  DisplayableOrderDateTime: mwsDate,
  DisplayableOrderComment: string,
  ShippingSpeedCategory,
  DeliveryWindow: optional(DeliveryWindow),
  DestinationAddress: FOSAddress,
  FulfillmentAction: optional(FulfillmentAction),
  FulfillmentPolicy: optional(FulfillmentPolicy),
  ReceivedDateTime: mwsDate,
  FulfillmentOrderStatus,
  StatusUpdatedDateTime: mwsDate,
  NotificationEmailList: optional(ensureArray('member', string)),
  CODSettings: optional(CODSettings),
})

export const ListAllFulfillmentOrders = Codec.interface({
  NextToken: optional(nextTokenCodec('ListAllFulfillmentOrders')),
  FulfillmentOrders: ensureArray('member', FulfillmentOrder),
})

export type ListAllFulfillmentOrders = GetType<typeof ListAllFulfillmentOrders>

export const ListAllFulfillmentOrdersResponse = Codec.interface({
  ListAllFulfillmentOrdersResponse: Codec.interface({
    ListAllFulfillmentOrdersResult: ListAllFulfillmentOrders,
  }),
})

const FulfillmentOrderItem = Codec.interface({
  SellerSKU: string,
  SellerFulfillmentOrderItemId: string,
  Quantity: number,
  GiftMessage: optional(string),
  DisplayableComment: optional(string),
  FulfillmentNetworkSKU: optional(string),
  CancelledQuantity: number,
  UnfulfillableQuantity: number,
  EstimatedShipDateTime: optional(mwsDate),
  EstimatedArrivalDateTime: optional(mwsDate),
  PerUnitDecalredValue: optional(FISCurrency),
  PerUnitPrice: optional(FISCurrency),
  PerUnitTax: optional(FISCurrency),
})

export enum FulfillmentShipmentStatusEnum {
  'PENDING',
  'SHIPPED',
  'CANCELLED_BY_FULFILLER',
  'CANCELLED_BY_SELLER',
}

const FulfillmentShipmentStatus = enumeration(FulfillmentShipmentStatusEnum)

const FulfillmentShipmentItem = Codec.interface({
  SellerSKU: optional(string),
  SellerFulfillmentOrderItemId: ensureString,
  Quantity: number,
  PackageNumber: optional(number),
})

const FulfillmentShipmentPackage = Codec.interface({
  PackageNumber: number,
  CarrierCode: ensureString,
  TrackingNumber: optional(ensureString),
  EstimatedArrivalDateTime: optional(mwsDate),
})

const FulfillmentShipment = Codec.interface({
  AmazonShipmentId: string,
  FulfillmentCenterId: string,
  FulfillmentShipmentStatus,
  ShippingDateTime: optional(mwsDate),
  EstimatedArrivalDateTime: optional(mwsDate),
  FulfillmentShipmentItem: ensureArray('member', FulfillmentShipmentItem),
  FulfillmentShipmentPackage: optional(ensureArray('member', FulfillmentShipmentPackage)),
})

export enum ReturnReceivedConditionEnum {
  'CarrierDamaged',
  'CustomerDamaged',
  'Defective',
  'FulfillerDamaged',
  'Sellable',
}

const ReturnReceivedCondition = enumeration(ReturnReceivedConditionEnum)

const ReturnItem = Codec.interface({
  SellerReturnItemId: ensureString,
  SellerFulfillmentOrderItemId: ensureString,
  AmazonShipmentId: ensureString,
  SellerReturnReasonCode: ensureString,
  ReturnComment: optional(string),
  AmazonReturnReasonCode: optional(ensureString),
  Status: string,
  StatusChangedDate: mwsDate,
  ReturnAuthorizationId: optional(ensureString),
  ReturnReceivedCondition: optional(ReturnReceivedCondition),
  FulfillmentCenterId: optional(string),
})

const ReturnAuthorization = Codec.interface({
  ReturnAuthorizationId: ensureString,
  FulfillmentCenterId: ensureString,
  ReturnToAddress: FOSAddress,
  AmazonRmaId: ensureString,
  RmaPageURL: string,
})

export const GetFulfillmentOrder = Codec.interface({
  FulfillmentOrder,
  FulfillmentOrderItem: ensureArray('member', FulfillmentOrderItem),
  FulfillmentShipment: ensureArray('member', FulfillmentShipment),
  ReturnItemList: ensureArray('member', ReturnItem),
  ReturnAuthorizationList: ensureArray('member', ReturnAuthorization),
})

export type GetFulfillmentOrder = GetType<typeof GetFulfillmentOrder>

export const GetFulfillmentOrderResponse = Codec.interface({
  GetFulfillmentOrderResponse: Codec.interface({
    GetFulfillmentOrderResult: GetFulfillmentOrder,
  }),
})

export const ListAllFulfillmentOrdersByNextTokenResponse = Codec.interface({
  ListAllFulfillmentOrdersByNextTokenResponse: Codec.interface({
    ListAllFulfillmentOrdersByNextTokenResult: ListAllFulfillmentOrders,
  }),
})

const TrackingAddress = Codec.interface({
  City: string,
  State: string,
  Country: string,
})

export enum CurrentStatusEnum {
  'IN_TRANSIT',
  'DELIVERED',
  'RETURNING',
  'RETURNED',
  'UNDELIVERABLE',
  'DELAYED',
  'AVAILABLE_FOR_PICKUP',
  'CUSTOMER_ACTION',
}

const CurrentStatus = enumeration(CurrentStatusEnum)

export enum EventCodeEnum {
  'EVENT_101',
  'EVENT_102',
  'EVENT_201',
  'EVENT_202',
  'EVENT_203',
  'EVENT_204',
  'EVENT_205',
  'EVENT_206',
  'EVENT_301',
  'EVENT_302',
  'EVENT_304',
  'EVENT_306',
  'EVENT_307',
  'EVENT_308',
  'EVENT_309',
  'EVENT_401',
  'EVENT_402',
  'EVENT_403',
  'EVENT_404',
  'EVENT_405',
  'EVENT_406',
  'EVENT_407',
  'EVENT_408',
  'EVENT_409',
  'EVENT_411',
  'EVENT_412',
  'EVENT_413',
  'EVENT_414',
  'EVENT_415',
  'EVENT_416',
  'EVENT_417',
  'EVENT_418',
  'EVENT_419',
}

const EventCode = enumeration(EventCodeEnum)

const TrackingEvent = Codec.interface({
  EventDate: mwsDate,
  EventAddress: TrackingAddress,
  EventCode,
})

export enum AdditionalLocationInfoEnum {
  'AS_INSTRUCTED',
  'CARPORT',
  'CUSTOMER_PICKUP',
  'DECK',
  'DOOR_PERSON',
  'FRONT_DESK',
  'FRONT_DOOR',
  'GARAGE',
  'GUARD',
  'MAIL_ROOM',
  'MAIL_SLOT',
  'MAILBOX',
  'MC_BOY',
  'MC_GIRL',
  'MC_MAN',
  'MC_WOMAN',
  'NEIGHBOR',
  'OFFICE',
  'OUTBUILDING',
  'PATIO',
  'PORCH',
  'REAR_DOOR',
  'RECEPTIONIST',
  'RECEIVER',
  'SECURE_LOCATION',
  'SIDE_DOOR',
}

const AdditionalLocationInfo = enumeration(AdditionalLocationInfoEnum)

export const GetPackageTrackingDetails = Codec.interface({
  PackageNumber: number,
  TrackingNumber: ensureString,
  CarrierCode: string,
  CarrierPhoneNumber: ensureString,
  CarrierURL: string,
  ShipDate: mwsDate,
  ShipToAddress: TrackingAddress,
  CurrentStatus,
  SignedForBy: string,
  EstimatedArrivalDate: mwsDate,
  TrackingEvents: optional(ensureArray('member', TrackingEvent)),
  AdditionalLocationInfo: optional(AdditionalLocationInfo),
})

export type GetPackageTrackingDetails = GetType<typeof GetPackageTrackingDetails>

export const GetPackageTrackingDetailsResponse = Codec.interface({
  GetPackageTrackingDetailsResponse: Codec.interface({
    GetPackageTrackingDetailsResult: GetPackageTrackingDetails,
  }),
})

export const CancelFulfillmentOrderResponse = Codec.interface({
  CancelFulfillmentOrderResponse: StandardResponse,
})

const ReasonCodeDetails = Codec.interface({
  ReturnReasonCode: string,
  Description: string,
  TranslatedDescription: optional(string),
})

export const ListReturnReasonCodes = Codec.interface({
  ReasonCodeDetailsList: ensureArray('member', ReasonCodeDetails),
})

export type ListReturnReasonCodes = GetType<typeof ListReturnReasonCodes>

export const ListReturnReasonCodesResponse = Codec.interface({
  ListReturnReasonCodesResponse: Codec.interface({
    ListReturnReasonCodesResult: ListReturnReasonCodes,
  }),
})

export enum InvalidItemReasonCodeEnum {
  'InvalidValues',
  'DuplicateRequest',
  'NoCompletedShipItems',
  'NoReturnableQuantity',
}

const InvalidItemReasonCode = enumeration(InvalidItemReasonCodeEnum)

const InvalidItemReason = Codec.interface({
  InvalidItemReasonCode,
  Description: string,
})

const InvalidReturnItem = Codec.interface({
  SellerReturnItemId: string,
  SellerFulfillmentOrderId: string,
  InvalidItemReason,
})

export const CreateFulfillmentReturn = Codec.interface({
  ReturnItemList: optional(ensureArray('member', ReturnItem)),
  InvalidReturmItemList: optional(ensureArray('member', InvalidReturnItem)),
  ReturnAuthorizationList: optional(ensureArray('member', ReturnAuthorization)),
})

export type CreateFulfillmentReturn = GetType<typeof CreateFulfillmentReturn>

export const CreateFulfillmentReturnResponse = Codec.interface({
  CreateFulfillmentReturnResponse: Codec.interface({
    CreateFulfillmentReturnResult: CreateFulfillmentReturn,
  }),
})
