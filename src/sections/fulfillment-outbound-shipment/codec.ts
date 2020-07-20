import { boolean, Codec, enumeration, GetInterface, number, optional, string } from 'purify-ts'

import { ensureArray, ensureString, mwsDate, nextToken as nextTokenCodec } from '../../parsing'
import { FISFeeTypesEnum, FISWeightUnitEnum, ShippingSpeedCategoryEnum } from './type'

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

const GetFulfillmentPreview = Codec.interface({
  FulfillmentPreviews: ensureArray('member', FulfillmentPreview),
})

export type GetFulfillmentPreview = GetInterface<typeof GetFulfillmentPreview>

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

enum FulfillmentOrderStatusEnum {
  'RECEIVED',
  'INVALID',
  'PLANNING',
  'PROCESSING',
  'CANCELLED',
  'COMPLETE',
  'COMPLETE_PARTIALLED',
  'UNFULFILLABLE',
}

enum FulfillmentActionEnum {
  'Ship',
  'Hold',
}

enum FulfillmentPolicyEnum {
  'FillOrKill',
  'FillAll',
  'FillAllAvailable',
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

const ListAllFulfillmentOrders = Codec.interface({
  NextToken: optional(nextTokenCodec('ListAllFulfillmentOrders')),
  FulfillmentOrders: ensureArray('member', FulfillmentOrder),
})

export type ListAllFulfillmentOrders = GetInterface<typeof ListAllFulfillmentOrders>

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

enum FulfillmentShipmentStatusEnum {
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

enum ReturnReceivedConditionEnum {
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

const GetFulfillmentOrder = Codec.interface({
  FulfillmentOrder,
  FulfillmentOrderItem: ensureArray('member', FulfillmentOrderItem),
  FulfillmentShipment: ensureArray('member', FulfillmentShipment),
  ReturnItemList: ensureArray('member', ReturnItem),
  ReturnAuthorizationList: ensureArray('member', ReturnAuthorization),
})

export type GetFulfillmentOrder = GetInterface<typeof GetFulfillmentOrder>

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
