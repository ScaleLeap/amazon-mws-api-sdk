interface FOSAddress {
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

interface GetFulfillmentPreviewItem {
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

type ShippingSpeedCategory = keyof typeof ShippingSpeedCategoryEnum

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
) => {
  return {
    MarketplaceId: parameters.MarketplaceId,
    Address: parameters.Address,
    'Items.member': parameters.Items,
    'ShippingSpeedCategories.member': parameters.ShippingSpeedCategories,
    IncludeCODFulfillmentPreview: parameters.IncludeCODFulfillmentPreview,
    IncludeDeliveryWindows: parameters.IncludeDeliveryWindows,
  }
}

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

enum FulfillmentActionEnum {
  'Ship',
  'Hold',
}

type FulfillmentAction = keyof typeof FulfillmentActionEnum

enum FulfillmentPolicyEnum {
  'FillOrKill',
  'FillAll',
  'FillAllAvailable',
}

type FulfillmentPolicy = keyof typeof FulfillmentPolicyEnum

interface FISCurrency {
  CurrencyCode: string
  Value: string
  [key: string]: string
}

interface CreateFulfillmentOrderItem {
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

interface CODSettings {
  IsCODRequired?: boolean
  CODCharge?: FISCurrency
  CODChargeTax?: FISCurrency
  ShippingCharge?: FISCurrency
  ShippingChargeTax?: FISCurrency
  [key: string]: boolean | undefined | FISCurrency
}

interface DeliveryWindow {
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
) => {
  return {
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
  }
}
