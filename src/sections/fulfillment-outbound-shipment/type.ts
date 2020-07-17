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
