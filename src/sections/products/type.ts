/**
 * Collection of types for products API
 */

export type ItemCondition = 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished' | 'Club'
export type GetMatchingProductIdType =
  | 'ASIN'
  | 'GCID'
  | 'SellerSKU'
  | 'UPC'
  | 'EAN'
  | 'ISBN'
  | 'JAN'
export type FeeEstimateIdType = 'ASIN' | 'SellerSKU'

export enum CurrencyCodeEnum {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RMB = 'RMB',
  INR = 'INR',
  JPY = 'JPY',
  CAD = 'CAD',
  MXN = 'MXN',
}

export interface MoneyType {
  Amount: number | undefined
  CurrencyCode: CurrencyCodeEnum
}

export interface FeeDetail {
  FeePromotion: MoneyType | undefined
  TaxAmount: MoneyType | undefined
  FinalFee: MoneyType
  FeeType: string
  FeeAmount: MoneyType
  IncludedFeeDetailList: FeeDetail[] | undefined
}

interface Points {
  PointsNumber: number
  PointsMonetaryValue: MoneyType
}

interface PriceToEstimateFees {
  ListingPrice: MoneyType
  Shipping?: MoneyType
  Points?: Points
}

interface FeeEstimateRequest {
  MarketplaceId: string
  IdType: FeeEstimateIdType
  IdValue: string
  PriceToEstimateFees: PriceToEstimateFees
  Identifier: string
  IsAmazonFulfilled: boolean
}

export interface GetMyFeesEstimateParameters {
  FeesEstimateRequestList: FeeEstimateRequest[]
  [key: string]: FeeEstimateRequest[]
}

export interface ListMatchingProductsRequestParameters {
  MarketplaceId: string
  Query: string
  QueryContextId?: string
  [key: string]: string | undefined
}

export interface GetMatchingProductParameters {
  ASINList: string[]
  MarketplaceId: string
  [key: string]: string[] | string
}

export interface GetMatchingProductForIdParameters {
  MarketplaceId: string
  IdType: GetMatchingProductIdType
  IdList: string[]
  [key: string]: string | string[]
}

export interface GetCompetitivePricingForSkuParameters {
  MarketplaceId: string
  SellerSKUList: string[]
  [key: string]: string | string[]
}

export interface GetCompetitivePricingForAsinParameters {
  MarketplaceId: string
  ASINList: string[]
  [key: string]: string | string[]
}

export interface GetLowestOfferListingsForSkuParameters {
  SellerSKUList: string[]
  MarketplaceId: string
  ItemCondition?: ItemCondition
}

export interface GetLowestOfferListingsForAsinParameters {
  ASINList: string[]
  MarketplaceId: string
  ItemCondition?: ItemCondition
}

export interface GetLowestPricedOffersForSkuParameters {
  MarketplaceId: string
  SellerSKU: string
  ItemCondition: ItemCondition
  [key: string]: string
}

export interface GetLowestPricedOffersForAsinParameters {
  MarketplaceId: string
  ASIN: string
  ItemCondition: ItemCondition
  [key: string]: string
}

export interface GetMyPriceForSkuParameters {
  MarketplaceId: string
  SellerSKUList: string[]
  ItemCondition?: ItemCondition
}

export interface GetMyPriceForAsinParameters {
  MarketplaceId: string
  ASINList: string[]
  ItemCondition?: ItemCondition
}

export interface GetProductCategoriesForSkuParameters {
  MarketplaceId: string
  SellerSKU: string
  [key: string]: string
}

export interface ProductCategory {
  ProductCategoryId: string
  ProductCategoryName: string
  Parent: ProductCategory | undefined
}

export interface GetProductCategoriesForAsinParameters {
  MarketplaceId: string
  ASIN: string
  [key: string]: string
}
