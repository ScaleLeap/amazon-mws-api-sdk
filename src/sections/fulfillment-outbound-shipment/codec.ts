import { boolean, Codec, enumeration, GetInterface, number, optional, string } from 'purify-ts'

import { ensureArray, ensureString, mwsDate } from '../../parsing'
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

export const CreateFulfillmentOrderResponse = Codec.interface({
  CreateFulfillmentOrderResponse: Codec.interface({
    /**
     * This part of the response is usually ignored but, this response returns exactly nothing
     * This is just here to make sure the response is parsed correctly
     */
    ResponseMetadata: Codec.interface({
      RequestId: string,
    }),
  }),
})
