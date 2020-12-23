import {
  boolean,
  Codec,
  enumeration,
  GetType,
  lazy,
  number,
  oneOf,
  optional,
  string,
  unknown,
} from 'purify-ts'

import { Error } from '../../error-codec'
import { ensureArray, ensureString, mwsDate, SKU } from '../../parsing'
import {
  CurrencyCodeEnum,
  FeeDetail as FeeDetailInterface,
  ProductCategory as ProductCategoryInterface,
} from './type'

/**
 * Collection of codecs for the products api
 */

export enum ItemConditionEnum {
  Any = 'Any',
  New = 'New',
  Used = 'Used',
  Collectible = 'Collectible',
  Refurbished = 'Refurbished',
  Club = 'Club',
}

const ItemCondition = enumeration(ItemConditionEnum)

const CurrencyCode = enumeration(CurrencyCodeEnum) as Codec<keyof typeof CurrencyCodeEnum>

export enum StatusEnum {
  Success = 'Success',
  ClientError = 'ClientError',
  ServiceError = 'ServiceError',
}

const Status = enumeration(StatusEnum)

export enum IdTypeEnum {
  ASIN = 'ASIN',
  // eslint-disable-next-line no-shadow
  SKU = 'SKU',
}

const IdType = enumeration(IdTypeEnum)

const MoneyType = Codec.interface({
  Amount: optional(number),
  CurrencyCode: optional(CurrencyCode),
})

export const PointsCodec = Codec.interface({
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
  Points: optional(PointsCodec),
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
      'FeeDetail',
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

// Amazon C# library has properties that are a type "any" they call an "abstract object"
const AbstractObject = unknown

const AttributeSetList = AbstractObject

const ASINIdentifier = Codec.interface({
  MarketplaceId: string,
  ASIN: ensureString,
})

const SellerSKUIdentifier = Codec.interface({
  MarketplaceId: string,
  SellerId: ensureString,
  SellerSKU: SKU,
})

const IdentifierType = Codec.interface({
  MarketplaceASIN: optional(ASINIdentifier),
  SKUIdentifier: optional(SellerSKUIdentifier),
})

const RelationshipList = AbstractObject

const PriceType = Codec.interface({
  LandedPrice: optional(MoneyType),
  ListingPrice: optional(MoneyType),
  Shipping: optional(MoneyType),
  Points: optional(PointsCodec),
})

const CompetitivePriceType = Codec.interface({
  attr: Codec.interface({
    condition: string,
    subcondition: string,
    belongsToRequester: optional(boolean),
  }),
  CompetitivePriceId: ensureString,
  Price: PriceType,
})

const CompetitivePriceList = ensureArray('CompetitivePrice', CompetitivePriceType)

const OfferListingCountType = Codec.interface({
  attr: Codec.interface({
    condition: string,
  }),
  text: number,
})

const NumberOfOfferListingsList = ensureArray('OfferListingCount', OfferListingCountType)

const CompetitivePricingType = Codec.interface({
  CompetitivePrices: optional(CompetitivePriceList),
  NumberOfOfferListings: optional(NumberOfOfferListingsList),
  TradeInValue: optional(MoneyType),
})

const SalesRankType = Codec.interface({
  ProductCategoryId: optional(ensureString),
  Rank: optional(number),
})

const SalesRankList = ensureArray('SalesRank', SalesRankType)

const ShippingTimeType = Codec.interface({
  Max: string,
})

const QualifiersType = Codec.interface({
  ItemCondition: optional(ensureString),
  ItemSubcondition: optional(ensureString),
  FulfillmentChannel: optional(ensureString),
  ShipsDomestically: optional(ensureString),
  ShippingTime: optional(ShippingTimeType),
  SellerPositiveFeedbackRating: optional(ensureString),
})

const LowestOfferListingType = Codec.interface({
  Qualifiers: optional(QualifiersType),
  NumberOfOfferListingsConsidered: optional(number),
  SellerFeedbackCount: optional(number),
  Price: optional(PriceType),
  MultipleOffersAtLowestPrice: optional(string),
})

const LowestOfferListingList = ensureArray('LowestOfferListing', LowestOfferListingType)

const OfferType = Codec.interface({
  BuyingPrice: optional(PriceType),
  RegularPrice: optional(MoneyType),
  FulfillmentChannel: optional(string),
  ItemCondition: optional(string),
  ItemSubCondition: optional(string),
  SellerId: optional(string),
  SellerSKU: optional(SKU),
})

const OffersList = ensureArray('Offer', OfferType)

const Offers = OffersList

export const Product = Codec.interface({
  Identifiers: optional(IdentifierType),
  AttributeSets: optional(AttributeSetList),
  Relationships: optional(RelationshipList),
  CompetitivePricing: optional(CompetitivePricingType),
  SalesRankings: optional(SalesRankList),
  LowestOfferListings: optional(LowestOfferListingList),
  Offers: optional(Offers),
})

const SingleProductInterface = Codec.interface({
  Product,
})

export const ListMatchingProducts = Codec.interface({
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

const ProductsCodec = Codec.interface({
  Products: ensureArray('Product', Product),
})

const ErrorCodec = Codec.interface({
  Error,
})

const MatchingProductForId = oneOf([ProductsCodec, ErrorCodec])

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
 * This has attributes instead of children, how do we handle that?
 * http://docs.developer.amazonservices.com/en_CA/products/Products_Datatypes.html#OfferCount
 */
const OfferCountType = Codec.interface({
  OfferCount: oneOf([
    number,
    Codec.interface({
      text: number,
      attr: Codec.interface({
        condition: optional(string),
        fulfillmentChannel: optional(string),
      }),
    }),
  ]),
})

const LowestPrice = Codec.interface({
  LandedPrice: MoneyType,
  ListingPrice: MoneyType,
  Shipping: MoneyType,
  Points: optional(PointsCodec),
})

const BuyBoxPrice = Codec.interface({
  LandedPrice: MoneyType,
  ListingPrice: MoneyType,
  Shipping: MoneyType,
  Points: optional(PointsCodec),
})

const Summary = Codec.interface({
  TotalOfferCount: number,
  NumberOfOffers: optional(OfferCountType),
  LowestPrices: optional(ensureArray('LowestPrice', LowestPrice)),
  BuyBoxPrices: optional(ensureArray('BuyBoxPrice', BuyBoxPrice)),
  ListPrice: optional(MoneyType),
  SuggestedLowerPricePlusShipping: optional(MoneyType),
  BuyBoxEligibleOffers: optional(OfferCountType),
  OffersAvailableTime: optional(mwsDate),
})

const Identifier = {
  MarketplaceId: string,
  ItemCondition,
  TimeOfOfferChange: optional(mwsDate),
}

const SkuIdentifier = Codec.interface({
  SellerSKU: SKU,
  ...Identifier,
})

const AsinIdentifier = Codec.interface({
  ASIN: ensureString,
  ...Identifier,
})

const SellerFeedbackRating = Codec.interface({
  SellerPositiveFeedbackRating: optional(number),
  FeedbackCount: number,
})

/**
 * Does not have elements, but is defined by attributes
 */
const DetailedShippingTimeType = optional(unknown)

const ShipsFrom = Codec.interface({
  State: optional(string),
  Country: optional(string),
})

const Offer = {
  SubCondition: string,
  SellerFeedbackRating: optional(SellerFeedbackRating),
  ShippingTime: DetailedShippingTimeType,
  ListingPrice: MoneyType,
  Points: optional(PointsCodec),
  Shipping: MoneyType,
  ShipsFrom: optional(ShipsFrom),
  IsFulfilledByAmazon: boolean,
  IsBuyBoxWinner: optional(boolean),
  IsFeaturedMerchant: optional(boolean),
}

export const GetLowestPricedOffersForSKU = Codec.interface({
  Identifier: SkuIdentifier,
  Summary,
  Offers: ensureArray(
    'Offer',
    Codec.interface({
      MyOffer: optional(boolean),
      ...Offer,
    }),
  ),
})

export const GetLowestPricedOffersForSKUResponse = Codec.interface({
  GetLowestPricedOffersForSKUResponse: Codec.interface({
    GetLowestPricedOffersForSKUResult: GetLowestPricedOffersForSKU,
  }),
})

export const GetLowestPricedOffersForASIN = Codec.interface({
  Identifier: AsinIdentifier,
  Summary,
  Offers: ensureArray(
    'Offer',
    Codec.interface({
      ...Offer,
    }),
  ),
})

export const GetLowestPricedOffersForASINResponse = Codec.interface({
  GetLowestPricedOffersForASINResponse: Codec.interface({
    GetLowestPricedOffersForASINResult: GetLowestPricedOffersForASIN,
  }),
})

export const GetMyPriceForSKUResult = ensureArray('GetMyPriceForSKUResult', SingleProductInterface)

export const GetMyPriceForSKUResponse = Codec.interface({
  GetMyPriceForSKUResponse: GetMyPriceForSKUResult,
})

export const GetMyPriceForASINResult = ensureArray(
  'GetMyPriceForASINResult',
  SingleProductInterface,
)

export const GetMyPriceForASINResponse = Codec.interface({
  GetMyPriceForASINResponse: GetMyPriceForASINResult,
})

const ProductCategory: Codec<ProductCategoryInterface> = Codec.interface({
  ProductCategoryId: ensureString,
  ProductCategoryName: string,
  Parent: optional(lazy(() => ProductCategory)),
})

export const GetProductCategoriesForSKU = ensureArray('Self', ProductCategory)

export const GetProductCategoriesForSKUResponse = Codec.interface({
  GetProductCategoriesForSKUResponse: Codec.interface({
    GetProductCategoriesForSKUResult: GetProductCategoriesForSKU,
  }),
})

export const GetProductCategoriesForASIN = ensureArray('Self', ProductCategory)

export const GetProductCategoriesForASINResponse = Codec.interface({
  GetProductCategoriesForASINResponse: Codec.interface({
    GetProductCategoriesForASINResult: GetProductCategoriesForASIN,
  }),
})

/**
 *
 * Types derived from codecs
 *
 */

export type GetMatchingProductForIdResponse = GetType<typeof GetMatchingProductForIdResponse>
export type GetMyFeesEstimate = GetType<typeof GetMyFeesEstimate>
export type ListMatchingProducts = GetType<typeof ListMatchingProducts>
export type GetMatchingProductResult = GetType<typeof GetMatchingProductResult>
export type GetCompetitivePricingForSKUResult = GetType<typeof GetCompetitivePricingForSKUResult>
export type GetCompetitivePricingForASINResult = GetType<typeof GetCompetitivePricingForASINResult>
export type GetLowestOfferListingsForSKUResult = GetType<typeof GetLowestOfferListingsForSKUResult>
export type GetLowestOfferListingsForASINResult = GetType<
  typeof GetLowestOfferListingsForASINResult
>
export type GetLowestPricedOffersForSKU = GetType<typeof GetLowestPricedOffersForSKU>
export type GetLowestPricedOffersForASIN = GetType<typeof GetLowestPricedOffersForASIN>
export type GetMyPriceForSKUResult = GetType<typeof GetMyPriceForSKUResult>
export type GetMyPriceForASINResult = GetType<typeof GetMyPriceForASINResult>
export type GetProductCategoriesForSKU = GetType<typeof GetProductCategoriesForSKU>
export type GetProductCategoriesForASIN = GetType<typeof GetProductCategoriesForASIN>
