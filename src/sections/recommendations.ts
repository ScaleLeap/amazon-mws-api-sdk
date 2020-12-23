import { Codec, enumeration, exactly, GetType, number, oneOf, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import {
  ensureArray,
  ensureString,
  mwsDate,
  NextToken,
  nextToken as nextTokenCodec,
  SKU,
} from '../parsing'
import { getServiceStatusByResource } from './shared'
import { FulfillmentChannelEnum } from './types'

const RECOMMENDATIONS_API_VERSION = '2013-04-01'

export interface GetLastUpdatedTimeForRecommendationsParameters {
  MarketplaceId: string
}

export const GetLastUpdatedTimeForRecommendations = oneOf([
  Codec.interface({
    InventoryRecommendationsLastUpdated: mwsDate,
    PricingRecommendationsLastUpdated: mwsDate,
    FulfillmentRecommendationsLastUpdated: mwsDate,
    GlobalSellingRecommendationsLastUpdated: mwsDate,
    AdvertisingRecommendationsLastUpdated: mwsDate,
  }),
  exactly(''),
])

export type GetLastUpdatedTimeForRecommendations = GetType<
  typeof GetLastUpdatedTimeForRecommendations
>

const GetLastUpdatedTimeForRecommendationsResponse = Codec.interface({
  GetLastUpdatedTimeForRecommendationsResponse: Codec.interface({
    GetLastUpdatedTimeForRecommendationsResult: GetLastUpdatedTimeForRecommendations,
  }),
})

export type RecommedationCategory =
  | 'Inventory'
  | 'Selection'
  | 'Pricing'
  | 'Fulfillment'
  | 'ListingQuality'
  | 'GlobalSelling'
  | 'Advertising'

export interface CategoryQuery {
  RecommendationCategory: RecommedationCategory
  FilterOptions: string
}

export interface ListRecommendationsParameters {
  MarketplaceId: string
  RecommendationCategory?: RecommedationCategory
  CategoryQueryList?: CategoryQuery[]
}

const ProductIdentifier = Codec.interface({
  Asin: ensureString,
  Sku: SKU,
  Upc: string,
})

const Price = Codec.interface({
  CurrencyCode: string,
  Amount: number,
})

const DimensionMeasure = Codec.interface({
  Value: number,
  Unit: string,
})

const WeightMeasure = Codec.interface({
  Value: number,
  Unit: string,
})

const ItemDimensions = Codec.interface({
  Height: DimensionMeasure,
  Width: DimensionMeasure,
  Length: DimensionMeasure,
  Weight: WeightMeasure,
})

const FulfillmentRecommendation = Codec.interface({
  RecommendationId: string,
  RecommendationReason: string,
  LastUpdated: mwsDate,
  ItemIdentifier: ProductIdentifier,
  ItemName: optional(string),
  BrandName: optional(string),
  ProductCategory: optional(string),
  SalesRank: optional(number),
  BuyBoxPrice: optional(Price),
  NumberOfOffers: optional(number),
  NumberOfOffersFulfilledByAmazon: optional(number),
  AverageCustomerReview: optional(number),
  NumberOfCustomerReviews: optional(number),
  ItemDimensions: optional(ItemDimensions),
})

const FulfillmentChannel = enumeration(FulfillmentChannelEnum)

const InventoryRecommendation = Codec.interface({
  RecommendationId: string,
  RecommendationReason: string,
  LastUpdated: mwsDate,
  ItemIdentifier: ProductIdentifier,
  ItemName: optional(string),
  FulfillmentChannel: optional(FulfillmentChannel),
  AvailableQuantity: optional(number),
  DaysUntilStockRunsOut: optional(number),
  DaysOutOfStockLast30Days: optional(number),
})

const PricingRecommendation = Codec.interface({
  RecommendationId: string,
  RecommendationReason: string,
  LastUpdated: mwsDate,
  ItemIdentifier: ProductIdentifier,
  ItemName: optional(string),
  Condition: optional(string),
  SubCondition: optional(string),
  FulfillmentChannel: optional(FulfillmentChannel),
  YourPricePluShipping: optional(Price),
  LowestPricePlusShipping: optional(Price),
  PriceDifferenceToLowPrice: optional(Price),
  MedianPricePlusShipping: optional(Price),
  LowestMerchantFulfilledOfferPrice: optional(Price),
  LowestAmazonFulfilledOfferPrice: optional(Price),
  NumberOfMerchatFulfilledfOffers: optional(number),
  NumberOfAmazonFulfilledOrders: optional(number),
})

const GlobalSellingRecommendation = Codec.interface({
  RecommendationId: string,
  RecommendationReason: string,
  LastUpdated: mwsDate,
  ItemIdentifier: ProductIdentifier,
  ItemName: optional(string),
  BrandName: optional(string),
  ProductCategory: optional(string),
  SalesRank: optional(number),
  BuyBoxPrice: optional(Price),
  NumberOfOffers: optional(number),
  NumberOfOffersFulfilledByAmazon: optional(number),
  AverageCustomerReview: optional(number),
  NumberOfCustomerReviews: optional(number),
  ItemDimensions: optional(ItemDimensions),
})

const AdvertisingRecommendation = Codec.interface({
  RecommendationId: string,
  RecommendationReason: string,
  LastUpdated: mwsDate,
  ItemIdentifier: ProductIdentifier,
  ItemName: optional(string),
  BrandName: optional(string),
  ProductCategory: optional(string),
  SalesRank: optional(number),
  YourPricePluShipping: optional(Price),
  LowestPricePlusShipping: optional(Price),
  AvailableQuantity: optional(number),
  SalesForTheLast30Days: optional(number),
})

export const ListRecommendations = Codec.interface({
  NextToken: optional(nextTokenCodec('ListRecommendations')),
  FulfillmentRecommendations: optional(ensureArray('member', FulfillmentRecommendation)),
  InventoryRecommendations: optional(ensureArray('member', InventoryRecommendation)),
  PricingRecommendations: optional(ensureArray('member', PricingRecommendation)),
  GlobalSellingRecommendations: optional(ensureArray('member', GlobalSellingRecommendation)),
  AdvertisingRecommendations: optional(ensureArray('member', AdvertisingRecommendation)),
})

export type ListRecommendations = GetType<typeof ListRecommendations>

const ListRecommendationsResponse = Codec.interface({
  ListRecommendationsResponse: Codec.interface({
    ListRecommendationsResult: ListRecommendations,
  }),
})

const ListRecommendationsByNextTokenResponse = Codec.interface({
  ListRecommendationsByNextTokenResponse: Codec.interface({
    ListRecommendationsByNextTokenResult: ListRecommendations,
  }),
})

export class Recommendations {
  constructor(private httpClient: HttpClient) {}

  async listRecommendationsByNextToken(
    nextToken: NextToken<'ListRecommendations'>,
  ): Promise<[ListRecommendations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Recommendations,
      version: RECOMMENDATIONS_API_VERSION,
      action: 'ListRecommendationsByNextToken',
      parameters: {
        NextToken: nextToken.token,
      },
    })

    return ListRecommendationsByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.ListRecommendationsByNextTokenResponse.ListRecommendationsByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listRecommendations(
    parameters: ListRecommendationsParameters,
  ): Promise<[ListRecommendations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Recommendations,
      version: RECOMMENDATIONS_API_VERSION,
      action: 'ListRecommendations',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        RecommendationCategory: parameters.RecommendationCategory,
        'CategoryQueryList.CategoryQuery': parameters.CategoryQueryList,
      },
    })

    return ListRecommendationsResponse.decode(response).caseOf({
      Right: (x) => [x.ListRecommendationsResponse.ListRecommendationsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getLastUpdatedTimeForRecommendations(
    parameters: GetLastUpdatedTimeForRecommendationsParameters,
  ): Promise<[GetLastUpdatedTimeForRecommendations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Recommendations,
      version: RECOMMENDATIONS_API_VERSION,
      action: 'GetLastUpdatedTimeForRecommendations',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetLastUpdatedTimeForRecommendationsResponse.decode(response).caseOf({
      Right: (x) => [
        x.GetLastUpdatedTimeForRecommendationsResponse.GetLastUpdatedTimeForRecommendationsResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.Recommendations,
      RECOMMENDATIONS_API_VERSION,
    )
  }
}
