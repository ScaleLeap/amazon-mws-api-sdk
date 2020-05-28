/**
 * Collection of types for products API
 */
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

export enum Status {
  Success = 'Success',
  ClientError = 'ClientError',
  ServiceError = 'ServiceError',
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
  IdType: string
  IdValue: string
  PriceToEstimateFees: PriceToEstimateFees
  Identifier: string
  IsAmazonFulfilled: boolean
}

export interface GetMyFeesEstimateParameters {
  FeesEstimateRequestList: FeeEstimateRequest[]
  [key: string]: FeeEstimateRequest[]
}

export enum IdType {
  ASIN = 'ASIN',
  SKU = 'SKU',
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
  IdType: string
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

type ItemCondition = 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished' | 'Club'

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
