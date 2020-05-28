import {
  boolean,
  Codec,
  exactly,
  GetInterface,
  lazy,
  number,
  oneOf,
  optional,
  record,
  string,
  unknown,
} from 'purify-ts'

import { ensureArray, mwsDate } from '../../parsing'
import * as type from './type'

/**
 * Collection of codecs for the products api
 */

const MoneyType = Codec.interface({
  Amount: optional(number),
  CurrencyCode: oneOf(Object.values(type.CurrencyCodeEnum).map((x) => exactly(x))),
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
  IdType: oneOf(Object.values(type.IdType).map((x) => exactly(x))),
  IdValue: string,
  PriceToEstimateFees,
  SellerInputIdentifier: string,
  IsAmazonFulfilled: boolean,
})

const FeeDetail: Codec<type.FeeDetail> = Codec.interface({
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
  Status: oneOf(Object.values(type.Status).map((x) => exactly(x))),
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

const GetLowestPricedOffersForSKU = Codec.interface({
  Identifier: unknown,
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
