import {
  boolean,
  Codec,
  GetInterface,
  lazy,
  number,
  optional,
  record,
  string,
  unknown,
} from 'purify-ts'

import { ensureArray, mwsDate, oneOfEnum } from '../../parsing'
import { FeeDetail as FeeDetailInterface } from './type'

/**
 * Collection of codecs for the products api
 */

enum ItemConditionEnum {
  Any = 'Any',
  New = 'New',
  Used = 'Used',
  Collectible = 'Collectible',
  Refurbished = 'Refurbished',
  Club = 'Club',
}

const ItemCondition = oneOfEnum(ItemConditionEnum)

enum CurrencyCodeEnum {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RMB = 'RMB',
  INR = 'INR',
  JPY = 'JPY',
  CAD = 'CAD',
  MXN = 'MXN',
}

const CurrencyCode = oneOfEnum(CurrencyCodeEnum)

enum StatusEnum {
  Success = 'Success',
  ClientError = 'ClientError',
  ServiceError = 'ServiceError',
}

const Status = oneOfEnum(StatusEnum)

enum IdTypeEnum {
  ASIN = 'ASIN',
  SKU = 'SKU',
}

const IdType = oneOfEnum(IdTypeEnum)

const MoneyType = Codec.interface({
  Amount: optional(number),
  CurrencyCode,
})

export const Points = Codec.interface({
  PointsNumber: number,
  PointsMonetaryValue: MoneyType,
})

const ErrorType = Codec.interface({
  Type: string,
  Code: string,
  Message: string,
})

const PriceToEstimateFees = Codec.interface({
  ListingPrice: MoneyType,
  Shipping: optional(MoneyType),
  Points: optional(Points),
})

const FeesEstimateIdentifier = Codec.interface({
  MarketplaceId: string,
  IdType,
  IdValue: string,
  PriceToEstimateFees,
  SellerInputIdentifier: string,
  IsAmazonFulfilled: boolean,
})

const FeeDetail: Codec<FeeDetailInterface> = Codec.interface({
  FeeType: string,
  FeeAmount: MoneyType,
  FeePromotion: optional(MoneyType),
  TaxAmount: optional(MoneyType),
  FinalFee: MoneyType,
  IncludedFeeDetailList: optional(
    ensureArray(
      'IncludedFeeDetail',
      lazy(() => FeeDetail),
    ),
  ),
})

const FeesEstimate = Codec.interface({
  TimeOfFeesEstimation: mwsDate,
  TotalFeesEstimate: MoneyType,
  FeeDetailList: ensureArray('FeeDetail', FeeDetail),
})

const FeesEstimateResult = Codec.interface({
  FeesEstimateIdentifier,
  FeesEstimate: optional(FeesEstimate),
  Status,
  Error: optional(ErrorType),
})

export const GetMyFeesEstimate = Codec.interface({
  FeesEstimateResultList: ensureArray('FeesEstimateResult', FeesEstimateResult),
})

export const GetMyFeesEstimateResponse = Codec.interface({
  GetMyFeesEstimateResponse: Codec.interface({
    GetMyFeesEstimateResult: GetMyFeesEstimate,
  }),
})

const Product = record(string, unknown)

const SingleProductInterface = Codec.interface({
  Product,
})

const ListMatchingProducts = Codec.interface({
  Products: ensureArray('Product', Product),
})

export const ListMatchingProductsResponse = Codec.interface({
  ListMatchingProductsResponse: Codec.interface({
    ListMatchingProductsResult: ListMatchingProducts,
  }),
})

export const GetMatchingProductResult = ensureArray(
  'GetMatchingProductResult',
  SingleProductInterface,
)

export const GetMatchingProductResponse = Codec.interface({
  GetMatchingProductResponse: GetMatchingProductResult,
})

const MatchingProductForId = Codec.interface({
  Products: ensureArray('Product', Product),
})

export const GetMatchingProductForIdResponse = ensureArray(
  'GetMatchingProductForIdResult',
  MatchingProductForId,
)

export const GetMatchingProductForIdResponseCodec = Codec.interface({
  GetMatchingProductForIdResponse,
})

export const GetCompetitivePricingForSKUResult = ensureArray(
  'GetCompetitivePricingForSKUResult',
  SingleProductInterface,
)

export const GetCompetitivePricingForSKUResponse = Codec.interface({
  GetCompetitivePricingForSKUResponse: GetCompetitivePricingForSKUResult,
})

export const GetCompetitivePricingForASINResult = ensureArray(
  'GetCompetitivePricingForASINResult',
  SingleProductInterface,
)

export const GetCompetitivePricingForASINResponse = Codec.interface({
  GetCompetitivePricingForASINResponse: GetCompetitivePricingForASINResult,
})

export const GetLowestOfferListingsForSKUResult = ensureArray(
  'GetLowestOfferListingsForSKUResult',
  Codec.interface({
    AllOfferListingsConsidered: boolean,
    Product,
  }),
)

export const GetLowestOfferListingsForSKUResponse = Codec.interface({
  GetLowestOfferListingsForSKUResponse: GetLowestOfferListingsForSKUResult,
})

export const GetLowestOfferListingsForASINResult = ensureArray(
  'GetLowestOfferListingsForASINResult',
  Codec.interface({
    AllOfferListingsConsidered: boolean,
    Product,
  }),
)

export const GetLowestOfferListingsForASINResponse = Codec.interface({
  GetLowestOfferListingsForASINResponse: GetLowestOfferListingsForASINResult,
})

/**
 * @todo - complete definitions
 */

/**
 * This has attributes instead of children, how do we handle that?
 * http://docs.developer.amazonservices.com/en_CA/products/Products_Datatypes.html#OfferCount
 */
// const OfferCountType = number

// const LowestPrice

// const Summary = Codec.interface({
//   TotalOfferCount: number,
//   NumberOfOffers: OfferCountType,
//   LowestPrices: optional(ensureArray('LowestPrice', LowestPrice)),
//   BuyBoxPrices: optional(ensureArray('BuyBoxPrice', BuyBoxPrice)),
//   ListPrice: optional(MoneyType),
//   SuggestedLowerPricePlusShipping: optional(MoneyType),
//   BuyBoxEligibleOffers: optional(OfferCountType),
//   OffersAvailableTime: optional(mwsDate)
// })

const Identifier = Codec.interface({
  MarketplaceId: string,
  SellerSKU: string,
  ItemCondition,
  TimeOfOfferChange: optional(mwsDate),
})

const GetLowestPricedOffersForSKU = Codec.interface({
  Identifier,
  Summary: unknown,
  Offers: unknown,
})

export const GetLowestPricedOffersForSKUResponse = Codec.interface({
  GetLowestPricedOffersForSKUResponse: Codec.interface({
    GetLowestPricedOffersForSKUResult: GetLowestPricedOffersForSKU,
  }),
})
/**
 * Types derived from codecs
 */

export type GetMatchingProductForIdResponse = GetInterface<typeof GetMatchingProductForIdResponse>
export type GetMyFeesEstimate = GetInterface<typeof GetMyFeesEstimate>
export type ListMatchingProducts = GetInterface<typeof ListMatchingProducts>
export type GetMatchingProductResult = GetInterface<typeof GetMatchingProductResult>
export type GetCompetitivePricingForSKUResult = GetInterface<
  typeof GetCompetitivePricingForSKUResult
>
export type GetCompetitivePricingForASINResult = GetInterface<
  typeof GetCompetitivePricingForASINResult
>
export type GetLowestOfferListingsForSKUResult = GetInterface<
  typeof GetLowestOfferListingsForSKUResult
>
export type GetLowestOfferListingsForASINResult = GetInterface<
  typeof GetLowestOfferListingsForASINResult
>
export type GetLowestPricedOffersForSKU = GetInterface<typeof GetLowestPricedOffersForSKU>
