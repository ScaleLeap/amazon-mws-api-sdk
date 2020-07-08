import { Codec, GetInterface } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { mwsDate } from '../parsing'
import { getServiceStatusByResource } from './shared'

const RECOMMENDATIONS_API_VERSION = '2013-04-01'

interface GetLastUpdatedTimeForRecommendationsParameters {
  MarketplaceId: string
}

const GetLastUpdatedTimeForRecommendations = Codec.interface({
  InventoryRecommendationsLastUpdated: mwsDate,
  PricingRecommendationsLastUpdated: mwsDate,
  FulfillmentRecommendationsLastUpdated: mwsDate,
  GlobalSellingRecommendationsLastUpdated: mwsDate,
  AdvertisingRecommendationsLastUpdated: mwsDate,
})

type GetLastUpdatedTimeForRecommendations = GetInterface<
  typeof GetLastUpdatedTimeForRecommendations
>

const GetLastUpdatedTimeForRecommendationsResponse = Codec.interface({
  GetLastUpdatedTimeForRecommendationsResponse: Codec.interface({
    GetLastUpdatedTimeForRecommendationsResult: GetLastUpdatedTimeForRecommendations,
  }),
})

export class Recommendations {
  constructor(private httpClient: HttpClient) {}

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
