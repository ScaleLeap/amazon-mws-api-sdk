import { RequireOnlyOne } from '../types'

export interface FOSAddress {
  Name: string
  Line1: string
  Line2?: string
  Line3?: string
  DistrictOrCounty?: string
  City?: string
  StateOrProvinceCode: string
  CountryCode: string
  PostalCode?: string
  PhoneNumber?: string
  [key: string]: string | undefined
}

export interface GetFulfillmentPreviewItem {
  SellerSKU: string
  SellerFulfillmentOrderItemId: string
  Quantity: number
}

export enum ShippingSpeedCategoryEnum {
  'Standard',
  'Expedited',
  'Priority',
  'ScheduledDelivery',
}

export type ShippingSpeedCategory = keyof typeof ShippingSpeedCategoryEnum

export interface GetFulfillmentPreviewParameters {
  MarketplaceId?: string
  Address: FOSAddress
  Items: GetFulfillmentPreviewItem[]
  ShippingSpeedCategories?: ShippingSpeedCategory[]
  IncludeCODFulfillmentPreview?: boolean
  IncludeDeliveryWindows?: boolean
}

export const canonicalizeGetFulfillmentPreviewParameters = (
  parameters: GetFulfillmentPreviewParameters,
) => ({
  MarketplaceId: parameters.MarketplaceId,
  Address: parameters.Address,
  'Items.member': parameters.Items,
  'ShippingSpeedCategories.member': parameters.ShippingSpeedCategories,
  IncludeCODFulfillmentPreview: parameters.IncludeCODFulfillmentPreview,
  IncludeDeliveryWindows: parameters.IncludeDeliveryWindows,
})

export enum FISWeightUnitEnum {
  'kilograms',
  'pounds',
}

export enum FISFeeTypesEnum {
  'FBAPerUnitFulfillmentFee',
  'FBAPerOrderFulfillmentFee',
  'FBATransportationFee',
  'FBAFulfillmentCODFee',
}

export enum FulfillmentActionEnum {
  'Ship',
  'Hold',
}

export type FulfillmentAction = keyof typeof FulfillmentActionEnum

export enum FulfillmentPolicyEnum {
  'FillOrKill',
  'FillAll',
  'FillAllAvailable',
}

export type FulfillmentPolicy = keyof typeof FulfillmentPolicyEnum

export interface FISCurrency {
  CurrencyCode: string
  Value: string
  [key: string]: string
}

export interface CreateFulfillmentOrderItem {
  SellerSKU: string
  SellerFulfillmentOrderItemId: string
  Quantity: number
  GiftMessage?: string
  DisplayableComment?: string
  FulfillmentNetworkSKU?: string
  PerUnitDeclaredValue?: FISCurrency
  PerUnitPrice?: FISCurrency
  PerUnitTax?: FISCurrency
}

export interface CODSettings {
  IsCODRequired?: boolean
  CODCharge?: FISCurrency
  CODChargeTax?: FISCurrency
  ShippingCharge?: FISCurrency
  ShippingChargeTax?: FISCurrency
  [key: string]: boolean | undefined | FISCurrency
}

export interface DeliveryWindow {
  StartDateTime: Date
  EndDateTime: Date
}

export interface CreateFulfillmentOrderParameters {
  MarketplaceId?: string
  SellerFulfillmentOrderId: string
  FulfillmentAction?: FulfillmentAction
  DisplayableOrderId: string
  DisplayableOrderDateTime: Date
  DisplayableOrderComment: string
  ShippingSpeedCategory: ShippingSpeedCategory
  DestinationAddress: FOSAddress
  FulfillmentPolicy?: FulfillmentPolicy
  NotificationEmailList?: string[]
  CODSettings?: CODSettings
  Items: CreateFulfillmentOrderItem[]
  DeliveryWindow?: DeliveryWindow
}

export const canonicalizeCreateFulfillmentOrderParameters = (
  parameters: CreateFulfillmentOrderParameters,
) => ({
  MarketplaceId: parameters.MarketplaceId,
  SellerFulfillmentOrderId: parameters.SellerFulfillmentOrderId,
  FulfillmentAction: parameters.FulfillmentAction,
  DisplayableOrderId: parameters.DisplayableOrderId,
  DisplayableOrderDateTime: parameters.DisplayableOrderDateTime?.toISOString(),
  DisplayableOrderComment: parameters.DisplayableOrderComment,
  ShippingSpeedCategory: parameters.ShippingSpeedCategory,
  DestinationAddress: parameters.DestinationAddress,
  FulfillmentPolicy: parameters.FulfillmentPolicy,
  'NotificationEmailList.member': parameters.NotificationEmailList,
  CODSettings: parameters.CODSettings,
  'Items.member': parameters.Items,
  DeliveryWindow: parameters.DeliveryWindow
    ? {
        StartDateTime: parameters.DeliveryWindow.StartDateTime?.toISOString(),
        EndDateTime: parameters.DeliveryWindow.EndDateTime?.toISOString(),
      }
    : undefined,
})

export interface UpdateFulfillmentOrderItem {
  SellerFulfillmentOrderItemId: string
  Quantity: number
  GiftMessage?: string
  DisplayableComment?: string
  PerUnitDeclaredValue?: FISCurrency
  PerUnitPrice?: FISCurrency
  PerUnitTax?: FISCurrency
}

export interface UpdateFulfillmentOrderParameters {
  MarketplaceId?: string
  SellerFulfillmentOrderId: string
  FulfillmentAction?: FulfillmentAction
  DisplayableOrderId?: string
  DisplayableOrderDateTime?: Date
  DisplayableOrderComment?: string
  ShippingSpeedCategory?: ShippingSpeedCategory
  DestinationAddress?: FOSAddress
  FulfillmentPolicy?: FulfillmentPolicy
  NotificationEmailList?: string[]
  Items?: UpdateFulfillmentOrderItem[]
}

export const canonicalizeUpdateFulfillmentOrderParameters = (
  parameters: UpdateFulfillmentOrderParameters,
) => ({
  MarketplaceId: parameters.MarketplaceId,
  SellerFulfillmentOrderId: parameters.SellerFulfillmentOrderId,
  FulfillmentAction: parameters.FulfillmentAction,
  DisplayableOrderId: parameters.DisplayableOrderId,
  DisplayableOrderDateTime: parameters.DisplayableOrderDateTime?.toISOString(),
  DisplayableOrderComment: parameters.DisplayableOrderComment,
  ShippingSpeedCategory: parameters.ShippingSpeedCategory,
  DestinationAddress: parameters.DestinationAddress,
  FulfillmentPolicy: parameters.FulfillmentPolicy,
  'NotificationEmailList.member': parameters.NotificationEmailList,
  'Items.member': parameters.Items,
})

export interface ListAllFulfillmentOrdersParameters {
  QueryStartDateTime?: Date
}

export interface GetFulfillmentOrderParameters {
  SellerFulfillmentOrderId: string
}

export interface GetPackageTrackingDetailsParameters {
  PackageNumber: number
}

export interface CancelFulfillmentOrderParameters {
  SellerFulfillmentOrderId: string
}

export type ListReturnReasonCodesParameters = RequireOnlyOne<
  {
    MarketplaceId?: string
    SellerFulfillmentOrderId?: string
    SellerSKU: string
    Language?: string
  },
  'MarketplaceId' | 'SellerFulfillmentOrderId'
>

export interface CreateReturnItem {
  SellerReturnItemId: string
  SellerFulfillmentOrderItemId: string
  AmazonShipmentId: string
  ReturnReasonCode: string
  ReturnComment?: string
}

export interface CreateFulfillmentReturnParameters {
  SellerFulfillmentOrderId: string
  Items: CreateReturnItem[]
}
